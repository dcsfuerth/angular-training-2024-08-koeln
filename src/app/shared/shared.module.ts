import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CalculatorComponent } from './calculator/calculator.component';
import { RatingComponent } from './rating/rating.component';
@NgModule({
  declarations: [CalculatorComponent, RatingComponent],
  imports: [BrowserModule, FormsModule],
  exports: [CalculatorComponent, RatingComponent],
  providers: [],
  bootstrap: [],
})
export class SharedModule {}
