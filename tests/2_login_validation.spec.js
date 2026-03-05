const { test, expect } = require('@playwright/test');
const { Locators } = require('./pages/Locators');
const { USERS } = require('./data/users');
const { MESSAGES } = require('./data/messages');
const { generateRandomText, generateRandomNumberString } = require('./utils/dataGenerator');

let locators;

test.beforeEach(async ({ page }) => {
  locators = new Locators(page);
  await page.goto('https://qa-practice.netlify.app/auth_ecommerce');
});

test.describe('Login Validation', () => {

  test('Should show error on empty credentials submission', async ({ page }) => {
    // Click submit without entering anything
    await locators.submitLoginBtn.click();
    
    // Verify error message
    await expect(locators.errorMessage).toBeVisible();
    await expect(locators.errorMessage).toHaveText(MESSAGES.loginError);
  });

  test('Should show error on wrong password', async ({ page }) => {
    // Enter valid email but invalid password (random text)
    await locators.emailInput.fill(USERS.admin.email);
    await locators.passwordInput.fill(generateRandomText(10));
    await locators.submitLoginBtn.click();
    
    // Verify error message
    await expect(locators.errorMessage).toBeVisible();
    await expect(locators.errorMessage).toHaveText(MESSAGES.loginError);
  });

  test('Should show error on wrong email', async ({ page }) => {
    // Enter invalid email (random text) but valid password
    
    await locators.emailInput.fill(`${generateRandomText(8)}@wrong.com`);
    await locators.passwordInput.fill(USERS.admin.password);
    await locators.submitLoginBtn.click();
    
    // Verify error message
    await expect(locators.errorMessage).toBeVisible();
    await expect(locators.errorMessage).toHaveText(MESSAGES.loginError);
  });

});
