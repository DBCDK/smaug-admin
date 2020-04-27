/// <reference types="Cypress" />

context('Login', () => {
  beforeEach(() => {
  });

  it('should redirect to login screen', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/login');
  });

  it('should have submit and 4 input fields', () => {
    cy.visit('/');
    cy.get('input[type=submit]').should('be.visible');
    cy.get('input[type=submit]').invoke('attr', 'value').should('contain', 'Login');
    cy.get('input').should('have.length', 4);
  });
});
