import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-score-circle',
  imports: [],
  templateUrl: './score-circle.html',
  styleUrl: './score-circle.scss',
})
export class ScoreCircle {
  public score = input<number>(0);

  public color = computed(() => {
    const s = this.score();
    if (s >= 80) return 'var(--success)';
    if (s >= 50) return 'var(--warning)';
    return 'var(--error)';
  });
}
