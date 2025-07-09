import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mode } from '../modes';

@Component({
  selector: 'custom-slider',
  imports: [],
  templateUrl: './custom-slider.html',
  styleUrl: './custom-slider.css',
})
export class CustomSlider {
  @Input() timer: string | undefined;
  @Input() minutes: number | undefined;
  @Input() currentMode!: Mode;
  @Output() changeCurrentMode = new EventEmitter<Mode>();

  onSlide(value: number) {
    this.minutes = value;
    this.currentMode = {...this.currentMode, value: 'custom', label: 'Custom', [this.timer!]: this.minutes}
    this.changeCurrentMode.emit(this.currentMode);
  }
}
