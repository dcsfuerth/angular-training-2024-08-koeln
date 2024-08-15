import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book';

@Pipe({
  name: 'bookFilter',
})
export class BookFilterPipe implements PipeTransform {
  // (books | bookFilter : filterValue)

  /**
   *
   * @param books
   * @param filterValue
   * @returns
   */
  transform(books: Array<Book>, filterValue: string = ''): Array<Book> {
    if (!filterValue) {
      return books;
    }

    filterValue = filterValue.toLowerCase();

    const result = books.filter(
      (book) => (book.title || '').toLowerCase().indexOf(filterValue) >= 0
    );

    return result;
  }
}
