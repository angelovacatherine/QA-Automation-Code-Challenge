const { test, expect } = require('./fixtures/userFixture');
const { Locators } = require('./pages/Locators');
const { LoginPage } = require('./pages/LoginPage');
const { generateRandomText, generateRandomNumberString } = require('./utils/dataGenerator');

// test.use({ role: 'admin' });

let locators;
let loginPage;

test.beforeEach(async ({ page, user }) => {
  locators = new Locators(page);
  loginPage = new LoginPage(page, locators);
  
  // Now you just pass user.email / user.password without importing USERS
  await loginPage.login(user.email, user.password);

  // Validate that the main page loaded successfully with a 200 OK status before proceeding
  const response = await page.request.get(page.url());
  expect(response.status()).toBe(200);
});

async function AddShippingDetails(randomName) {
  const randomPhone = generateRandomNumberString(10);
  await locators.phoneInput.fill(randomPhone);
  await locators.streetInput.fill(`123 ${randomName} St`);
  await locators.cityInput.fill(`${randomName} City`);
  await locators.countryDropdown.selectOption('United States of America');
}

test('Ecommerce Happy Flow', async ({ page }) => {
  // Purchase item and verify order submission
  await locators.addToCartBtn.first().click();
  await locators.proceedToCheckoutBtn.click();
  await AddShippingDetails(generateRandomText());
  await locators.submitOrderBtn.click();
  await expect(locators.congratsText).toBeVisible();
  await locators.logoutBtn.click();
  await expect(locators.emailInput).toBeVisible();
});

test('Should show error popup when adding same item twice', async ({ page }) => {
  // Add the same item twice to the cart
  await locators.addToCartBtn.first().click();
  await locators.addToCartBtn.first().click();

  // Listen for the native popup/alert before clicking again
  page.once('dialog', dialog => {
    expect(dialog.message()).toBe(MESSAGES.duplicatedItemInCart);
    dialog.dismiss();
  });
});

test('Purchase 2 items and verify price', async ({ page }) => {
  // Creating an array to store item details and calculate expected total price
  const items = [];
  let cartTotalPrice = 0;
  
  for (let i = 0; i < 2; i++) {
    const itemLocator = locators.shopItem.nth(i);
    const title = await itemLocator.locator(locators.shopItemTitle).innerText();
    const priceText = await itemLocator.locator(locators.shopItemPrice).innerText();
    
    // Parse the price (remove $ and convert to float)
    const price = parseFloat(priceText.replace('$', ''));
    items.push({ title, price });
    cartTotalPrice += price;

    // Add the item to the cart
    await itemLocator.locator(locators.shopItemBtn).click();
  }

  // Check 2 specific items are in the cart using the grabbed names
  await expect(locators.cartItemTitle.nth(0)).toHaveText(items[0].title);
  await expect(locators.cartItemTitle.nth(1)).toHaveText(items[1].title);

  // Confirm the total price is correct dynamically
  const formattedTotal = `$${cartTotalPrice.toFixed(2)}`;
  await expect(locators.cartTotalPrice).toHaveText(formattedTotal);

  // Proceed to checkout and buy items
  await locators.proceedToCheckoutBtn.click();
  await AddShippingDetails(generateRandomText());
  await locators.submitOrderBtn.click();
  
  // Confirm the success message contains '2'
  await expect(locators.successMessage).toContainText(formattedTotal);
  await expect(locators.successMessage).toContainText('2');
});

test('Add and remove item from cart, ensure cart is empty', async ({ page }) => {
  await locators.addToCartBtn.first().click();
  await expect(locators.cartItemTitle).toHaveCount(1);
  await locators.removeItemBtn.first().click();
  await expect(locators.cartItemTitle).toHaveCount(0);
});
