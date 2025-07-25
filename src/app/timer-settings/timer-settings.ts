import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomSlider } from '../custom-slider/custom-slider';
import { Mode, MODES } from '../modes';

@Component({
    selector: 'timer-settings',
    imports: [CustomSlider],
    templateUrl: './timer-settings.html',
    styleUrl: './timer-settings.css',
})
export class TimerSettings implements OnInit {
    modes = MODES;
    currentMode = this.modes[1];
    isCustom = false;

    @Output() selectedMode = new EventEmitter<Mode>();

    ngOnInit(): void {
        setTimeout(() => {
            this.selectedMode.emit(this.currentMode);
        });
    }

    onChangeMode(mode: Mode) {
        this.currentMode = mode;
        this.selectedMode.emit(this.currentMode);
    }
}
