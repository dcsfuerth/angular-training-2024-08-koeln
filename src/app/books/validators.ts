export function istIsbn(wert: string): any {
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
