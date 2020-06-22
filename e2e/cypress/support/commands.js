// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: '/login',
    form: true,
    body: {
      uri: 'http://smaug:3002',
      username: 'admin',
      password: 'admin'
    }
  });
});

Cypress.Commands.add('createClient', client => {
  cy.request({
    method: 'POST',
    url: '/add',
    form: true,
    body: {
      name: client.name,
      config: (client.config && JSON.stringify(client.config)) || '{}',
      contact: [
        {
          role: 'owner',
          name: 'test-name',
          email: 'test@dbc.dk',
          phone: ''
        }
      ],
      enabled: client.enabled
    }
  });
});

Cypress.Commands.add('deleteClientByName', name => {
  cy.request('/api/clients').then(res => {
    res.body.forEach(client => {
      if (client.name === name) {
        cy.request({method: 'POST', url: `/remove/${client.id}`});
      }
    });
  });
});
