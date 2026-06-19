describe('Gerencimento de Perfil no Github', () => {


    beforeEach(() => {
        cy.login();
        cy.goTo('Tabela', 'Perfis do GitHub');
    })

    it('Deve poder cadastrar um novo perfil do gitHub', () => {
        cy.log('Cadastrando novo perfil do GitHub')


        cy.get('#name').type('Fernando Papito'); +
            cy.get('#username').type('qapapito');
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click();

        cy.get('#name').type('Fernando Papito');
        cy.get('#username').type('papitodev');
        cy.get('#profile').type('QA');
       
        cy.contains('button', 'Adicionar Perfil').click();  //cy.contains('button[type="submit"]')

        cy.contains('table tbody tr', 'papitodev')
            .should('be.visible')
            .as('trProfile') //dá um alias para a linha da tabela que contém o perfil do GitHub

        cy.get('@trProfile')    //usa o alias para verificar o conteúdo da linha da tabela  
            .contains('td', 'Fernando Papito')
            .should('be.visible');

        cy.get('@trProfile')
            .contains('td', 'QA') //verifica se a célula da tabela contém o texto "QA" e se está visível
            .should('be.visible');

    })

    it('Deve remover um perfil do gitHub', () => {
        cy.log('Removendo perfil do GitHub')


        const profile = {
            name: 'Fernando Papito',
            username: 'papito123',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name);
        cy.get('#username').type(profile.username);
        cy.get('#profile').type(profile.desc);

        cy.contains('button', 'Adicionar Perfil').click();

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile');

        cy.get('@trProfile').find('button[title="Remover perfil"]').click()

        cy.contains('table tbody', profile.username)
            .should('not.exist'); //verifica se a linha da tabela que contém o perfil do GitHub não existe mais, indicando que o perfil foi removido com sucesso

    })

    it('Deve vaidar o link do github', () => {
        cy.log();

        const profile = {
            name: 'Fernando Papito',
            username: 'papitodev',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name);
        cy.get('#username').type(profile.username);
        cy.get('#profile').type(profile.desc);

        cy.contains('button', 'Adicionar Perfil').click();

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile');

        cy.get('@trProfile').find('a')
            .should('have.attr', 'href', 'https://github.com/' + profile.username) //verifica se o link do perfil do GitHub tem o atributo href com a URL correta
            .and('have.attr', 'target', '_blank'); //verifica se o link do perfil do GitHub tem o atributo target com o valor "_blank", indicando que o link abrirá em uma nova aba


    })
})