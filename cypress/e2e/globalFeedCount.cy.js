/// <reference types="cypress" />

describe('Articles on Global feed page', function () {
    beforeEach('login to the app', () => {
        cy.loginToApplication();
    });

    it('should mock the articles response', function () {
        // Load fixture data
        cy.fixture('articles.json').as('articlesFixture');

        // Intercept the API request for fetching articles with fixture
        cy.intercept('GET', 'https://api.realworld.io/api/articles*', { fixture: 'articles.json' }).as('getArticles');

        // Wait for the articles to be loaded
        cy.wait(['@getArticles']).then(() => {
            // Check if articles are displayed on the page
            cy.get('.col-md-9 .article-preview').should('have.length.greaterThan', 0);

            cy.get('.col-md-9').find('.pull-xs-right').then(heartButtons => {
                // Check the favorites count for the first article
                expect(heartButtons[0]).to.contain(String(this.articlesFixture.articles[0].favoritesCount));

                // Check the favorites count for the second article
                expect(heartButtons[1]).to.contain(String(this.articlesFixture.articles[1].favoritesCount));
            });
        });
    });

    it('should increase the favorite count of articles upon click', function () {
        // Intercept the API request for fetching articles list
        cy.intercept('GET', 'https://api.realworld.io/api/articles?*').as('getArticles');

        // Wait for the articles to be loaded
        cy.wait('@getArticles').then((xhr) => {
            // Get the initial favorite count of the first article
            const initialCount = xhr.response.body.articles[0].favoritesCount;

            // Define the selector for the favorite count 
            const favoriteCountSelector = '.col-md-9 .article-preview .pull-xs-right';

            // Click on the favorite count of the first article and verify the increase
            cy.get(favoriteCountSelector).first().then((favoriteCount) => {
                cy.wrap(favoriteCount).click();
                cy.wrap(favoriteCount).should('contain', initialCount + 1);
                cy.wrap(favoriteCount).click();
            });
        });
    });
});
