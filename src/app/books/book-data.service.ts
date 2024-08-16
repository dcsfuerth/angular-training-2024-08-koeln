import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookDataService {
  /** erstellt eine neue Instanz des  BookDataService, dient hier primär dazu debn HttpClient als Abhängigkeit festzulegen */
  constructor(private http: HttpClient) {
    console.log('environment.BASE_URL', environment.BASE_URL);
  }

  /** lädt die Liste ALLER Bücher
   * @returns Observable<Array<Book>> - Liste aller Bücher als Observable
   */
  getBooks(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(environment.BASE_URL + '/books');
  }

  getBookAsPromise(isbn: string): Promise<Book> {
    return firstValueFrom(this.getBook(isbn));
  }

  /** lädt das Buch mit der übergebenen ISBN
   * @param isbn - ISBN des zu ladenden Buchs
   * @returns Observable<Book> - das Buch mit der übergebenen ISBN als Observable
   */
  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${environment.BASE_URL}/books/${isbn}`);
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.BASE_URL}/books`, book);
  }
  saveBookAsPromise(book: Book): Promise<Book> {
    return firstValueFrom(this.saveBook(book));
  }
}
