import { Component, inject, signal } from '@angular/core';
import { AnalysisResult } from '../../components/analysis-result/analysis-result';
import { CodeInput } from '../../components/code-input/code-input';
import { ErrorPopup } from '../../components/error-popup/error-popup';
import { FrameworkSelector } from '../../components/framework-selector/framework-selector';
import { AnalysisService } from '../../core/analysis-engine.service';
import { AnalysisResult as AnalysisResultType, Framework } from '../../core/types';
import { Header } from '../../components/UI/header/header';

@Component({
  selector: 'app-analyzer-page',
  imports: [FrameworkSelector, AnalysisResult, CodeInput, ErrorPopup, Header],
  templateUrl: './analyzer-page.html',
  styleUrl: './analyzer-page.scss',
})
export class AnalyzerPage {
  private readonly analysisService = inject(AnalysisService);
  readonly result = this.analysisService.result;
  readonly error = this.analysisService.error;
  readonly loading = this.analysisService.loading;

  closeError() {
    this.analysisService.error.set(null);
  }

  analyzeCode(data: { framework: Framework; code: string }) {
    this.analysisService.analyze(data.code, data.framework);
  }
}
