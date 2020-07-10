/// <reference types="Cypress" />

context('client form', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should suggest labels', () => {
    ['client-with-label-1', 'client-with-label-2'].forEach(name => {
      cy.deleteClientByName(name);
      cy.createClient({
        name,
        enabled: true,
        config: {label: 'some-label'}
      });
    });

    cy.visit('/add');
    cy.get('[data-cy="label-suggester"]').type('some');
    cy.contains('some-label');
  });

  it('should create client using forms', () => {
    const name = 'test-client';
    cy.visit('/add');
    cy.contains('Create new client');
    cy.get('[data-cy="name-input"').type(name);
    cy.get('[data-cy="label-suggester"]').type('test-label');
    cy.get('[data-cy="contant-name-input"]').type('Arne');
    cy.get('[data-cy="contact-email-input"]').type('test@test.dk');
    cy.get('[data-cy="contact-phone-input"]').type('123');
    cy.get(`.slider`).click();
    cy.get(`.submit`).click();
    cy.get(`.editclient`).click();

    cy.contains(name);
    cy.contains('test-label');
    cy.contains('Arne');
    cy.contains('test@test.dk');
    cy.contains('123');
  });
});
