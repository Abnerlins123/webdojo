import 'cypress-real-events'
import './actions/consultancy.actions'
import { getTodayFormttedDate } from './actions/utils'

Cypress.Commands.add("start", () => {
  cy.visit('/')
})

Cypress.Commands.add("submitLoginForm", (email, senha) => {
  cy.visit('/')  

  cy.get("#email").type(email)
  cy.get("#password").type(senha)

  cy.contains("button", "Entrar").click()
})

Cypress.Commands.add("goTo", (buttonNome, pageTitle) => {
  cy.contains("button", buttonNome)
    .should("be.visible")
    .click()

  cy.contains("h1", pageTitle)
    .should("be.visible")
})


// Helpers para o teste de consultoria
Cypress.Commands.add('login', (ui = false) => {
  if (ui === true) {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
  } else {
    const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
    
    const loginDate = getTodayFormttedDate() 

    cy.setCookie('login_date', loginDate)

    cy.visit('/dashboard', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', token)
      }
    })
  }
})