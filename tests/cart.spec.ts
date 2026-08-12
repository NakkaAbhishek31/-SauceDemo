import { test, expect } from "./fixtures";

import cartData from "../test-data/cart.data.json";

test("TC_CART_001 - Customer should add and remove a product from the cart @positive @cart @regression", async ({
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  const data = cartData.TC_CART_001;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(inventoryPage.pagetitile).toBeVisible();

  await inventoryPage.addProductToCart(data.product);

  await inventoryPage.verifyProductWasAdded(data.product);

  await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);

  await inventoryPage.openCart();

  await cartPage.verifyProductExists(data.product);

  await cartPage.removeProduct(data.product);

  await expect(cartPage.cartItem(data.product)).toHaveCount(0);
});

test("TC_CART_002 - Customer should remove one of two products from the cart @positive @cart @regression", async ({
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  const data = cartData.TC_CART_002;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(inventoryPage.pagetitile).toBeVisible();

  await inventoryPage.addProductToCart(data.firstProduct);

  await inventoryPage.addProductToCart(data.secondProduct);

  await inventoryPage.verifyProductWasAdded(data.firstProduct);

  await inventoryPage.verifyProductWasAdded(data.secondProduct);

  await expect(inventoryPage.cartBadge).toHaveText(data.initialCartCount);

  await inventoryPage.openCart();

  await cartPage.removeProduct(data.firstProduct);

  await expect(inventoryPage.cartBadge).toHaveText(data.finalCartCount);

  await expect(cartPage.cartItem(data.firstProduct)).toHaveCount(0);

  await expect(cartPage.cartItem(data.secondProduct)).toBeVisible();
});

test("TC_CART_003 - Customer should return to Products using Continue Shopping @positive @navigation @regression", async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  const data = cartData.TC_CART_003;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(inventoryPage.pagetitile).toBeVisible();

  await inventoryPage.addProductToCart(data.firstProduct);

  await inventoryPage.addProductToCart(data.secondProduct);

  await inventoryPage.openCart();

  await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);

  await cartPage.ClickOnContinueOnShopping();

  await expect(page).toHaveURL(new RegExp(data.inventoryUrl));

  await expect(inventoryPage.pagetitile).toBeVisible();
});

test("TC_CART_004 - Cart should display the correct product price @positive @price @regression", async ({
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  const data = cartData.TC_CART_004;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(inventoryPage.pagetitile).toBeVisible();

  await inventoryPage.addProductToCart(data.product);

  await inventoryPage.openCart();

  await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);

  await expect(
    cartPage.cartItem(data.product).locator(".inventory_item_price"),
  ).toHaveText(data.expectedPrice);
});

test("TC_CART_005 - Removing a product should restore Add to cart on Products page @positive @cart @regression", async ({
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  const data = cartData.TC_CART_005;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(inventoryPage.pagetitile).toBeVisible();

  await inventoryPage.addProductToCart(data.product);

  await inventoryPage.verifyProductWasAdded(data.product);

  await inventoryPage.openCart();

  await cartPage.removeProduct(data.product);

  await expect(inventoryPage.cartBadge).toBeHidden();

  await cartPage.ClickOnContinueOnShopping();

  await expect(inventoryPage.pagetitile).toBeVisible();

  await expect(
    inventoryPage.productCard(data.product).getByRole("button", {
      name: data.addButtonName,
      exact: true,
    }),
  ).toBeVisible();
});

test("TC_CART_006 - Customer should open product details from the Cart page @positive @navigation @regression", async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  const data = cartData.TC_CART_006;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(inventoryPage.pagetitile).toBeVisible();

  await inventoryPage.addProductToCart(data.product);

  await inventoryPage.verifyProductWasAdded(data.product);

  await inventoryPage.openCart();

  await cartPage.openProductDetailsFromCart(data.product);

  await expect(page).toHaveURL(new RegExp(data.detailsUrl));

  await expect(
    page.getByText(data.product, {
      exact: true,
    }),
  ).toBeVisible();

  await expect(inventoryPage.productDetailsPrice).toHaveText(
    data.expectedPrice,
  );
});

test("TC_CART_007 - Customer should add every inventory product to the cart @positive @cart @regression", async ({
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  const data = cartData.TC_CART_007;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(inventoryPage.pagetitile).toBeVisible();

  const productNames = await inventoryPage.productNames.allTextContents();

  expect(productNames.length).toBeGreaterThan(0);

  for (const productName of productNames) {
    await inventoryPage.addProductToCart(productName);
  }

  await expect(inventoryPage.cartBadge).toHaveText(String(productNames.length));

  await inventoryPage.openCart();

  for (const productName of productNames) {
    await expect(cartPage.cartItem(productName)).toBeVisible();
  }
});

test("TC_CART_008 - Customer should remove every product from the cart @positive @cart @regression", async ({
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  const data = cartData.TC_CART_008;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(inventoryPage.pagetitile).toBeVisible();

  const productNames = await inventoryPage.productNames.allTextContents();

  expect(productNames.length).toBeGreaterThan(0);

  for (const productName of productNames) {
    await inventoryPage.addProductToCart(productName);
  }

  await inventoryPage.openCart();

  await expect(inventoryPage.cartBadge).toHaveText(String(productNames.length));

  for (const productName of productNames) {
    await expect(cartPage.cartItem(productName)).toBeVisible();

    await cartPage.removeProduct(productName);
  }

  await expect(cartPage.cartItems).toHaveCount(0);

  await expect(inventoryPage.cartBadge).toBeHidden();
});

test("TC_CART_009 - Cart items should persist after refreshing the Products page @positive @persistence @regression", async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  const data = cartData.TC_CART_009;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(inventoryPage.pagetitile).toBeVisible();

  await inventoryPage.addProductToCart(data.firstProduct);

  await inventoryPage.addProductToCart(data.secondProduct);

  await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);

  await page.reload();

  await expect(inventoryPage.pagetitile).toBeVisible();

  await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);

  await expect(
    inventoryPage.productCard(data.firstProduct).getByRole("button", {
      name: data.removeButtonName,
      exact: true,
    }),
  ).toBeVisible();

  await expect(
    inventoryPage.productCard(data.secondProduct).getByRole("button", {
      name: data.removeButtonName,
      exact: true,
    }),
  ).toBeVisible();

  await inventoryPage.openCart();

  await expect(cartPage.cartItem(data.firstProduct)).toBeVisible();

  await expect(cartPage.cartItem(data.secondProduct)).toBeVisible();
});
