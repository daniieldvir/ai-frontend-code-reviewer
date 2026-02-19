import { Component, output, signal } from '@angular/core';
import { Framework } from '../../core/types';
import { Button } from '../UI/button/button';

@Component({
  selector: 'app-framework-selector',
  imports: [Button],
  templateUrl: './framework-selector.html',
  styleUrl: './framework-selector.scss',
})
export class FrameworkSelector {
  protected readonly selectedFrameworkEmitter = output<Framework>();
  
  protected readonly frameworks = signal<Framework[]>(['Angular', 'React', 'Vue', ]);
  protected readonly selectedFramework = signal<Framework | null>(null);
  

  select(framework: Framework) {
    this.selectedFramework.set(framework); 
    this.selectedFrameworkEmitter.emit(framework);
  }
}
