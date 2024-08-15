import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TrackByFunction,
} from '@angular/core';
import { Book } from '../book';
import { BookDataService } from '../book-data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit, OnChanges, OnDestroy {
  books: Array<Book> = [];
  coverIsVisible = true;
  filterValue: string = '';

  constructor(private bookDataService: BookDataService) {
    console.log('constructor');
  }

  ngOnInit(): void {
    // const obs = this.bookDataService.getBooks();

    this.bookDataService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  plus(isbn: string) {
    const book = this.books.find((book) => book.isbn === isbn);
    if (book) {
      book.rating = Math.min(5, parseFloat((book.rating + 0.1).toFixed(1)));
    }
  }

  minus(isbn: string) {
    const book = this.books.find((book) => book.isbn === isbn);
    if (book) {
      book.rating = Math.max(1, parseFloat((book.rating - 0.1).toFixed(1)));
    }
  }

  trackbook: TrackByFunction<Book> = (_index, book) => {
    return book.isbn;
  };

  // ------------------------------------------------

  toggleCover() {
    this.coverIsVisible = !this.coverIsVisible;
  }

  // trackbook(book: Book) {
  //   return book.isbn;
  // }
}
