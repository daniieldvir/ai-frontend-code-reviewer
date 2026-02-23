import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/theme.service';
import { Button } from '../button/button';

@Component({
  selector: 'app-theme-toggle',
  imports: [Button],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  protected readonly themeService = inject(ThemeService);
}
