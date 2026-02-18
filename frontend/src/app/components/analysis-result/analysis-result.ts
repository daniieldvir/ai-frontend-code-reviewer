import { Component, input } from '@angular/core';
import { AnalysisResult as AnalysisResultType } from '../../core/types';
import { ScoreCircle } from './score-circle/score-circle';
import { IssueItem } from './issue-item/issue-item';
import { AnalysisService } from '../../core/analysis-engine.service';

@Component({
  selector: 'app-analysis-result',
  imports: [ScoreCircle, IssueItem],
  templateUrl: './analysis-result.html',
  styleUrl: './analysis-result.scss',
})
export class AnalysisResult {
  readonly result = input<AnalysisResultType | null>(null);
}
