import { BookFilterPipe } from './book-filter.pipe';

describe('BookFilterPipe', () => {
  let pipe: BookFilterPipe;

  const books = [
    { title: 'Angular', isbn: '123', price: 10, rating: 5, coverUrl: '' },
    { title: 'React', isbn: '456', price: 12, rating: 3, coverUrl: '' },
    { title: 'Vue2', isbn: '789', price: 19, rating: 4, coverUrl: '' },
    { title: 'Vue3', isbn: '790', price: 19, rating: 4, coverUrl: '' },
  ];

  beforeEach(() => {
    pipe = new BookFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not change an empty book list', () => {
    const result = pipe.transform([], 'Angular');
    expect(result).toEqual([]);
  });

  it('should not change a book list when the filter is empty', () => {
    const result = pipe.transform(books, '');
    expect(result).toEqual(books);
  });

  it('should find a matching book', () => {
    const result = pipe.transform(books, 'Angular');
    expect(result).toEqual([books[0]]);
  });

  it('should find a matching book with different capitalizations', () => {
    ['angular', 'Angular', 'ang'].forEach((search) => {
      const result = pipe.transform(books, search);
      expect(result).toEqual([books[0]]);
    });
  });

  it('should find multiple matching books', () => {
    ['vue', 'Vue', 'VUE'].forEach((search) => {
      const result = pipe.transform(books, search);
      expect(result.length).toEqual(2);
    });
  });
});
