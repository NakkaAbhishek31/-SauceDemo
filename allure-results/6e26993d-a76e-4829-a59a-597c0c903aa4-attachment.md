# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> TC_CHECKOUT_014 - Product price should remain consistent across Products, Cart, and Checkout Overview @positive @price @regression
- Location: tests\e2e.spec.ts:9:6

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.innerText: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).locator('.inventory_item_price')

```

# Test source

```ts
  1  | import { LoginPage } from "../Src/Pages/LoginPages";
  2  | import  e2e  from "../test-data/e2e.data.json";
  3  | import {
  4  |     test,
  5  |     expect,
  6  | } from './fixtures.ts'
  7  | 
  8  | 
  9  | test.only("TC_CHECKOUT_014 - Product price should remain consistent across Products, Cart, and Checkout Overview @positive @price @regression", async ({
  10 |   page,
  11 |   inventoryPage,
  12 |   cartPage,
  13 |   checkout,
  14 | }) => {
  15 |   const data = e2e.TC_CHECKOUT_014;
  16 | 
  17 |   // Capture the price on the Products page.
  18 |   const inventoryPrice = (
> 19 |     await inventoryPage.productPrice(data.product).innerText()
     |                                                    ^ Error: locator.innerText: Test timeout of 30000ms exceeded.
  20 |   ).trim();
  21 | 
  22 |   await inventoryPage.addProductToCart(data.product);
  23 | 
  24 |   await inventoryPage.verifyProductWasAdded(data.product);
  25 | 
  26 |   await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);
  27 | 
  28 |   // Verify the price on the Cart page.
  29 |   await inventoryPage.openCart();
  30 | 
  31 |   await expect(cartPage.cartItemPrice(data.product)).toHaveText(inventoryPrice);
  32 | 
  33 |   // Continue to Checkout Overview.
  34 |   await cartPage.clickOnCheckOut();
  35 | 
  36 |   await checkout.checkoutCustomerDetailsFilling(
  37 |     data.firstName,
  38 |     data.lastName,
  39 |     data.postalCode,
  40 |   );
  41 | 
  42 |   await checkout.clickOncheckoutContinue();
  43 | 
  44 |   // Verify the price on Checkout Overview.
  45 |   await expect(checkout.checkoutItemPrice(data.product)).toHaveText(
  46 |     inventoryPrice,
  47 |   );
  48 | 
  49 |   // Complete the order.
  50 |   await checkout.clickoncheckoutfinish();
  51 | 
  52 |   await expect(checkout.orderCompltedMsg).toContainText(data.successMessage);
  53 | 
  54 |   await expect(inventoryPage.cartBadge).toBeHidden();
  55 | 
  56 |   await checkout.ReturnToHome();
  57 | 
  58 |   await expect(page).toHaveURL(new RegExp(data.inventoryUrl));
  59 | 
  60 |   await expect(inventoryPage.pagetitile).toBeVisible();
  61 | });
  62 | 
```