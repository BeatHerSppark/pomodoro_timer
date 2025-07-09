import { Injectable } from '@angular/core';
import { Mode } from './modes';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService {
  timerSecondsSubject = new BehaviorSubject<number>(0);
  timerSeconds$ = this.timerSecondsSubject.asObservable();

  displayTimerSubject = new BehaviorSubject<string>('00:00');
  displayTimer$ = this.displayTimerSubject.asObservable();

  isRunning = false;
  intervalSub?: Subscription;
  currentSeconds = 0;


  initialize(timerType: string | undefined, mode: Mode | undefined) {
    this.clear();
    this.currentSeconds = this.getDuration(timerType, mode);
    this.timerSecondsSubject.next(this.currentSeconds);
    this.updateDisplay();
  }

  start(onComplete: () => void) {
    if (this.isRunning || this.currentSeconds <= 0) return;
    this.isRunning = true;

    this.intervalSub = interval(10).subscribe(() => {
      if (this.currentSeconds > 0) {
        this.currentSeconds--;
        this.timerSecondsSubject.next(this.currentSeconds);
        this.updateDisplay();
      } else {
        this.clear();
        onComplete();
      }
    });
  }

  stop() {
    this.clear();
  }

  clear() {
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
      this.intervalSub = undefined;
    }
    this.isRunning = false;
  }

  getSeconds() {
    return this.currentSeconds;
  }

  updateDisplay() {
    const minutes = Math.floor(this.currentSeconds / 60);
    const seconds = this.currentSeconds % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
    this.displayTimerSubject.next(display);
  }

  getDuration(
      timerType: string | undefined,
      currentMode: Mode | undefined
    ): number {
      if (timerType === 'pomodoro') {
        return currentMode!.pomodoro * 60;
      } else if (timerType === 'break') {
        return currentMode!.break * 60;
      } else if (timerType === 'long_break') {
        return currentMode!.longBreak * 60;
      }
      return 20 * 60;
  }
}

