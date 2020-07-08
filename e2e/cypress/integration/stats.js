/// <reference types="Cypress" />

context('Stats', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should show stats for client', () => {
    const name = 'client-with-stats';
    cy.deleteClientByName(name);
    cy.createClient({
      name
    });
    cy.getClientByName(name).then(client => {
      cy.server();
      cy.route('GET', '/api/stats', {
        hejmdalStats: {[client.id]: {'/login': {last30: 80}}},
        openplatformStats: {
          [client.id]: {
            work: {last30: 10},
            suggest: {last30: 20},
            search: {last30: 30},
            storage: {last30: 40},
            user: {last30: 50},
            order: {last30: 60},
            recommend: {last30: 70}
          }
        }
      });

      cy.visit('/stats');
      cy.get(`[data-cy=client-${name}] [data-cy="/login-80"]`);
      cy.get(`[data-cy=client-${name}] [data-cy="/work-10"]`);
      cy.get(`[data-cy=client-${name}] [data-cy="/suggest-20"]`);
      cy.get(`[data-cy=client-${name}] [data-cy="/search-30"]`);
      cy.get(`[data-cy=client-${name}] [data-cy="/storage-40"]`);
      cy.get(`[data-cy=client-${name}] [data-cy="/user-50"]`);
      cy.get(`[data-cy=client-${name}] [data-cy="/order-60"]`);
      cy.get(`[data-cy=client-${name}] [data-cy="/recommend-70"]`);
    });
  });

  it('should show error when stats request fails', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/stats',
      status: 500,
      response: {body: {}}
    });
    cy.visit('/stats');
    cy.contains('Kunne ikke hente stats');
  });
});
