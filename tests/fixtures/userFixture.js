const base = require('@playwright/test');
const { USERS } = require('../data/users');

// We extend the base test to support a custom `role` and `user` object
const test = base.test.extend({
  // Define an option we can set in `test.use()` or `playwright.config.js`
  role: ['admin', { option: true }], // 'admin' is the default role

  // The `user` fixture automatically fetches the correct user from data based on the `role` option
  user: async ({ role }, use) => {
    const activeUser = USERS[role] || USERS.admin; 
    await use(activeUser);
  }
});

module.exports = { test, expect: base.expect };
