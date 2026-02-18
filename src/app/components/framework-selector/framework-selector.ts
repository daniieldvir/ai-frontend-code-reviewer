import { Component, signal } from '@angular/core';
import { Framework } from '../../core/types';

@Component({
  selector: 'app-framework-selector',
  imports: [],
  templateUrl: './framework-selector.html',
  styleUrl: './framework-selector.scss',
})
export class FrameworkSelector {
  protected readonly frameworks = signal<Framework[]>(['React', 'Angular', 'Vue', ]);
  protected readonly selectedFramework = signal<Framework | null>('React');

  select(framework: Framework) {
    this.selectedFramework.set(framework);
  }
}
