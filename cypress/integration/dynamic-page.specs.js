describe('Test dynamic Page for non Users/Desktop', () => {
  it('Test for Desktop', () => {
    cy.visit('http://localhost:3000/1');
    cy.viewport(1400, 1050);
    cy.get('.picture > a ').click();
    cy.contains('Username');
    cy.go('back');
    cy.get('.alternativeDiv ').click();
    cy.contains('Username');
    cy.go('back');
    cy.get(':nth-child(4) > a').click();
    cy.contains('basically');
    cy.go('back');
  });
});

describe('Test dynamic Page for non Users/Mobile', () => {
  it('Test for Mobile', () => {
    cy.visit('http://localhost:3000/1');
    cy.viewport(360, 740);
    cy.get('.toggleButton').click();
    cy.get('.picture > a ').click();
    cy.contains('Username');
    cy.go('back');
    cy.get('.alternativeDiv ').click();
    cy.contains('Username');
    cy.go('back');
    cy.get(':nth-child(4) > a').click();
    cy.contains('basically');
    cy.go('back');
  });
});
