import { istIsbn } from './validators';

describe('istIsbn', () => {
  it('should return null for a valid ISBN-13', () => {
    const result = istIsbn('978-3-86680-192-9');
    expect(result).toBeNull();
  });
  it('should return error for ISBN with incorrect length', () => {
    const result = istIsbn('978-3-86680-192');
    expect(result).toEqual({ isbnFalscheLaenge: true });
  });

  it('should return error for ISBN with invalid length and invalid characters', () => {
    const result = istIsbn('978-3-86680-192-X');
    expect(result).not.toBe(null);
  });

  it('should return error for ISBN with correct length but invalid characters', () => {
    const result = istIsbn('978-3-86680-192-o');
    expect(result).toEqual({ isbnFalscheZeichen: true });
  });
});
