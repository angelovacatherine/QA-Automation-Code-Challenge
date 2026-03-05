class Locators {
  constructor(page) {
    this.page = page;
    
    // Login / Logout
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitLoginBtn = page.locator('#submitLoginBtn');
    this.logoutBtn = page.locator('#logout');
    
    // Shipping Details
    this.phoneInput = page.locator('#phone');
    this.streetInput = page.getByPlaceholder('5876 Little Streets');
    this.cityInput = page.getByPlaceholder('London');
    this.countryDropdown = page.locator('#countries_dropdown_menu');
    
    // Buttons & Assertions
    this.addToCartBtn = page.getByRole('button', { name: 'ADD TO CART' });
    this.proceedToCheckoutBtn = page.getByRole('button', { name: 'PROCEED TO CHECKOUT' });
    this.submitOrderBtn = page.locator('#submitOrderBtn');
    this.successMessage = page.locator('#message').first();
    this.errorMessage = page.locator('.alert-danger');
    this.congratsText = page.getByText('Congrats! Your order of');
    this.removeItemBtn = page.getByRole('button', { name: 'REMOVE' });

    
    // Cart & Items
    this.shopItem = page.locator('.shop-item');
    this.shopItemTitle = '.shop-item-title';
    this.shopItemPrice = '.shop-item-price';
    this.shopItemBtn = '.shop-item-button';
    
    this.cartItemTitle = page.locator('.cart-item-title');
    this.cartTotalPrice = page.locator('.cart-total-price');

    // File Upload
    this.fileInput = page.locator('#file_upload');
    this.fileSubmitBtn = page.getByRole('button', { name: 'Submit' });
    this.fileUploadResponse = page.locator('#file_upload_response');
  }
}

module.exports = { Locators };
