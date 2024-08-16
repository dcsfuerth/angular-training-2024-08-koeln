import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookDataService } from '../book-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'books-book-insert',
  templateUrl: './book-insert.component.html',
  styleUrl: './book-insert.component.css',
})
export class BookInsertComponent {
  bookForm: FormGroup;

  constructor(
    private bookDataService: BookDataService,
    private router: Router
  ) {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [Validators.required, this.enthaeltISBN]),
      title: new FormControl('', [Validators.required]),
      price: new FormControl(0),
      coverUrl: new FormControl(''),
    });

    // this.bookForm.valueChanges.subscribe((value) => {
    //   console.log('neuer Formularinhalt', value);
    // });
  }

  async speichern() {
    try {
      await this.bookDataService.saveBookAsPromise(this.bookForm.value);
      alert('Buch wurde gespeichert');
      this.router.navigate(['/books']);
    } catch (error) {
      console.log({ error });
      alert('Fehler beim Speichern' + error);
    }
  }

  enthaeltISBN(c: AbstractControl): { [key: string]: boolean } | null {
    let wert = ('' + c.value).toLocaleLowerCase().trim();

    // 978-3-86680-192-9
    wert = wert.replaceAll('-', '');

    if (wert.length !== 13) {
      return { isbnFalscheLaenge: true };
    }

    const isbnAlsZahl = parseInt(wert);
    if (isNaN(isbnAlsZahl)) {
      return { isbnFalscheZeichen: true };
    }

    if ('' + isbnAlsZahl != wert) {
      return { isbnFalscheZeichen: true };
    }

    return null;
  }
}
