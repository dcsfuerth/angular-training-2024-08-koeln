describe('book list', () => {
  it('loads the book list', () => {
    cy.visit('/');
    cy.contains('Hallo books!');
    cy.get('[data-cy=link-to-books]').click();
    cy.contains('Die Bücherliste');
  });

  it('gets the complete list of books', () => {
    cy.visit('/books');
    cy.get('[data-cy=book-list-row]').should('have.length', 5);
  });

  it('filter the list of books', () => {
    cy.visit('/books');
    cy.get('[data-cy=book-filter-input]').type('18');
    cy.get('[data-cy=book-list-row]').should('have.length', 1);
  });

  it('increase the rating', () => {
    cy.visit('/books');
    cy.get('[data-cy=plus-12346]').click();
    cy.get('[data-cy=stars-12346]').contains('4.8');
  });
});
