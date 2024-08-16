import { BookListComponent } from './book-list.component';

const books = [
  { title: 'Angular', isbn: '12345', price: 10, rating: 4.0, coverUrl: '' },
  { title: 'React', isbn: '456', price: 12, rating: 5, coverUrl: '' },
  { title: 'Vue2', isbn: '789', price: 19, rating: 4, coverUrl: '' },
  { title: 'Vue3', isbn: '790', price: 19, rating: 4, coverUrl: '' },
];

describe('BookListComponent', () => {
  let bookListComponent: BookListComponent;

  beforeEach(() => {
    bookListComponent = new BookListComponent(null);
  });

  it('should find the book and increase the rating', () => {
    bookListComponent.books = books;
    bookListComponent.plus('12345');
    const book = bookListComponent.books.find((book) => book.isbn === '12345');
    expect(book).toBeTruthy();
    expect(book!.rating).toBe(4.1);
  });

  it('should find the book and keep the rating if its already a five', () => {
    bookListComponent.books = books;
    bookListComponent.plus('456');
    const book = bookListComponent.books.find((book) => book.isbn === '456');
    expect(book).toBeTruthy();
    expect(book!.rating).toBe(5);
  });
});
