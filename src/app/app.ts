import { Component } from '@angular/core';
import { Timer } from './timer/timer';
import { TimerSettings } from './timer-settings/timer-settings';
import { Mode } from './modes';
import { TIMERS } from './timers';

@Component({
    selector: 'app-root',
    imports: [Timer, TimerSettings],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    timers = TIMERS;
    currentTimer = 'pomodoro';
    currentMode!: Mode;
    manualChange: boolean = true;

    onChangeTimer(timer: string, manual: boolean | undefined) {
        this.manualChange = manual ? true : false;
        this.currentTimer = timer;
    }

    onChangeMode(mode: Mode, manual: boolean | undefined) {
        this.manualChange = manual ? true : false;
        this.currentMode = mode;
    }
}
