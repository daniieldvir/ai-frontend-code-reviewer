import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { AnalysisResult, Framework } from './types';

const PRODUCTION_URL = 'https://ai-frontend-code-reviewer.onrender.com';
const LOCAL_URL = 'http://localhost:3000';

const severityOrder: Record<string, number> = {
  CRITICAL: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

@Injectable({ providedIn: 'root' })
export class AnalysisService {
  private readonly _result = signal<AnalysisResult | null>(null);
  private readonly _error = signal<string | null>(null);
  private readonly _loading = signal<boolean>(false);

  readonly result = this._result.asReadonly();
  readonly error = this._error.asReadonly();
  readonly loading = this._loading.asReadonly();

  private readonly http = inject(HttpClient);

  constructor() {
    this.wakeUp();
  }

  private wakeUp() {
    this.http.get(PRODUCTION_URL, { responseType: 'text' }).subscribe({
      next: () => { },
      error: () => { },
    });

    if (window.location.hostname === 'localhost') {
      this.http.get(LOCAL_URL, { responseType: 'text' }).subscribe({
        next: () => { },
        error: () => { },
      });
    }
  }

  clearError() {
    this._error.set(null);
  }

  clearResult() {
    this._result.set(null);
  }

  analyze(code: string, framework: Framework) {
    this._error.set(null);
    this._loading.set(true);
    this._result.set(null);
    const productionUrl = `${PRODUCTION_URL}/analyze`;
    const localUrl = `${LOCAL_URL}/analyze`;

    const isLocal = window.location.hostname === 'localhost';
    const apiUrl = isLocal ? localUrl : productionUrl;

    this.performAnalysis(apiUrl, code, framework)
      .pipe(
        catchError((err: HttpErrorResponse | Error) => {
          if (isLocal && apiUrl === localUrl) {
            console.warn('Local backend unreachable, falling back to production...');
            return this.performAnalysis(productionUrl, code, framework);
          }
          return throwError(() => err);
        }),
        finalize(() => {
          this._loading.set(false);
        }),
      )
      .subscribe({
        next: (data: AnalysisResult) => {
          const sortedData = {
            ...data,
            issues: [...data.issues].sort(
              (a, b) =>
                severityOrder[a.severity.toUpperCase()] - severityOrder[b.severity.toUpperCase()],
            ),
          };
          this._result.set(sortedData);
        },
        error: (err: HttpErrorResponse | Error) => {
          this.handleError(err);
        },
      });
  }

  private performAnalysis(
    url: string,
    code: string,
    framework: Framework,
  ): Observable<AnalysisResult> {
    return this.http.post<AnalysisResult>(url, { code, framework }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 502 || err.status === 503 || err.status === 504) {
          return throwError(
            () =>
              new Error('Server is still waking up from sleep. Please try again in 30 seconds.'),
          );
        }
        return throwError(() => new Error(`Server error (${err.status})`));
      }),
    );
  }

  private handleError(err: HttpErrorResponse | Error) {
    console.error('Analysis failed:', err);
    this._result.set(null);
    const errorMessage =
      err instanceof HttpErrorResponse
        ? err.error?.message || `Server error (${err.status})`
        : err.message === 'Failed to fetch'
          ? 'Connection failed. The server might be down or waking up.'
          : err.message;
    this._error.set(errorMessage);
  }
}
