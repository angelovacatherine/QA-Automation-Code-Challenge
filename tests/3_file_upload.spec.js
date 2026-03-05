const { test, expect } = require('@playwright/test');
const path = require('path');
const { Locators } = require('./pages/Locators');
const { MESSAGES } = require('./data/messages');
const fileName = 'empty_image.png';

let locators;

test.beforeEach(async ({ page }) => {
  locators = new Locators(page);
  
  // Go directly to the file upload URL since it doesn't require credentials
  await page.goto('https://qa-practice.netlify.app/file-upload');
});

test('Should successfully navigate to file upload page', async ({ page }) => {
  // Add a simple assertion for the new page
  await expect(page).toHaveURL('https://qa-practice.netlify.app/file-upload');
  const response = await page.request.get(page.url());
  expect(response.status()).toBe(200);
});

test('Should successfully upload a file', async ({ page }) => {
  // Path to the generated file
  const filePath = path.join(__dirname, 'data', 'files', fileName);
  
  // Upload the file
  await locators.fileInput.setInputFiles(filePath);
  
  // Submit the form
  await locators.fileSubmitBtn.click();

  // Validate the upload was successful
  await expect(locators.fileUploadResponse).toHaveText(MESSAGES.uploadSuccess(fileName));
});
