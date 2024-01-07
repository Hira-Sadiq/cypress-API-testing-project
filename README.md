Conduit API Testing with Cypress
This project uses Cypress for API testing of the Conduit application, covering various scenarios related to articles, tags, and interactions with the 'Conduit' app API.

Table of Contents

1. Project Overview
2. Installation
3. Running the Application
4. Writing and Running Tests
5. Test Scenarios
6. Additional Notes
7. Contributing

Project Overview
The project focuses on API testing of the 'Conduit' application. Cypress is used to create tests for key functionalities, including creating and deleting articles, intercepting and modifying requests and responses, handling tags, and more.

Installation

1. Clone the Repository: Create a project folder and clone the repository. git clone <repository_url>
2. cd <project_folder>
3. Initialize Project: Open the project folder in Visual Studio Code and run: npm init   Ensure that the package.json file is created.
4. Install Cypress: Run the following command to install Cypress: npm install cypress --save-dev --force   Verify that all Cypress folders are downloaded and installed.

Running the Application
To run the 'Conduit' app, execute the following commands
npm install --force
npm start

Writing and Running Tests

Open Test Runner
Run the following command to open the Cypress Test Runner:
npx cypress open

Running Tests from CLI
To run all scripts from the command line, use the following command in the terminal:
npx cypress run

Test Scenarios

1. Spec: Article Creation
   In this spec, the test creates an article by intercepting the POST request for article creation. It modifies the request and response, validating details such as title and body. Finally, it deletes the created article.

2. Spec: Article Deletion
   In this spec, the test deletes an article by sending a DELETE request to the 'https://api.realworld.io/api/articles/{articleSlug}' endpoint. The article slug, obtained during article creation, is used for specifying the article to be deleted. The request includes the user's authorization token in the header for authentication.

3. Spec: Global Feed Count
   This spec, after logging in, consists of two tests. The first test mocks the articles' response by intercepting the API request, loading fixture data, and validating the display of articles along with their respective favorite counts. The second test intercepts the API request for fetching articles, clicks on the favorite count of the first article, and verifies the subsequent increase in the favorite count upon the click.

4. Spec: Home Page Tags
   This Cypress test logs in, mocks the API response for popular tags on the homepage, and verifies the display of the mocked tags in the 'Conduit' app. It ensures an accurate representation of popular tags.

Additional Notes

- Ensure the 'Conduit' app is configured and running before executing tests.
- Use npm start to run the application and npx cypress open to open the Cypress Test Runner.

Contributing
Feel free to contribute to this project by forking the repository and creating pull requests. Follow the Contribution Guidelines for more details.
