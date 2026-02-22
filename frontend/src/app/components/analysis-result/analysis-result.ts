import { Component, input, signal } from '@angular/core';
import { AnalysisIssue, AnalysisResult as AnalysisResultType } from '../../core/types';
import { InfoPopup } from '../info-popup/info-popup';
import { IssueItem } from './issue-item/issue-item';
import { ScoreCircle } from './score-circle/score-circle';

@Component({
  selector: 'app-analysis-result',
  imports: [ScoreCircle, IssueItem, InfoPopup],
  templateUrl: './analysis-result.html',
  styleUrl: './analysis-result.scss',
})
export class AnalysisResult {
  readonly result = input<AnalysisResultType | null>(null);
  readonly loading = input<boolean>(false);
  readonly infoPopupOpen = signal<boolean>(false);
  readonly infoPopupIssue = signal<AnalysisIssue | null>(null);

  openExplanationModal(issue: AnalysisIssue) {
    console.log('openExplanationModal', issue);
    this.infoPopupOpen.set(true);
    this.infoPopupIssue.set(issue);
  }

  closeInfoPopup() {
    this.infoPopupOpen.set(false);
    this.infoPopupIssue.set(null);
  }
}
