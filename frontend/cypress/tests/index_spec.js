describe('The Home Page', () => {
  it('Successfully loads and displays default content', () => {
    cy.visit('/')

    cy.get('#root')
      .should('contain', 'Channels')
      .should('be.visible')

    cy.get('#root')
      .should('contain', 'Users')
      .should('be.visible')

    cy.get('#root')
      .should('contain', 'Select A Channel')
      .should('be.visible')

  })

})
