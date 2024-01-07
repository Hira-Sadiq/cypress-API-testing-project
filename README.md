# Conduit API Testing with Cypress

This project utilizes Cypress for comprehensive API testing of the Conduit application, covering various scenarios related to articles, tags, and interactions with the 'Conduit' app API.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Writing and Running Tests](#writing-and-running-tests)
5. [Test Scenarios](#test-scenarios)
6. [Additional Notes](#additional-notes)
7. [Contributing](#contributing)

## Project Overview

The project is dedicated to API testing of the 'Conduit' application. Cypress is employed to create tests for key functionalities, including the creation and deletion of articles, interception and modification of requests and responses, handling tags, and more.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```

2. **Initialize Project:**
   Open the project folder in Visual Studio Code and run:
   ```bash
   npm init
   ```

   Ensure that the `package.json` file is created.

3. **Install Cypress:**
   Run the following command to install Cypress:
   ```bash
   npm install cypress --save-dev --force
   ```

   Verify that all Cypress folders are downloaded and installed.

## Running the Application

To run the 'Conduit' app, execute the following commands:
```bash
npm install --force
npm start
```

## Writing and Running Tests

**Open Test Runner:**
```bash
npx cypress open
```

**Running Tests from CLI:**
```bash
npx cypress run
```

## Test Scenarios

1. **Spec: Article Creation**
   - Creates an article by intercepting the POST request for article creation.
   - Modifies the request and response, validating details such as title and body.
   - Deletes the created article.

2. **Spec: Article Deletion**
   - Deletes an article by sending a DELETE request to the 'https://api.realworld.io/api/articles/{articleSlug}' endpoint.
   - Uses the article slug obtained during article creation for specifying the article to be deleted.
   - Includes the user's authorization token in the header for authentication.

3. **Spec: Global Feed Count**
   - After logging in, consists of two tests.
   - First test mocks the articles' response, validating the display of articles along with their respective favorite counts.
   - Second test intercepts the API request for fetching articles, clicks on the favorite count of the first article, and verifies the subsequent increase in the favorite count upon the click.

4. **Spec: Home Page Tags**
   - Logs in, mocks the API response for popular tags on the homepage.
   - Verifies the display of the mocked tags in the 'Conduit' app, ensuring an accurate representation of popular tags.

## Additional Notes

- Ensure the 'Conduit' app is configured and running before executing tests.
- Use `npm start` to run the application and `npx cypress open` to open the Cypress Test Runner.

## Contributing

Feel free to contribute to this project by forking the repository and creating pull requests. Follow the [Contribution Guidelines](link-to-guidelines) for more details.
