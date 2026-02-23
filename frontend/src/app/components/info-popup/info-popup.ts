import { Component, input, output } from '@angular/core';
import { AnalysisIssue } from '../../core/types';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.html',
  styleUrls: ['./info-popup.scss'],
})
export class InfoPopup {
  public issue = input<AnalysisIssue | null>(null);
  public onClose = output<void>();

  close() {
    this.onClose.emit();
  }
}

