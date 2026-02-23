import { Component, inject } from '@angular/core';
import { AnalysisResult } from '../../components/analysis-result/analysis-result';
import { CodeInput } from '../../components/code-input/code-input';
import { ErrorPopup } from '../../components/error-popup/error-popup';
import { Header } from '../../components/UI/header/header';
import { AnalysisService } from '../../core/analysis-engine.service';
import { Framework } from '../../core/types';

@Component({
  selector: 'app-analyzer-page',
  imports: [AnalysisResult, CodeInput, ErrorPopup, Header],
  templateUrl: './analyzer-page.html',
  styleUrl: './analyzer-page.scss',
})
export class AnalyzerPage {
  private readonly analysisService = inject(AnalysisService);
  readonly result = this.analysisService.result;
  readonly error = this.analysisService.error;
  readonly loading = this.analysisService.loading;

  closeError() {
    this.analysisService.clearError();
  }

  analyzeCode(data: { framework: Framework; code: string }) {
    this.analysisService.analyze(data.code, data.framework);
  }

  inputChanged() {
    if (this.result()) {
      this.analysisService.clearResult();
    }
  }
}
