# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Checkout keeps valid customer details after Postal Code validation error
- Location: tests\checkout.spec.ts:348:6

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-test="postalCode"]')
Expected: "test"
Received: ""
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('[data-test="postalCode"]')
    14 × locator resolved to <input value="" type="text" id="postal-code" autocorrect="off" name="postalCode" autocapitalize="none" data-test="postalCode" placeholder="Zip/Postal Code" class="input_error form_input"/>
       - unexpected value ""

```

```yaml
- textbox "Zip/Postal Code"
```

# Test source

```ts
  265 |     await expect(page).toHaveURL(/inventory.html/);
  266 | })
  267 | 
  268 | 
  269 | test('Checkout Overview shows payment and shipping information.', async ({ loginPage, inventoryPage,cartPage,checkout}) => {
  270 | 
  271 |     const firstproduct = 'Sauce Labs Backpack';
  272 | 
  273 | 
  274 |     await loginPage.Visit();
  275 | 
  276 |     await loginPage.login('standard_user', 'secret_sauce');
  277 | 
  278 |     await expect(inventoryPage.pagetitile).toBeVisible();
  279 | 
  280 |     await inventoryPage.addProductToCart(firstproduct);
  281 | 
  282 | 
  283 |     await inventoryPage.verifyProductWasAdded(firstproduct);
  284 |     await expect(inventoryPage.cartBadge).toHaveText('1');
  285 | 
  286 |     await inventoryPage.openCart();
  287 | 
  288 |     await cartPage.clickOnCheckOut();
  289 |     await checkout.checkoutCustomerDetailsFilling('test', 'test', '53306');
  290 |     await checkout.clickOncheckoutContinue()
  291 |     await checkout.checkoutSummary(firstproduct);
  292 |     await expect(checkout.paymentInfo).toBeVisible();
  293 | 
  294 | })
  295 | 
  296 | 
  297 | test('Checkout item total equals sum of selected product prices', async ({ loginPage, inventoryPage,cartPage,checkout }) => {
  298 | 
  299 |     const firstproduct = 'Sauce Labs Backpack';
  300 |     const secondProduct = 'Sauce Labs Bike Light';
  301 | 
  302 |     await loginPage.Visit();
  303 | 
  304 |     await loginPage.login('standard_user', 'secret_sauce');
  305 | 
  306 |     await expect(inventoryPage.pagetitile).toBeVisible();
  307 | 
  308 |     await inventoryPage.addProductToCart(firstproduct);
  309 | 
  310 |     await inventoryPage.addProductToCart(secondProduct);
  311 | 
  312 |     await inventoryPage.openCart();
  313 | 
  314 |     await expect(inventoryPage.cartBadge).toHaveText('2');
  315 | 
  316 |      await cartPage.clickOnCheckOut();
  317 | 
  318 |     await checkout.checkoutCustomerDetailsFilling('test', 'test', '53307');
  319 | 
  320 |     await checkout.clickOncheckoutContinue();
  321 |    
  322 | const priceTexts =
  323 |   await checkout.inventoryCheckoutProductPrice.allTextContents();
  324 | 
  325 | const numericPrices = priceTexts.map(price =>
  326 |   parseFloat(price.replace(/[^0-9.]/g, ''))
  327 | );
  328 | 
  329 | const calculatedTotal = numericPrices.reduce(
  330 |   (sum, price) => sum + price,
  331 |   0
  332 | );
  333 | 
  334 | console.log("calculatedTotal:",calculatedTotal)
  335 | 
  336 | const subtotalText = await checkout.subTotal.innerText();
  337 | 
  338 | const displayedItemTotal = parseFloat(
  339 |   subtotalText.replace(/[^0-9.]/g, '')
  340 | );
  341 | 
  342 | console.log("displayedItemTotal:",calculatedTotal)
  343 | expect(calculatedTotal).toBeCloseTo(displayedItemTotal, 2);
  344 | 
  345 | })
  346 | 
  347 | 
  348 | test.only('Checkout keeps valid customer details after Postal Code validation error', async ({ loginPage, inventoryPage,cartPage,checkout }) => {
  349 | 
  350 |     const firstproduct = 'Sauce Labs Backpack';
  351 |     const secondProduct = 'Sauce Labs Bike Light';
  352 |     await loginPage.Visit();
  353 |     await loginPage.login('standard_user', 'secret_sauce');
  354 |     await expect(inventoryPage.pagetitile).toBeVisible();
  355 |     await inventoryPage.addProductToCart(firstproduct);
  356 |     await inventoryPage.addProductToCart(secondProduct);
  357 |     await inventoryPage.verifyProductWasAdded(firstproduct);
  358 |     await inventoryPage.verifyProductWasAdded(secondProduct);
  359 |     await expect(inventoryPage.cartBadge).toHaveText('2');
  360 |     await inventoryPage.openCart();
  361 |     await cartPage.clickOnCheckOut();
  362 |     await checkout.checkoutCustomerDetailsFilling('test', 'test', '');
  363 |     await expect(checkout.firstName).toHaveValue('test');
  364 |     await expect(checkout.lastName).toHaveValue('test');
> 365 |     await expect(checkout.postalCode).toHaveValue('test');
      |                                       ^ Error: expect(locator).toHaveValue(expected) failed
  366 |     await checkout.clickOncheckoutContinue();
  367 |     await expect(checkout.errorMsg).toContainText('Error: Postal Code is required');
  368 | 
  369 | });
```