import { Injectable, signal } from "@angular/core";
import { AnalysisResult, Framework } from "./types";


@Injectable({ providedIn: 'root' })
export class AnalysisService {
    result = signal<AnalysisResult | null>(null);
    error = signal<string | null>(null);

    constructor() {
        this.wakeUp();
    }

    private async wakeUp() {
        const PRODUCTION_URL = 'https://ai-frontend-code-reviewer.onrender.com';
        fetch(PRODUCTION_URL).catch(() => { });
        if (window.location.hostname === 'localhost') {
            fetch('http://localhost:3000').catch(() => { });
        }
    }

    async analyze(code: string, framework: Framework) {
        this.error.set(null);
        const PRODUCTION_URL = 'https://ai-frontend-code-reviewer.onrender.com/analyze';
        const LOCAL_URL = 'http://localhost:3000/analyze';

        const isLocal = window.location.hostname === 'localhost';
        const apiUrl = isLocal ? LOCAL_URL : PRODUCTION_URL;

        try {
            await this.performAnalysis(apiUrl, code, framework);
        } catch (err: any) {
            if (isLocal && apiUrl === LOCAL_URL) {
                console.warn('Local backend unreachable, falling back to production...');
                try {
                    await this.performAnalysis(PRODUCTION_URL, code, framework);
                } catch (fallbackErr: any) {
                    this.handleError(fallbackErr);
                }
            } else {
                this.handleError(err);
            }
        }
    }

    private async performAnalysis(url: string, code: string, framework: Framework) {
        console.log(`Analyzing via: ${url}`);
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, framework })
        });

        if (!res.ok) {
            if (res.status === 502 || res.status === 503 || res.status === 504) {
                throw new Error('Server is still waking up from sleep. Please try again in 30 seconds.');
            }
            throw new Error(`Server error (${res.status})`);
        }

        const data: AnalysisResult = await res.json();
        this.result.set(data);
    }

    private handleError(err: any) {
        console.error('Analysis failed:', err);
        this.result.set(null);
        this.error.set(err.message === 'Failed to fetch'
            ? 'Connection failed. The server might be down or waking up.'
            : err.message);
    }
}