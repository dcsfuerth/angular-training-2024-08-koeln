import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  @Input()
  stars: number = 0;

  @Input()
  id: string = '';

  @Output()
  plusWasClicked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  minusWasClicked: EventEmitter<string> = new EventEmitter<string>();

  plus() {
    this.plusWasClicked.emit(this.id);
  }

  minus() {
    this.minusWasClicked.emit(this.id);
  }
}
