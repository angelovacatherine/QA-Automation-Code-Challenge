# Playwright Test Automation Suite

This project contains End-to-End (E2E) automated tests to verify standard application functionalities such as E-commerce checkout, login validation, and file uploading. 

The framework is structured using the **Page Object Model (POM)** design pattern combined with custom data fixtures to ensure tests are maintainable and scalable.

## Framework and Prerequisites

* **Testing Framework**: [Playwright](https://playwright.dev/) (`@playwright/test`)
* **Prerequisites**: 
  * [Node.js](https://nodejs.org/) (Version 16 or higher is recommended)
  * `npm` (comes standard with Node.js)

## Setup & Installation

1. **Navigate to the test automation directory**:
   ```bash
   cd QA-Automation-Code-Challenge
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright Browsers**:
   ```bash
   # This will download the required browser binaries for Playwright 
   npx playwright install 
   # Or just chromium if you only want to run on Chrome
   npx playwright install chromium
   ```

## Project Structure
  
* `tests/` - The core test suite.
  * `pages/` - Stores POM classes like `Locators.js` and `LoginPage.js`.
  * `data/` - Test data models (`users.js`, `messages.js`) and files for testing interactions (e.g., upload assets).
  * `utils/` - Isolated helper functions (e.g., `dataGenerator.js` for generating random input).
  * `fixtures/` - Custom extensions acting as Playwright fixtures (like tracking the current user role).

## How to Run Tests Locally

**Run the entire suite in headless mode (default)**:
```bash
npx playwright test
```

**Run tests in headed mode (so you can see the browser actions visibly)**:
```bash
npx playwright test --headed
```

**Run a specific test file explicitly**:
```bash
npx playwright test tests/1_auth_ecommerce_flow.spec.js
```

**View Test Results & Errors (HTML Report)**:
Once the tests finish running, you can launch a local web server to read the detailed report:
```bash
npx playwright show-report
```

## Notes for Windows Users

If you are running these tests on a Windows environment, the setup is largely the same, but here are some specific pointers:

* Make sure to run your commands using **Command Prompt**, **PowerShell**, or **Git Bash**.
* All of the `npm` and `npx` commands above are fully cross-platform and work exactly the same way in Windows.
* **Execution Policies (PowerShell Only)**: Sometimes Windows restricts running scripts in PowerShell for security reasons. If you face an error stating that scripts cannot be executed, you may need to open PowerShell as Admin and run:
  ```powershell
  Set-ExecutionPolicy Unrestricted -Scope CurrentUser
  ```
* When using paths to run specific test files (e.g., `npx playwright test tests/1_auth_ecommerce_flow.spec.js`), you can comfortably use forward slashes `/`—Playwright automatically understands and resolves them on Windows!