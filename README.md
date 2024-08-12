# Transaction Management API

This project is an API developed with **Fastify** for managing personal financial transactions. The API allows users to create, list, and view transactions, as well as obtain a summary of the total account balance.

## Features

- **Transaction Creation:** The user can create new financial transactions, specifying the title, value and type (credit or debit).
- **Account Summary:** The user can obtain a summary of their account, which includes the total balance calculated from all transactions carried out.
- **Transaction List:** The user can view all transactions he has created, ensuring full control over his financial history.
- **Single Transaction View:** The user can view the details of a specific transaction, using the transaction ID to retrieve the information.

## Business Rules

- **Transaction Type:** The transaction can be of the credit type, which adds value to the total balance, or debit, which subtracts value.
- **User Identification:** It is possible to identify the user through a session cookie, which is used to link transactions to a specific user.
- **Authorization:** The user can only view transactions that he or she created, ensuring data privacy and security.

## Technologies and Tools Used

- **Fastify:** Used to create the API, taking advantage of its high performance and flexibility.
- **Vitest:** Testing tool used to ensure code quality through integration tests.
- **ESLint:** Used to standardize code and ensure good development practices.
- **Knex:** Used as a query builder for the database, facilitating interaction with SQLite.
- **Cookies:** Used to manage the user session and authenticate requests.
- **SQLite:** Database used to store transactions, ensuring a lightweight and efficient solution.

## Database Structure

The database used is **SQLite**, and Knex configuration is carried out through a configuration file where the client (SQLite), the database file path, and the migration directory are defined.

## Implemented Routes

- **GET /** - Returns all transactions from the authenticated user.
- **GET /:id** - Returns a specific transaction, identified by ID, as long as the user is authenticated.
- **GET /summary** - Returns the account summary of the authenticated user.
- **POST /** - Creates a new transaction, generating a session cookie if it does not already exist.
