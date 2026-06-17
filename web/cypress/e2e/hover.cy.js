describe("Simulando Mouseover", () => {
  
  it("Deve mostrar um texto ao passar o mouse em cima do link do instagram", () => {
    
        cy.visit("http://localhost:3000")
        cy.login();
        cy.contains("Isso é Mouseover!").should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains("papito@webdojo.com").should('exist');
        cy.get('[data-cy="date-value"]').should('exist', 'string')
        cy.get('[data-cy="email-value"]').should('exist', 'string')
      
  });
});
