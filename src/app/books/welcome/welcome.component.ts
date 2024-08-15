import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { decrement, increment, reset } from '../../counter/counter.actions';

@Component({
  selector: 'books-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  count$: Observable<number> = of(0);

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count'); // Selektor
    // alternativ:
    // this.count$ = store.select((state) => state.count);
  }

  inc() {
    this.store.dispatch(increment());
  }

  dec() {
    this.store.dispatch(decrement());
  }

  res() {
    this.store.dispatch(reset());
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
