import { Component } from '@angular/core';
import { FrameworkSelector } from '../framework-selector/framework-selector';

@Component({
  selector: 'app-code-input',
  imports: [FrameworkSelector],
  templateUrl: './code-input.html',
  styleUrl: './code-input.scss',
})
export class CodeInput {

}
