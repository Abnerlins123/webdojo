import { getTodayFormttedDate } from '../support/actions/utils'

describe("Login", () => {

  beforeEach(() => {
    cy.viewport('iphone-xr')
  })

it("Deve logar com sucesso", () => { // sobre o only e o Skip 
    cy.start();
    cy.submitLoginForm('papito@webdojo.com', 'katana123');

    cy.contains('h2', 'Fernando Papito')
      .should('be.visible')
      .and('have.text', 'Fernando Papito');

    cy.contains('p', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.');

    cy.getCookie('login_date').should('exist')

    cy.getCookie('login_date').should((cookie) => {
    
        expect(cookie.value).to.eq(getTodayFormttedDate())
      })

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[a-fA-F0-9]{32}$/) // O .match() vai procurar o padrão dentro da frase  /^[a-fA-F0-9]{32}$/ - variação regular que vai buscar no formato MD5
    })
  })
    it("Não deve logar com senha inválida", () => {
      cy.start()
      cy.submitLoginForm('papito@webdojo.com', 'katana153')

      cy.contains('Acesso negado! Tente novamente.')
        .should('be.visible');

    })

    it("Não deve logar com email não cadastrado", () => {
      cy.start()
      cy.submitLoginForm('papito@gmail.co', 'katana123')
      cy.contains('Acesso negado! Tente novamente.')
        .should('be.visible');
    })
  })
