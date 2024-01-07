/// <reference types="cypress" />

describe('Articles on Global feed page', function () {

    let createdArticleUrl;

    beforeEach('login to the app', () => {
        cy.loginToApplication();
    });

    it('delete a new article in global feed', () => {
        // Step 1: Create a new article
        const bodyRequest = {
            article: {
                title: "API test with Cypress",
                description: "Creating article for testing",
                body: "API testing is cool and easy",
                tagList: []
            }
        };

        // Using the token obtained during login to create the article
        cy.get('@token').then((userToken) => {

            cy.request({
                url: 'https://api.realworld.io/api/articles/',
                method: 'POST',
                headers: { 'Authorization': 'Token ' + userToken },
                body: bodyRequest
            }).then(response => {
                // Assert that the article is created successfully
                expect(response.status).to.equal(201);

                // Store the URL of the created article for deletion
                createdArticleUrl = response.body.article.slug;
            });
        });

        // Step 2: Delete the created article
        cy.get('@token').then((userToken) => {
            cy.request({
                url: `https://api.realworld.io/api/articles/${createdArticleUrl}`,
                method: 'DELETE',
                headers: { 'Authorization': 'Token ' + userToken }
            });

            // Step 3: Validate that the article has been deleted by checking the article list
            cy.request({
                url: 'https://api.realworld.io/api/articles?limit=*',
                method: 'GET',
                headers: { 'Authorization': 'Token ' + userToken }
            }).its('body').then(response => {
                const articlesTitles = response.articles.title;

                // Assert that the deleted article's title is not in the updated list
                expect(articlesTitles).not.to.equal('API test with Cypress');
            });
        });
    });
});
