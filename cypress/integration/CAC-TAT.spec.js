/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Meu nome é João Marcos e gostaria de testar o meu programa'
        cy.get('#firstName').type("João Marcos")
        cy.get('#lastName').type("Cirilo Saccani")
        cy.get('#email').type("joaomarcos44mu@gmail.com")
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('error ao preecnher email com formatação inadequada', function() {
        cy.get('#firstName').type("João Marcos")
        cy.get('#lastName').type("Cirilo Saccani")
        cy.get('#email').type("joaomarcos44mu@gmail,com")
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo de telefone não aceita valor numérico', function(){
        cy.get('#phone')
            .type('João')
            .should('have.value', '')
    })

    it('error quando telefone se torna obrigatório e não é preenchido', function(){
        cy.get('#firstName').type("João Marcos")
        cy.get('#lastName').type("Cirilo Saccani")
        cy.get('#email').type("joaomarcos00cs@gmail,com")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')   
    })

    it('preenche e limpa campos, nome, sobrenome e email', function(){
        cy.get('#firstName')
            .type("João Marcos")
            .should('have.value', 'João Marcos')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type("Cirilo Saccani")
            .should('have.value', 'Cirilo Saccani')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type("joaomarcos44mu@gmail.com")
            .should('have.value', 'joaomarcos44mu@gmail.com')
            .clear()
            .should('have.value', '')
        
        cy.get('#phone')
            .type('27995221414')
            .should('have.value', '27995221414')
            .clear()
            .should('have.value', '')
    })

    it('preenche e limpa campos, nome, sobrenome e email', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')        
    })

    it('envia formulário com sucesso', function() {
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get('.success').should('be.visible')
    })

    it('verifica selection', function() {
        cy.get('select')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('verifica selection', function() {
        cy.get('select')
        .select('Mentoria')
        .should('have.value', 'mentoria')
    })

    it('verifica selection', function() {
        cy.get('select')
        .select(1)
        .should('have.value', 'blog')
    })
    
    it('verifica radio', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('verifica radio each, wrap', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    
    })

    it('marca ambos os checkboxes', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
       cy.fixture('example.json').as('sampleFile')
       cy.get('input[type="file"]')
       .selectFile('@sampleFile')
       .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it("target _blank", function(){
        cy.get('#privacy a').should('have.attr','target', '_blank')
    })

    it("target _blank", function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.get('#white-background > :nth-child(5)').should('be.visible')
    })
})    