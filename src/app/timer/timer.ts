import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { Mode } from '../modes';
import { TimerService } from '../timer.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'timer',
  imports: [NgClass, AsyncPipe],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer implements OnChanges {
  timerService = inject(TimerService);

  @Input() timerType: string | undefined;
  @Input() currentMode: Mode | undefined;
  @Input() manualChange!: boolean;
  @Output() changeTimerType = new EventEmitter<string>();

  displayTimer$ = this.timerService.displayTimer$;
  timerSeconds$ = this.timerService.timerSeconds$;

  ngOnChanges(): void {
    if (this.currentMode && this.manualChange) {
      this.timerService.initialize(this.timerType, this.currentMode);
    }
  }

  onStart() {
    this.timerService.start(() => this.setNextTimer());
  }

  onStop() {
    this.timerService.stop();
  }

  onReset() {
    this.timerService.clear();
    this.timerService.initialize(this.timerType, this.currentMode);
  }

  setNextTimer() {
    this.timerType = this.timerType === 'pomodoro' ? 'break' : 'pomodoro';
    this.changeTimerType.emit(this.timerType);
    this.timerService.initialize(this.timerType, this.currentMode);
    this.timerService.start(() => this.setNextTimer());
  }
}
