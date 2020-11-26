const randomNumber = Math.floor(Math.random() * 10000);

function fillOutRegisterOrLoginForm(url) {
  cy.get(`[href="${url}"] > h1`).click();
  cy.location('pathname', { timeout: 600000 }).should('include', `${url}`);
  cy.get('form > :nth-child(2)')
    .click()
    .type('TestUser' + randomNumber);
  cy.get('[type="password"]').click().type('Password');
  cy.get('button').click();
}

describe('Test user features', () => {
  it('Test for Register', () => {
    cy.visit('http://localhost:3000/1');
    cy.viewport(360, 740);
    cy.get('.toggleButton').click();
    cy.get('.login').click();
    fillOutRegisterOrLoginForm('/register');
  });
  it('Test for Login/saving Recipes/Commenting', () => {
    cy.viewport(360, 740);
    fillOutRegisterOrLoginForm('/login');
    cy.get('.css-13kj6bh-sidebar > img').should('be.visible');
    cy.get('[data-cy=index-render-recipes-link2]').click();
    cy.get('[data-cy=dynamic-page-add-buttom]').should('be.visible').click();
    cy.go('back');
    cy.get('[data-cy=index-render-recipes-link1]').click();
    cy.get('[data-cy=dynamic-page-add-buttom]').should('be.visible').click();
    cy.get('.toggleButton').click();
    cy.get('[data-cy=header-saved-recipes-link]').should('be.visible').click();
    cy.contains('Carbonara');
    cy.contains('Shakshuka');
    cy.get('.css-1d2ct1i > .frontContainer > .buttoncontainer > .delete')
      .should('be.visible')
      .click();
    cy.get('.css-1d2ct1i').should('not.exist');
    cy.get('.view').click();
    cy.url().should('include', '/2');
    cy.get('textarea')
      .click()
      .type('Test User' + randomNumber + 'like this recipe');

    cy.get('input').click();
    cy.contains('Test User' + randomNumber + 'like this recipe');
    cy.reload();
    cy.contains('Test User' + randomNumber + 'like this recipe');
  });
});
