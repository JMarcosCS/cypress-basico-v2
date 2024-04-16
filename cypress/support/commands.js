Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName')
        .type("João Marcos")
        .should('have.value', 'João Marcos')
        
     cy.get('#lastName')
        .type("Cirilo Saccani")
        .should('have.value', 'Cirilo Saccani')
        
    cy.get('#email')
        .type("joaomarcos44mu@gmail.com")
        .should('have.value', 'joaomarcos44mu@gmail.com')

    cy.get('#open-text-area')
        .type("teste")
        .should('have.value','teste')
        
    cy.get('#phone-checkbox').click() 
            
    cy.get('#phone')
        .type("27995221414")
        .should('have.value', '27995221414')
        
    cy.contains('button','Enviar').click()    
})