import { Component, inject, Input, OnChanges } from '@angular/core';
import { Mode } from '../modes';
import { TimerService } from '../timer.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'timer',
  imports: [NgClass],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer implements OnChanges {
  timerService = inject(TimerService);

  @Input() timerType: string | undefined;
  @Input() currentMode!: Mode;

  displayTimer: string | undefined;
  timerSeconds!: number;
  isRunning: boolean = false;

  ngOnChanges(): void {
    if (this.currentMode) {
      this.resetTimer();
    }
  }

  resetTimer() {
    this.isRunning = false;
    this.timerSeconds = this.timerService.getDuration(
      this.timerType,
      this.currentMode
    );

    this.updateDisplayTimer();
  }

  updateDisplayTimer() {
    const minutes = Math.floor(this.timerSeconds / 60);
    const seconds = this.timerSeconds % 60;
    this.displayTimer = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  onStart() {
    this.timerService.start();
  }
}
