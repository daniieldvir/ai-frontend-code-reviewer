import { Component, input } from '@angular/core';
import { AnalysisIssue } from '../../../core/types';

@Component({
  selector: 'app-issue-item',
  imports: [],
  templateUrl: './issue-item.html',
  styleUrl: './issue-item.scss',
})
export class IssueItem {
  public issue = input<AnalysisIssue | null>(null);
}
