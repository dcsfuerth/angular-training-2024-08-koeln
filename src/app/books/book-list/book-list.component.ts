import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Book } from '../book';
import { BookDataService } from '../book-data.service';

import {
  ColDef,
  RowSelectedEvent,
  SelectionChangedEvent,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

export interface Bestellung {
  isbn: string;
  besteller: string;
  anzahl: number;
}

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
  bestellungenDesAktuellenBuches: Array<Bestellung> = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'isbn' },
    { field: 'title' },
    { field: 'price' },
    { field: 'rating' },
    { field: 'coverUrl' },
  ];

  bestellungen: Array<Bestellung> = [
    { isbn: '12345', besteller: 'Peter', anzahl: 2 },
    { isbn: '12346', besteller: 'Peter', anzahl: 1 },
    { isbn: '12345', besteller: 'Heinz', anzahl: 1 },
    { isbn: '12346', besteller: 'Heinz', anzahl: 1 },
    { isbn: '12345', besteller: 'Marcus', anzahl: 2 },
    { isbn: '12346', besteller: 'Marcus', anzahl: 2 },
  ];

  constructor(private bookDataService: BookDataService) {}

  // ------------------------------------------------

  ngOnInit(): void {
    this.bookDataService.getBooks().subscribe((books) => {
      this.rowData = books;
      this.books = books;
    });
  }

  getBestellungen(isbn: string): Array<Bestellung> {
    return this.bestellungen.filter((bestellung) => bestellung.isbn === isbn);
  }

  // ------------------------------------------------

  onRowSelected(row: RowSelectedEvent<Book, any>) {}

  // ------------------------------------------------

  onSelectionChanged($event: SelectionChangedEvent<Book, any>) {
    let isbn = null;
    this.bestellungenDesAktuellenBuches = [];

    const selectedRows = $event.api.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      isbn = selectedRows[0].isbn;
      this.bestellungenDesAktuellenBuches = this.getBestellungen(isbn);
    }
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
