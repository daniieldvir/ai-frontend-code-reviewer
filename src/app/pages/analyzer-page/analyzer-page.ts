import { Component, signal } from '@angular/core';
import { FrameworkSelector } from '../../components/framework-selector/framework-selector';
import { AnalysisResult } from '../../components/analysis-result/analysis-result';
import { AnalysisResult as AnalysisResultType } from '../../core/types';
import { CodeInput } from '../../components/code-input/code-input';

@Component({
  selector: 'app-analyzer-page',
  imports: [FrameworkSelector, AnalysisResult, CodeInput],
  templateUrl: './analyzer-page.html',
  styleUrl: './analyzer-page.scss',
})
export class AnalyzerPage {
  protected readonly mockResult = signal<AnalysisResultType>({
    score: 85,
    issues: [
      {
        category: 'performance',
        severity: 'high',
        explanation: 'Large bundle size detected',
        suggestion: 'Consider lazy loading for this component.'
      },
      {
        category: 'best-practices',
        severity: 'medium',
        explanation: 'Missing Aria-labels',
        suggestion: 'Add descriptive labels to your interactive elements.'
      },
      {
        category: 'readability',
        severity: 'low',
        explanation: 'Nested Ternaries',
        suggestion: 'Refactor complex logic into a computed property or helper function.'
      }
    ]
  });
}
