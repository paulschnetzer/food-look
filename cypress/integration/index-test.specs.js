describe('Test index Page for non Users/Desktop', () => {
  it('Test for Navigation/Links', () => {
    cy.visit('http://localhost:3000');
    cy.viewport(1400, 1050);
    cy.get('[data-cy=header-about-link]').click();
    cy.contains('What is Food Look?');
    cy.get('[data-cy=header-home-link]').click();
    cy.get('[data-cy=header-saved-recipes-link]').should('be.visible').click();
    cy.contains('Username');
    cy.get('[data-cy=header-home-link]').click();
    cy.get('[data-cy=index-render-recipes-link1]').should('be.visible').click();
    cy.contains('Write Comment');
    cy.get('[data-cy=header-home-link]').click();
    cy.get('[data-cy=footer-github-link]').click();
    cy.contains('GitHub');
    cy.go('back');
    cy.get('[data-cy=footer-email-link]').click();
    cy.contains('Gmail');
    cy.go('back');
  });
  it('Test for searchbar', () => {
    cy.visit('http://localhost:3000');
    cy.viewport(1400, 1050);
    cy.get('[data-cy=sidebar-searchbar]').click();
    cy.contains('bacon');
    cy.get('[data-cy=sidebar-searchbar]')
      .click()
      .type('{downarrow}')
      .type('{downarrow}')
      .type('{downarrow}')
      .type('{enter}');
    cy.contains('bacon');
    cy.get('.css-1ssnssz-grid')
      .should('contain', 'Carbonara')
      .and('contain', 'French Toast')
      .and('contain', 'Shakshuka');
    cy.get('svg').click();
    cy.get('[data-cy=sidebar-searchbar]')
      .click()
      .type('No valid ing')
      .type('{enter}');
    cy.get('.css-1ssnssz-grid').children().should('have.length', 0);
  });
});

describe('Test index Page for non Users/Mobile', () => {
  it('Test for Navigation/Links', () => {
    cy.visit('http://localhost:3000');
    cy.viewport(360, 740);
    cy.get('.toggleButton').click();
    cy.get('[data-cy=header-about-link]').click();
    cy.contains('What is Food Look?');
    cy.get('.toggleButton').click();
    cy.get('[data-cy=header-home-link]').click();
    cy.get('.toggleButton').click();
    cy.get('[data-cy=header-saved-recipes-link]').click();
    cy.contains('Username');
    cy.go('back');
    cy.get('.toggleButton').click();
    cy.get('[data-cy=index-render-recipes-link1]').click();
    cy.contains('Write Comment');
    cy.get('.toggleButton').click();
    cy.get('[data-cy=header-home-link]').click();
    cy.get('[data-cy=footer-github-link]').click();
    cy.contains('GitHub');
    cy.go('back');
    cy.get('[data-cy=footer-email-link]').click();
    cy.contains('Gmail');
    cy.go('back');
  });
  it('Test for searchbar', () => {
    cy.visit('http://localhost:3000');
    cy.viewport(360, 740);
    cy.get('[data-cy=sidebar-searchbar]').click();
    cy.contains('bacon');
    cy.get('[data-cy=sidebar-searchbar]')
      .click()
      .type('{downarrow}')
      .type('{downarrow}')
      .type('{downarrow}')
      .type('{enter}');
    cy.contains('bacon');
    cy.get('.css-1ssnssz-grid')
      .should('contain', 'Carbonara')
      .and('contain', 'French Toast')
      .and('contain', 'Shakshuka');
    cy.get('svg').click();
    cy.get('[data-cy=sidebar-searchbar]')
      .click()
      .type('No valid ing')
      .type('{enter}');
    cy.get('.css-1ssnssz-grid').children().should('have.length', 0);
  });
});
