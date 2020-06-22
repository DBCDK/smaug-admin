/// <reference types="Cypress" />

context('client enable-disable', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should be able to enable disable client', () => {
    const name = 'enable-test-client';
    cy.deleteClientByName(name);
    cy.createClient({
      name,
      enabled: true
    });

    cy.visit('/');

    // check its enabled
    cy.get(`[data-cy="${name}-enabled"`);

    // toggle
    cy.get(`[data-cy="${name}-enabled"`).click();

    // check it has been disabled
    cy.get(`[data-cy="${name}-disabled"`);

    // reload and check its still disabled
    cy.reload();
    cy.get(`[data-cy="${name}-disabled"`);

    // check that it can be enabled again
    cy.get(`[data-cy="${name}-disabled"`).click();
    cy.get(`[data-cy="${name}-enabled"`);
    cy.reload();
    cy.get(`[data-cy="${name}-enabled"`);
  });
});
