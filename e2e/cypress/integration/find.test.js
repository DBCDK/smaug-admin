/// <reference types="Cypress" />

const enterSearchString = key =>
  cy
    .get('[data-cy=searchForm] input[type=text]')
    .clear()
    .type(key);

const hitEnterKeyOnSearch = () => cy.get('[data-cy=searchForm]').submit();

const hitMagnifyingGlassOnSearch = () =>
  cy.get('[data-cy=searchForm] button.search-button svg').click();

const verifySearchPage = key => {
  // Verify url
  cy.url().should('include', '/find/' + key);

  // Verify input field
  cy.get('[data-cy=searchForm] input[type=text]').should('have.value', key);

  // Verify page title and column headers
  cy.get('h1[data-cy=pageHeader]').should('contain', 'Search');
  cy.get('[data-cy=searchResultTable] label')
    .eq(0)
    .should('contain', 'Name');
  cy.get('[data-cy=searchResultTable] label')
    .eq(1)
    .should('contain', 'Hits');
  cy.get('[data-cy=searchResultTable] label')
    .eq(2)
    .should('contain', 'Enabled');
};

const verifyEmptySearchPage = key => {
  verifySearchPage(key);
  cy.get('[data-cy=searchResultTable] .elements .client').should(
    'have.length',
    0
  );
};

const verifyNotEmptySearchPage = (key, count) => {
  verifySearchPage(key);
  cy.get(
    '[data-cy=searchResultTable] .elements .client a.name span.highlighted'
  )
    .should('have.length', count)
    .should('contain', key);
  cy.get('[data-cy=searchResultTable] .elements .client a.hit span.highlighted')
    .should('have.length', count)
    .should('contain', key);
};

context('Find', () => {
  it('Test that search field does not exist when not logged in', () => {
    cy.visit('/');
    cy.get('[data-cy=searchForm]').should('not.exist');
  });

  it('Test that search field is visible when logged in', () => {
    cy.login();
    cy.visit('/');
    cy.get('[data-cy=searchForm]').should('exist');
    cy.get('[data-cy=searchForm] button.search-button svg').should(
      'be.visible'
    );
    cy.get('[data-cy=searchForm] input[type=text]').should('be.visible');
  });

  it('Test submit search with enter key', () => {
    cy.login();
    cy.visit('/');
    enterSearchString('SomeSearchString');
    hitEnterKeyOnSearch();
    verifyEmptySearchPage('SomeSearchString');
  });

  it('Test submit search with Magnifying Glass button', () => {
    cy.login();
    cy.visit('/');
    enterSearchString('AnotherSearchString');
    hitMagnifyingGlassOnSearch();
    verifyEmptySearchPage('AnotherSearchString');
  });

  it('Test positive search result with one created client', () => {
    cy.login();
    const name = 'FirstCypressTestClient';
    cy.deleteClientByName(name);
    cy.createClient({
      name,
      enabled: true
    });
    cy.visit('/');

    enterSearchString(name);
    hitEnterKeyOnSearch();
    verifyNotEmptySearchPage(name, 1);
    cy.deleteClientByName(name);
  });
});
