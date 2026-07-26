# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.spec.ts >> Checkout Overview displays every selected product and correct subtotal
- Location: tests\checkout.spec.ts:373:6

# Error details

```
Error: locator.innerText: Target page, context or browser has been closed
Call log:
  - waiting for locator('[data-test="subtotal-label"]')

```

# Test source

```ts
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
  348 | test('Checkout keeps valid customer details after Postal Code validation error', async ({ loginPage, inventoryPage,cartPage,checkout }) => {
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
  365 |     await expect(checkout.postalCode).toHaveValue('');
  366 |     await checkout.clickOncheckoutContinue();
  367 |     await expect(checkout.errorMsg).toContainText('Error: Postal Code is required');
  368 | 
  369 | });
  370 | 
  371 | 
  372 | 
  373 | test.only('Checkout Overview displays every selected product and correct subtotal',
  374 |   async ({ page, loginPage, inventoryPage ,cartPage,checkout}) => {
  375 |     await loginPage.Visit();
  376 |     await loginPage.login('standard_user', 'secret_sauce');
  377 |     await expect(inventoryPage.pagetitile).toBeVisible();
  378 |     const productNames = await inventoryPage.productNames.allTextContents();
  379 |     for(const productName of productNames )
  380 |     {
  381 |        await inventoryPage.addProductToCart(productName);
  382 |       
  383 |     }
  384 | 
  385 |     await inventoryPage.openCart();
  386 |         for(const productName of productNames )
  387 |     {
  388 |        await expect(cartPage.cartItem(productName)).toBeVisible();
  389 |       
  390 |     }
  391 | 
  392 |      await cartPage.clickOnCheckOut();
  393 |     await checkout.checkoutCustomerDetailsFilling('test', 'test', '53307');
  394 |     const chyeckoutInventoryProductNames = await checkout.checkoutInventoryItemName.allTextContents();
  395 | 
  396 |     const priceTexts =
  397 |   await checkout.inventoryCheckoutProductPrice.allTextContents();
  398 | 
  399 | const numericPrices = priceTexts.map(price =>
  400 |   parseFloat(price.replace(/[^0-9.]/g, ''))
  401 | );
  402 | 
  403 | const calculatedTotal = numericPrices.reduce(
  404 |   (sum, price) => sum + price,
  405 |   0
  406 | );
  407 | 
  408 | 
> 409 | const subtotalText = await checkout.subTotal.innerText();
      |                                              ^ Error: locator.innerText: Target page, context or browser has been closed
  410 | 
  411 | const displayedItemTotal = parseFloat(
  412 |   subtotalText.replace(/[^0-9.]/g, '')
  413 | );
  414 | 
  415 | expect(calculatedTotal).toBeCloseTo(displayedItemTotal, 2);
  416 | 
  417 | 
  418 |   });
```