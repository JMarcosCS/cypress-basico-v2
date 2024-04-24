it('testa a página política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html')

    cy.get('#white-background > :nth-child(5)').should('be.visible')
})