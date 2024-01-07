/// <reference types="cypress" />

describe('Create new aricle', () => {
    beforeEach('login to the app', () => {
        cy.loginToApplication();
    });

    it('verify request and response for created article', () => {
        // Intercept the POST request for creating articles
        cy.intercept('POST', '**/articles', (req) => {
            req.body.article.body = 'I have written my description'
        }).as('postArticles')

        // Click on "New Article" button
        cy.contains('New Article').click();

        // Fill in the article form
        cy.get('form').then((article) => {
            cy.wrap(article).find('[formcontrolname="title"]').type('My first Article');
            cy.wrap(article).find('[formcontrolname="description"]').type('I am creating this for testing purpose');
            cy.wrap(article).find('[formcontrolname="body"]').type('Here I will write description later');
            cy.wrap(article).find('button').click();
        });

        // Wait for the POST request to complete and assert its details
        cy.wait('@postArticles').then((xhr) => {
            console.log(xhr);
            expect(xhr.response.statusCode).to.equal(201);
            expect(xhr.request.body.article.title).to.equal('My first Article');
            expect(xhr.request.body.article.body).to.equal('I have written my description');
        });

        // Deleting the Article" 
        cy.contains('Delete Article').click();
    });


    it('intercepting and modifying the request and response', () => {
        // Intercept the response and modified it
        cy.intercept('POST', '**/articles', (req) => {
            req.reply(res => {
                expect(res.body.article.body).to.equal('Here I will write description later')
                res.body.article.body = "I have written my description"
            })
        }).as('postArticles')

        // Click on "New Article" button
        cy.contains('New Article').click();

        // Fill in the article form
        cy.get('form').then((article) => {
            cy.wrap(article).find('[formcontrolname="title"]').type('My first Article');
            cy.wrap(article).find('[formcontrolname="description"]').type('I am creating this for testing purpose');
            cy.wrap(article).find('[formcontrolname="body"]').type('Here I will write description later');
            cy.wrap(article).find('button').click();
        });

        // Wait for the POST request to complete and assert its details
        cy.wait('@postArticles').then((xhr) => {
            console.log(xhr);
            expect(xhr.response.statusCode).to.equal(201);
            expect(xhr.request.body.article.title).to.equal('My first Article');
            expect(xhr.response.body.article.body).to.equal('I have written my description');
        });

        // Deleting the Article" 
        cy.contains('Delete Article').click();
    });
});
