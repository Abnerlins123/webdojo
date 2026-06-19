# 🏗 Arquitetura da Automação

O projeto segue uma arquitetura organizada em camadas para facilitar manutenção, reutilização de código e escalabilidade dos testes automatizados.

```mermaid
flowchart TD

    A[Aplicação Webdojo<br/>localhost:3000]

    B[Testes E2E<br/>cypress/e2e]

    C[Actions<br/>cypress/support/actions]

    D[Commands<br/>cypress/support/commands.js]

    E[Fixtures<br/>cypress/fixtures]

    F[Cypress Runner]

    G[Relatórios e Evidências]

    F --> B
    B --> C
    C --> D
    B --> E

    B --> A

    F --> G
```

## Fluxo de Execução

1. A aplicação Webdojo é iniciada através do comando:

```bash
npm run dev
```

2. O Cypress é executado através dos scripts definidos no projeto.

3. Os testes localizados em:

```text
cypress/e2e
```

executam os cenários automatizados.

4. Os cenários utilizam:

* Fixtures para massa de dados
* Actions para centralização de regras de negócio
* Commands para comandos customizados

5. Durante a execução, o Cypress interage com a aplicação Webdojo e valida os comportamentos esperados.

---

## Arquitetura Física do Repositório

```mermaid
flowchart LR

    ROOT[Repositório]

    ROOT --> API[api]
    ROOT --> WEB[web]

    WEB --> CYPRESS[cypress]

    CYPRESS --> E2E[e2e]
    CYPRESS --> FIXTURES[fixtures]
    CYPRESS --> SUPPORT[support]

    SUPPORT --> ACTIONS[actions]
    SUPPORT --> COMMANDS[commands.js]
    SUPPORT --> E2EJS[e2e.js]

    WEB --> CONFIG[cypress.config.js]
    WEB --> DIST[dist]
```

---

## Padrão Arquitetural Utilizado

O projeto utiliza uma abordagem inspirada no padrão:

### Action Layer Pattern

```text
Teste
 ↓
Action
 ↓
Command
 ↓
Elemento da Interface
```

### Benefícios

* Menor duplicação de código
* Facilidade de manutenção
* Melhor legibilidade dos testes
* Reutilização de ações comuns
* Escalabilidade para novos cenários

---

## Exemplo de Fluxo de Login

```mermaid
sequenceDiagram

    participant Teste
    participant Action
    participant Command
    participant Webdojo

    Teste->>Action: realizarLogin()
    Action->>Command: preencherUsuario()
    Action->>Command: preencherSenha()
    Action->>Command: clicarEntrar()

    Command->>Webdojo: Executa ações na interface

    Webdojo-->>Teste: Login realizado com sucesso
```
