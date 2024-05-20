/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Meu nome é João Marcos e gostaria de testar o meu programa'
        cy.clock()
        cy.get('#firstName').type("João Marcos")
        cy.get('#lastName').type("Cirilo Saccani")
        cy.get('#email').type("joaomarcos44mu@gmail.com")
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('error ao preecnher email com formatação inadequada', function() {
        cy.clock()
        cy.get('#firstName').type("João Marcos")
        cy.get('#lastName').type("Cirilo Saccani")
        cy.get('#email').type("joaomarcos44mu@gmail,com")
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
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

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it("preencha a area de texto usando invoke", function(){
        const longText = Cypress._.repeat("EU AMO CATARINA MUITAO ", 20)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })
    it("usando cy.request requisição HTTP", function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
          const{ status, statusText, body} = response
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
          expect(body).to.include('CAC TAT') 
        })
    })
    it.only("achando o gato escondido", function(){
       cy.get('#cat')
        .invoke('show')
        .should('be.visible')
       cy.get('#title')
        .invoke('text','Testes Para meu MOMO ❤️') 
       cy.get('#subtitle')
        .invoke('text', 'Meu amor todynho é minha mulher chamada catarina')  
    })     
})    