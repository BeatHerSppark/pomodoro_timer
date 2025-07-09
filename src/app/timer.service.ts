import { Injectable } from '@angular/core';
import { Mode } from './modes';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  interval: number | undefined;

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

  start() {}
}
