describe("Testando o vídeo", () => {
  it("dever poder tocar o video de exemplo", () => {
    cy.login();

    cy.contains("Video").click();

    // think time
    cy.wait(3000); // Aguarda o vídeo carregar / devido que pode dar erro de carregamento do vídeo

    cy.get('iframe[title="Video Player"]')
      .click()
      .should("exist") // Verifica se o iframe existe
      .its("0.contentDocument.body") // Acessa o conteúdo do iframe
      .then(cy.wrap) // Envolve o conteúdo do iframe para usar comandos do Cypress
      .as('iFramePlayer'); // Dá um alias para o conteúdo do iframe

    cy.get('@iFramePlayer')
      .find('.play-button')
      .click(); // Clica no botão de play

    cy.get('@iFramePlayer')
      .find('.pause-button')
      .should('be.visible'); // Verifica se o botão de pause está visível, indicando que o vídeo está tocando


  });
});
