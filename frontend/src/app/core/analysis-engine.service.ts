import { Injectable, signal } from "@angular/core";
import { AnalysisResult, Framework } from "./types";


@Injectable({ providedIn: 'root' })
export class AnalysisService {
    result = signal<AnalysisResult | null>(null);
    error = signal<string | null>(null);

    async analyze(code: string, framework: Framework) {
        try {
            this.error.set(null);
            const res = await fetch('http://localhost:3000/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, framework })
            });
            const data: AnalysisResult = await res.json();
            this.result.set(data);
            console.log('Analysis result:', data);
        } catch (err: any) {
            console.error(err);
            this.result.set(null);
            this.error.set(err.message || 'Failed to connect to the analysis server.');
        }
    }
}