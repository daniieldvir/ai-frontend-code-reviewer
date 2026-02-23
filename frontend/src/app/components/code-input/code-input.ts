import { Component, output, signal } from '@angular/core';
import { Framework } from '../../core/types';
import { ErrorPopup } from '../error-popup/error-popup';
import { FrameworkSelector } from '../framework-selector/framework-selector';

@Component({
  selector: 'app-code-input',
  imports: [FrameworkSelector, ErrorPopup],
  templateUrl: './code-input.html',
  styleUrl: './code-input.scss',
})
export class CodeInput {
  public codeToAnalyze = output<{ framework: Framework; code: string }>();
  public inputChanged = output<void>();

  framework = signal<Framework | null>(null);
  code = signal('');
  error = signal<string | null>(null);
  isClearing = signal(false);

  onCodeInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.code.set(target.value);
    this.inputChanged.emit();
  }

  handleFrameworkSelect(framework: Framework) {
    const currentFramework = this.framework();
    if (currentFramework !== null && currentFramework !== framework && this.code()) {
      this.code.set('');
      this.error.set(null);
      this.triggerClearAnimation();
    }
    this.framework.set(framework);
    this.inputChanged.emit();
  }

  handleAnalyzeCode(event: Event) {
    event.preventDefault();
    if (this.framework() && this.code()) {
      this.codeToAnalyze.emit({ framework: this.framework()!, code: this.code()! });
    } else {
      this.error.set('Framework and code are required');
    }
  }

  closeError() {
    this.error.set(null);
  }

  private triggerClearAnimation() {
    this.isClearing.set(true);
    setTimeout(() => this.isClearing.set(false), 500);
  }
}
