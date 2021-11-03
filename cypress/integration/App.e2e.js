describe('App E2E', () => {
    it('should have a form', function () {
        cy.visit('/');

        cy.get('#root > div > div > div.InputWrap > input').should('have.value','');
        cy.get('#root > div > div > div.InputWrap > button').should('have.text', 'Добавить');
    });

    it('should add a task', function () {
        cy.get('#root > div > div > div.InputWrap > input').type('Learn React').should('have.value', 'Learn React');
        cy.contains('Добавить').click();

        cy.get('#root > div > div > div.Todos > div:nth-child(1) > div.Todo > div:nth-child(1) > div').should('have.text', 'Learn React')
        cy.get('#root > div > div > div.InputWrap > input').should('have.value','');

    });

    it('should add other task and execute it', function () {
        cy.get('#root > div > div > div.InputWrap > input').type('Learn JavaScript').should('have.value', 'Learn JavaScript');
        cy.contains('Добавить').click();

        cy.get('#root > div > div > div.Todos > div:nth-child(1) > div.Todo > div:nth-child(1) > div').should('have.text', 'Learn JavaScript')
        cy.get('#root > div > div > div.InputWrap > input').should('have.value','');
        cy.get('#root > div > div > div.Todos > div:nth-child(1) > div.Todo > div.Btn > input[type=checkbox]').click();
        cy.get('#root > div > div > div.Todos > div:nth-child(1) > div.Todo > div:nth-child(1) > div').should('have.class', 'CrossText')

    });

    it('delete the last completed task', function () {

        cy.get('#root > div > div > div.Todos > div:nth-child(1) > div.Todo > div.Btn > button').click();
        cy.get('#root > div > div > div.Todos > div:nth-child(1)').should('have.text', 'Learn JavaScript').should('not.exist');

    });
});