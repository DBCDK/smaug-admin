/// <reference types="Cypress" />

context('Client list', () => {
  beforeEach(() => {
    cy.login();
  });

  describe('labels', () => {
    it('should show label for client', () => {
      ['client-with-label-1'].forEach(name => {
        cy.deleteClientByName(name);
        cy.createClient({
          name,
          enabled: true,
          config: {label: 'some-label'}
        });
      });

      cy.visit('/');
      cy.get(`[data-cy=client-client-with-label-1] [data-cy=label-some-label]`);
    });

    it('should group label', () => {
      ['client-with-label-1', 'client-with-label-2'].forEach(name => {
        cy.deleteClientByName(name);
        cy.createClient({
          name,
          enabled: true,
          config: {label: 'some-label'}
        });
      });

      ['client-with-label-3', 'client-with-label-4'].forEach(name => {
        cy.deleteClientByName(name);
        cy.createClient({
          name,
          enabled: true,
          config: {label: 'some-other-label'}
        });
      });

      ['client-without-label'].forEach(name => {
        cy.deleteClientByName(name);
        cy.createClient({
          name,
          enabled: true
        });
      });

      cy.visit('/');
      cy.get('[data-cy=label-label]').click();

      // Check 'some-label' group
      cy.get('[data-cy=group-some-label] [data-cy=client-client-with-label-1]');
      cy.get('[data-cy=group-some-label] [data-cy=client-client-with-label-2]');

      // Check 'some-other-label' group
      cy.get(
        '[data-cy=group-some-other-label] [data-cy=client-client-with-label-3]'
      );
      cy.get(
        '[data-cy=group-some-other-label] [data-cy=client-client-with-label-4]'
      );

      // Check the labelless group
      cy.get('[data-cy=group-Labelless] [data-cy=client-client-without-label]');
    });
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
