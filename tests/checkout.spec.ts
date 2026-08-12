import { test, expect } from "./fixtures";

import checkoutData from "../test-data/checkout.data.json";

test.describe("Checkout Tests", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.Visit();

    await loginPage.login(
      checkoutData.login.username,
      checkoutData.login.password,
    );

    await expect(inventoryPage.pagetitile).toBeVisible();
  });

  const addProducts = async (
    inventoryPage: any,
    products: string[],
  ): Promise<void> => {
    for (const product of products) {
      await inventoryPage.addProductToCart(product);

      await inventoryPage.verifyProductWasAdded(product);
    }
  };

  test("TC_CHECKOUT_001 - Customer should complete an order successfully @positive @checkout @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_001;

    await addProducts(inventoryPage, data.products);

    await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    await checkout.clickoncheckoutfinish();

    await expect(checkout.orderCompltedMsg).toContainText(data.successMessage);
  });

  test("TC_CHECKOUT_002 - First Name should be required during checkout @negative @validation @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_002;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    await expect(checkout.errorMsg).toContainText(data.expectedError);
  });

  test("TC_CHECKOUT_003 - Last Name should be required during checkout @negative @validation @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_003;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    await expect(checkout.errorMsg).toContainText(data.expectedError);
  });

  test("TC_CHECKOUT_004 - Postal Code should be required during checkout @negative @validation @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_004;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    await expect(checkout.errorMsg).toContainText(data.expectedError);
  });

  test("TC_CHECKOUT_005 - Customer should cancel checkout and return to Cart @negative @cancel @regression", async ({
    page,
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_005;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.clickOnCheckoutCancel();

    await expect(page).toHaveURL(new RegExp(data.cartUrl));

    for (const product of data.products) {
      await expect(cartPage.cartItem(product)).toBeVisible();
    }

    await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);
  });

  test("TC_CHECKOUT_006 - Checkout Overview should display the selected product @positive @overview @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_006;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    await expect(checkout.checkoutSummary(data.products[0])).toBeVisible();

    await expect(checkout.checkoutTotal).toBeVisible();
  });

  test("TC_CHECKOUT_007 - Checkout should display correct totals for two products @positive @price @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_007;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    for (const product of data.products) {
      await expect(checkout.checkoutSummary(product)).toContainText(
        data.prices[product as keyof typeof data.prices],
      );
    }

    await expect(checkout.subTotal).toHaveText(data.subtotal);

    await expect(checkout.tax).toHaveText(data.tax);

    await expect(checkout.checkoutTotal).toHaveText(data.total);
  });

  test("TC_CHECKOUT_008 - Customer should return home after successful order @positive @navigation @regression", async ({
    page,
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_008;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    await checkout.clickoncheckoutfinish();

    await expect(checkout.orderCompltedMsg).toContainText(data.successMessage);

    await expect(inventoryPage.cartBadge).toBeHidden();

    await checkout.ReturnToHome();

    await expect(page).toHaveURL(new RegExp(data.inventoryUrl));

    await expect(inventoryPage.pagetitile).toBeVisible();
  });

  test("TC_CHECKOUT_009 - Checkout Overview should display payment and shipping information @positive @overview @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_009;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    await expect(checkout.paymentInfo).toBeVisible();
  });

  test("TC_CHECKOUT_010 - Item total should equal the sum of selected product prices @positive @calculation @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_010;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    const priceTexts =
      await checkout.inventoryCheckoutProductPrice.allTextContents();

    const calculatedTotal = priceTexts
      .map((price: string) => Number(price.replace(/[^0-9.]/g, "")))
      .reduce((total: number, price: number) => total + price, 0);

    const subtotalText = await checkout.subTotal.innerText();

    const displayedTotal = Number(subtotalText.replace(/[^0-9.]/g, ""));

    expect(calculatedTotal).toBeCloseTo(displayedTotal, 2);
  });

  test("TC_CHECKOUT_011 - Checkout should retain valid fields after Postal Code error @negative @validation @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_011;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    await expect(checkout.firstName).toHaveValue(data.firstName);

    await expect(checkout.lastName).toHaveValue(data.lastName);

    await expect(checkout.postalCode).toHaveValue("");

    await expect(checkout.errorMsg).toContainText(
      "Error: Postal Code is required",
    );
  });

  test("TC_CHECKOUT_012 - Overview should display every product and correct subtotal @positive @calculation @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_012;

    const productNames = await inventoryPage.productNames.allTextContents();

    expect(productNames.length).toBeGreaterThan(0);

    await addProducts(inventoryPage, productNames);

    await inventoryPage.openCart();

    for (const product of productNames) {
      await expect(cartPage.cartItem(product)).toBeVisible();
    }

    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    for (const product of productNames) {
      await expect(checkout.checkoutSummary(product)).toBeVisible();
    }

    const priceTexts =
      await checkout.inventoryCheckoutProductPrice.allTextContents();

    const calculatedTotal = priceTexts
      .map((price: string) => Number(price.replace(/[^0-9.]/g, "")))
      .reduce((total: number, price: number) => total + price, 0);

    const subtotalText = await checkout.subTotal.innerText();

    const displayedTotal = Number(subtotalText.replace(/[^0-9.]/g, ""));

    expect(calculatedTotal).toBeCloseTo(displayedTotal, 2);
  });

  test("TC_CHECKOUT_013 - Total should equal Item Total plus Tax @positive @calculation @regression", async ({
    inventoryPage,
    cartPage,
    checkout,
  }) => {
    const data = checkoutData.TC_CHECKOUT_013;

    await addProducts(inventoryPage, data.products);

    await inventoryPage.openCart();
    await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling(
      data.firstName,
      data.lastName,
      data.postalCode,
    );

    await checkout.clickOncheckoutContinue();

    const subtotal = Number(
      (await checkout.subTotal.innerText()).replace(/[^0-9.]/g, ""),
    );

    const tax = Number(
      (await checkout.tax.innerText()).replace(/[^0-9.]/g, ""),
    );

    const displayedTotal = Number(
      (await checkout.checkoutTotal.innerText()).replace(/[^0-9.]/g, ""),
    );

    expect(subtotal + tax).toBeCloseTo(displayedTotal, 2);
  });
});
