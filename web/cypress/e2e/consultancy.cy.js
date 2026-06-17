import { personal, company } from '../fixtures/consultancy.json'

describe("formulario de Consultoria", () => {

  beforeEach(() => {
    cy.login();
  
    cy.goTo("Formulários", "Consultoria");

    cy.fixture('consultancy').as('consultancyData');    //carrega os dados do arquivo de fixture e atribui um alias para poder usar os dados nos testes

  });  

  it("Deve solicitar consultoria Individual", () => {     //não posso usar arrow function aqui porque preciso acessar o this para pegar os dados do arquivo de fixture
    cy.fillConsultancyForm(personal);
    cy.submitConsultancyForm();
  
  });

  it("Deve solicitar consultoria In Company", () => {

    cy.fillConsultancyForm(company);
    cy.submitConsultancyForm();
  

  });

  it("Deve verificar os campos obrigatórios", () => {

    cy.submitConsultancyForm();

    const requireFields = [
      { label: "Nome Completo", message: "Campo obrigatório" }, 
      { label: "Email", message: "Campo obrigatório" },
      { label: "termos de uso", message: "Você precisa aceitar os termos de uso" }
    ]

    requireFields.forEach(({ label, message }) => {
       
      cy.contains("label", label, { timeout: 10000 })
        .parent()
        .find("p") //encontra o parágrafo de erro dentro do elemento pai do label de nome completo
        .should("be.visible")
        .and("have.text", message)
        .and("have.class", "text-red-400") 
        .and("have.css", "color", "rgb(248, 113, 113)");

    })

  })
})