describe('Validações de Alertas em JavaScript', () => {

    beforeEach(() => {
        cy.login(); 
        cy.goTo('Alertas JS', 'JavaScript Alerts');
    });

    it('validar a mensagem de alerta simples', () => {
        cy.on('window:alert', (msg) => {
            expect(msg).to.eq('Olá QA, eu sou um Alert Box!');
        });

        cy.contains('button', 'Mostrar Alert').click();
    });

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.eq('Aperte um botão!');
            return true; // Simula o clique no botão "OK" 
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.eq('Você clicou em Ok!');
        });

        cy.contains('button', 'Mostrar Confirm').click();
    });

    it('Deve confirmar um diálogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.eq('Aperte um botão!');
            return false; // Simula o clique no botão "Cancel"
        });

        cy.on('window:alert', (msg) => {
            expect(msg).to.eq('Você cancelou!');
        });

        cy.contains('button', 'Mostrar Confirm').click();
    });

    it('Deve interagir com um prompt, INSERIR um texto e validar uma mensagem', () => {
        // 1. Configura o Prompt para digitar "Fernando" automaticamente
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Fernando');
        });

        // 2. Escuta o alerta de sucesso que aparece DEPOIS que o prompt é preenchido
        cy.on('window:alert', (msg) => {
            expect(msg).to.eq('Olá Fernando! Boas-vindas ao WebDojo!');
        });
 
        // 3. Clica no botão para disparar a ação (Adicionado)
        cy.contains('button', 'Mostrar Prompt').click();
    });

}); 