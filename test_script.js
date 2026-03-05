const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://qa-practice.netlify.app/auth_ecommerce');
  await page.fill('#email', 'admin@admin.com');
  await page.fill('#password', 'admin123');
  await page.click('#submitLoginBtn');
  await page.waitForTimeout(2000);
  const items = await page.$$eval('.shop-item, .card, .product, button', els => els.map(e => e.outerHTML).filter(h => h.toLowerCase().includes('cart')));
  console.log('Cart buttons elements:', items);
  const logout = await page.$$eval('*', els => els.map(e => e.outerHTML).filter(h => h.toLowerCase().includes('logout')));
  console.log('Logout elements:', logout.slice(0, 3));
  
  // also let's output all buttons
  const btns = await page.$$eval('button, a', els => els.map(e => e.innerText));
  console.log('All buttons/links:', btns);
  
  await browser.close();
})();
