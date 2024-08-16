it('loads examples', () => {
  cy.visit('/');
  cy.contains('Hallo books!');
  cy.screenshot();
});
