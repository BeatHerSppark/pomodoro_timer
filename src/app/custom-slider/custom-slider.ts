import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-slider',
  imports: [],
  templateUrl: './custom-slider.html',
  styleUrl: './custom-slider.css',
})
export class CustomSlider {
  @Input() mode: string | undefined;
  @Input() minutes: number | undefined;

  onSlide(value: number) {
    this.minutes = value;
  }
}
