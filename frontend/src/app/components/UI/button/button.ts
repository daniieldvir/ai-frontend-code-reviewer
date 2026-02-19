import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public icon = input<string | null>(null);
  public label = input<string | null>(null);
  public active = input<boolean>(false);

  public onClick = output<void>();

  handleClick() {
    if (!this.active()) {
      this.onClick.emit();
    }
  }
}
