import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-popup',
  standalone: true,
  imports: [],
  templateUrl: './error-popup.html',
  styleUrl: './error-popup.scss',
})
export class ErrorPopup {
  title = input<string>('Error Occurred');
  message = input<string | null>(null);
  onClose = output<void>();

  close() {
    this.onClose.emit();
  }
}
