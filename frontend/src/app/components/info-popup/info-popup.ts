import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.html',
  styleUrls: ['./info-popup.scss'],
})
export class InfoPopup {
  public title = input<string>('');
  public message = input<string>('');
  public onClose = output<void>();

  close() {
    this.onClose.emit();
  }
}
