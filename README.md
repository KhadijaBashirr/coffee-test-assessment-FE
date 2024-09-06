Coffee Test Assessment Frontend
===============================

[](https://github.com/KhadijaBashirr/coffee-test-assessment-FE#coffee-test-assessment-FE)

This project is a frontend application for a coffee ordering system, built with React and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Project Overview
----------------

[](https://github.com/KhadijaBashirr/coffee-test-assessment-FE#project-overview)

This application allows users to:

-   Browse a menu of coffee items
-   Add items to their order
-   View and modify their order
-   Enter customer information
-   Place an order
-   View order details including taxes and totals

Getting Started
---------------

[](https://github.com/KhadijaBashirr/coffee-test-assessment-FE#getting-started)

To get started with this project, follow these steps:

1.  Clone the repository:

    ```
    git clone https://github.com/KhadijaBashirr/coffee-test-assessment-FE.git

    ```

2.  Navigate to the project directory:

    ```
    cd coffee-test-assessment-FE

    ```

3.  Install dependencies:

    ```
    npm install

    ```

4.  Set up environment variables: Create a `.env` file in the root directory and add the following:

    ```
    REACT_APP_API_URL='http://localhost:3001'

    ```

    Adjust the URL if your backend API is hosted elsewhere.

5.  Start the development server:

    ```
    npm start

    ```

The application will open in your default browser at [http://localhost:3000](http://localhost:3000/).

Available Scripts
-----------------

[](https://github.com/KhadijaBashirr/coffee-test-assessment-FE#available-scripts)

In the project directory, you can run:

-   `npm start`: Runs the app in development mode
-   `npm test`: Launches the test runner in interactive watch mode
-   `npm run build`: Builds the app for production to the `build` folder
-   `npm run eject`: Ejects the app from Create React App configuration (one-way operation)

Project Structure
-----------------

[](https://github.com/KhadijaBashirr/coffee-test-assessment-FE#project-structure)

-   `src/components/`: Contains React components
-   `src/pages/`: Contains page-level components
-   `src/services/`: Contains API service functions
-   `src/utils/`: Contains utility functions and helpers

Technologies Used
-----------------

[](https://github.com/KhadijaBashirr/coffee-test-assessment-FE#technologies-used)

-   React
-   Material-UI
-   Axios for API calls

API Integration
---------------

[](https://github.com/KhadijaBashirr/coffee-test-assessment-FE#api-integration)

This frontend application integrates with a backend API for fetching menu items, submitting orders, and retrieving order details. Ensure that the backend server is running and the API endpoint is correctly configured in the `.env` file.
