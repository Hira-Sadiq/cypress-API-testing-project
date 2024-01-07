/// <reference types="cypress" />

describe('Tags on HomePage', () => {

    beforeEach('login to the app', () => {
        cy.intercept({method: 'Get', path: 'tags'}, { fixture: 'tags.json' }).as('getTags');
        cy.loginToApplication();
        cy.wait('@getTags'); // Wait for the mock to complete before moving on
    });

    it('should display mocked popular tags', () => {
        cy.get('.tag-list').as('tagList');

        // Read tags from the fixture file
        cy.fixture('tags.json').then((tagsFixture) => {
            const popularTags = tagsFixture.tags;

            // Check if all popular tags are displayed
            cy.get('@tagList').find('.tag-pill').each(($tag, index) => {
                cy.wrap($tag).should('contain.text', popularTags[index]);
            });

            // Check the count of tags
            cy.get('@tagList').find('.tag-pill').should('have.length', popularTags.length);
        });
    });
});
