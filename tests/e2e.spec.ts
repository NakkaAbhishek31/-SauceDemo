import {
  test,
  expect,
} from './fixtures';

import e2e from '../test-data/e2e.data.json';

test.describe('SauceDemo E2E Tests', () => {
  test.beforeEach(
    async ({
      loginPage,
      inventoryPage,
    }) => {
      await loginPage.Visit();

      await loginPage.login(
        e2e.login.username,
        e2e.login.password
      );

      await expect(
        inventoryPage.pagetitile
      ).toBeVisible();
    }
  );

test("TC_CHECKOUT_014 - Product price should remain consistent across Products, Cart, and Checkout Overview @positive @price @regression", async ({
  page,
  inventoryPage,
  cartPage,
  checkout,
}) => {
  const data = e2e.TC_CHECKOUT_014;

  // Capture the price on the Products page.
  const inventoryPrice = (
    await inventoryPage.productPrice(data.product).innerText()
  ).trim();

  await inventoryPage.addProductToCart(data.product);

  await inventoryPage.verifyProductWasAdded(data.product);

  await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);

  // Verify the price on the Cart page.
  await inventoryPage.openCart();

  await expect(cartPage.cartItemPrice(data.product)).toHaveText(inventoryPrice);

  // Continue to Checkout Overview.
  await cartPage.clickOnCheckOut();

  await checkout.checkoutCustomerDetailsFilling(
    data.firstName,
    data.lastName,
    data.postalCode,
  );

  await checkout.clickOncheckoutContinue();

  // Verify the price on Checkout Overview.
  await expect(checkout.checkoutItemPrice(data.product)).toHaveText(
    inventoryPrice,
  );

  // Complete the order.
  await checkout.clickoncheckoutfinish();

  await expect(checkout.orderCompltedMsg).toContainText(data.successMessage);

  await expect(inventoryPage.cartBadge).toBeHidden();

  await checkout.ReturnToHome();

  await expect(page).toHaveURL(new RegExp(data.inventoryUrl));

  await expect(inventoryPage.pagetitile).toBeVisible();
});});


