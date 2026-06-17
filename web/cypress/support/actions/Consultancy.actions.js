//importa as ações do arquivo de ações para poder usar as ações nos testes 

Cypress.Commands.add('fillConsultancyForm', (from) => {

    cy.get("#name").type(from.name).should("be.visible");
    cy.get("#email").type(from.email).should("be.visible");
    cy.get('input[placeholder="(00) 00000-0000"]').type(from.phone)   //.should("have.value", "(11) 99999-1000");
    cy.contains("label", "Tipo de Consultoria")
        .parent()
        .find("select")
        .select(from.consultancyType)  //seleciona a opção "inCompany" do select de tipo de consultoria

    if (from.personType == 'CPF') {
        cy.contains("label", "Pessoa Física")   // o contains vai encontrar o label, depois o parent sobe para o elemento pai, e depois o find procura o input dentro do elemento pai
            .find("input")    //encontra o input do tipo radio dentro do label de pessoa físi ca
            .click()          //posso usar tanto .click() quanto .check() para marcar o checkbox
            .should("be.checked");     //verifica se o checkbox de pessoa física está marcado

        cy.contains("label", "Pessoa Jurídica")
            .find("input")     //encontra o input dentro do label de pessoa jurídica
            .should("not.be.checked"); 
    }

    if (from.personType == 'CNPJ') {
        cy.contains("label", "Pessoa Jurídica") //o contains vai encontrar o label, depois o parent sobe para o elemento pai, e depois o find procura o input dentro do elemento pai
            .find("input")    //encontra o input do tipo radio dentro do label de pessoa física
            .click()          //posso usar tanto .click() quanto .check() para marcar o checkbox
            .should("be.checked");     //verifica se o checkbox de pessoa física está marcado

        cy.contains("label", "Pessoa Física")
            .find("input")     //encontra o input dentro do label de pessoa jurídica
            .should("not.be.checked");

        //cy.contains("label", "CNPJ")  // (/cnpj/i) caso queira deixa passar o cnpj tanto faz se for maúsculo ou minisculo 
        // .parent()
        //.find("input")
        //.type(from.document)
    }

    from.discoveryChannels.forEach((channel) => {    //para cada canal de descoberta, o teste vai encontrar o label correspondente, depois o input do tipo checkbox dentro do label, e marcar o checkbox
        cy.contains("label", channel)   //encontra o label do canal de descoberta
            .find("input[type='checkbox']")
            .check()
            .should("be.checked");
    })

    Cypress.on('uncaught:exception', (err, runnable) => { return false; });  //isso é para evitar que o teste falhe por causa de erros que não são relacionados ao teste, como erros de JavaScript na aplicação
    cy.get('input[type="file"]')
        .selectFile(from.file, { force: true });

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(from.description)
        //.should("be.visible");

    from.techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(`${tech}{enter}`, { force: true });

        cy.contains("label", "Tecnologias")
            .parent()
            .contains("span", tech)
            .should("be.visible");
    })

    if (from.terms === true) {
        cy.contains("label", "termos de uso")
            .find("input")
            .check()        //.should("be.checked");
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains("button", "Enviar formulário").click();
})

Cypress.Commands.add('SucessConsultancyModal', () => {
    cy.get(".modal", { timeout: 7000 })
        .should("be.visible")
        .find(".modal-content")
        .should("have.text", 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        .and("exist");
})