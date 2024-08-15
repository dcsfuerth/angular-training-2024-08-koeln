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

import {
  ColDef,
  RowSelectedEvent,
  SelectionChangedEvent,
} from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: Array<Book> = [];
  coverIsVisible = true;
  filterValue: string = '';

  rowData: Book[] = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'isbn' },
    { field: 'title' },
    { field: 'price' },
    { field: 'rating' },
    { field: 'coverUrl' },
  ];

  public themeClass = 'ag-theme-quartz'; //'ag-theme-quartz-dark';

  constructor(private bookDataService: BookDataService) {}

  ngOnInit(): void {
    this.bookDataService.getBooks().subscribe((books) => {
      this.rowData = books;
      this.books = books;
    });
  }

  onRowSelected(row: RowSelectedEvent<Book, any>) {}

  onSelectionChanged($event: SelectionChangedEvent<Book, any>) {
    let isbn = null;
    const selectedRows = $event.api.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      isbn = selectedRows[0].isbn;
    }
    console.log('Row onSelectionChanged: ', isbn);
  }

  // ------------------------------------------------

  plus(isbn: string) {
    const book = this.books.find((book) => book.isbn === isbn);
    if (book) {
      book.rating = Math.min(5, parseFloat((book.rating + 0.1).toFixed(1)));
    }
  }

  // ------------------------------------------------

  minus(isbn: string) {
    const book = this.books.find((book) => book.isbn === isbn);
    if (book) {
      book.rating = Math.max(1, parseFloat((book.rating - 0.1).toFixed(1)));
    }
  }

  // ------------------------------------------------

  trackbook: TrackByFunction<Book> = (_index, book) => {
    return book.isbn;
  };

  // ------------------------------------------------

  toggleCover() {
    this.coverIsVisible = !this.coverIsVisible;
  }
}
