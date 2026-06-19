import address from '../fixtures/cep.json';

describe('Validações de CEP', () => {
    beforeEach(() => {
        cy.login();
        cy.goTo('Integração', 'Consulta de CEP');
    })

    //interagindo com a API de consulta de CEP usando interceptação de requisições para simular a resposta da API e validar os dados retornados no formulário de consulta de CEP
    it('Deve validar a consultar de CEP ', () => {

        cy.intercept('GET', `https://viacep.com.br/ws/${address.cep.replace('-', '')}/json/`, { //intercepta a requisição GET para a API de consulta de CEP e simula uma resposta com os dados do arquivo de fixture
            statusCode: 200, //simula uma resposta de sucesso da API de consulta de CEP com os dados do arquivo de fixture
            body: {

                logradouro: address.street, 
                bairro: address.neighborhood,
                localidade: address.city,
                uf: address.state
            }
        }).as('getCep') //espera a resposta da requisição interceptada para garantir que os dados do CEP foram carregados antes de fazer as asserções

        cy.get('#cep').type(address.cep)
        cy.get('button').contains('Buscar').click();

        cy.wait('@getCep')

        cy.get('#street').should('have.value', address.street);
        cy.get('#neighborhood').should('have.value', address.neighborhood);
        cy.get('#city').should('have.value', address.city);
        cy.get('#state').should('have.value', address.state);
    })

    //ter o controle total sobre o fluxo de teste, garantindo que a limpeza dos dados e o reset do estado da aplicação  
    after(() => {
        cy.log('Isso acontecerá depois de todos os testes uma única vez');
    })
})

