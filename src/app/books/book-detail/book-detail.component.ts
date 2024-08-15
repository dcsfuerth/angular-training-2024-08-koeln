import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDataService } from '../book-data.service';
import { Book } from '../book';

@Component({
  selector: 'books-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent {
  book: Book | null = null;
  book$: Promise<Book> | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookDataService: BookDataService
  ) {}

  async ngOnInit() {
    const isbn = this.route.snapshot.params['isbn'];
    this.book = await this.bookDataService.getBookAsPromise(isbn);
    console.log('Ergebnis', this.book);

    // this.book$ = this.bookDataService.getBookAsPromise(isbn);

    // const promise1 = this.bookDataService.getBookAsPromise(isbn);
    // promise1.then((book) => {
    //   this.book = book;
    //   console.log('blubb');
    // });

    // const anfrage1 = this.bookDataService.getBookAsPromise('12345');
    // const anfrage2 = this.bookDataService.getBookAsPromise('12346');
    // const beide = await Promise.all([anfrage1, anfrage2]);
    // console.log(beide);
  }
}
