class LoginPage {
  constructor(page, locators) {
    this.page = page;
    this.locators = locators;
  }

  async login(email, password, url = 'https://qa-practice.netlify.app/auth_ecommerce') {
    await this.page.goto(url);
    await this.locators.emailInput.fill(email);
    await this.locators.passwordInput.fill(password);
    await this.locators.submitLoginBtn.click();
    
    // Wait for the specific element (Log Out button) to be visible -> to ensure the page has loaded and the user is logged in
    await this.locators.logoutBtn.waitFor();
  }
}

module.exports = { LoginPage };
