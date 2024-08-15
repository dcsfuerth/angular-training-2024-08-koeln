import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  x: string = '';
  y: string = '';
  result: number = 0;

  add() {
    this.result = this.getX() + this.getY();
  }
  subtract() {
    this.result = this.getX() - this.getY();
  }

  reset() {
    this.x = '';
    this.y = '';
    this.result = 0;
  }

  getX(): number {
    const value = parseInt(this.x);
    // if (isNaN(value)) {
    //   alert('Please enter a valid number');
    // }
    return parseInt(this.x) || 0;
  }

  getY(): number {
    return parseInt(this.y) || 0;
  }
}
