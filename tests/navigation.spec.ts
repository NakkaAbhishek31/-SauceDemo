import { test, expect } from "./fixtures";

import navigationData from "../test-data/navigation.data.json";

test.describe("Navigation and Application State Tests", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.Visit();

    await loginPage.login(
      navigationData.login.username,
      navigationData.login.password,
    );

    await expect(inventoryPage.pagetitile).toBeVisible();
  });

  test("TC_NAV_001 - Customer should logout successfully @smoke @navigation @regression", async ({
    page,
    loginPage,
    navigation,
  }) => {
    const data = navigationData.TC_NAV_001;

    await navigation.clickOnOpenMenu();

    await navigation.clickOnLogout();

    await expect(loginPage.loginButton).toBeVisible();

    await expect(page).toHaveURL(data.loginUrl);
  });

  test("TC_NAV_002 - Reset App State should clear the cart @positive @reset @regression", async ({
    inventoryPage,
    navigation,
  }) => {
    const data = navigationData.TC_NAV_002;

    await inventoryPage.addProductToCart(data.product);

    await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);

    await navigation.clickOnOpenMenu();

    await navigation.clickOnRestAppState();

    await expect(inventoryPage.cartBadge).toBeHidden();

    // After reset, the button should be
    // "Add to cart", not "Remove".
    // await expect(
    //   inventoryPage.productCard(data.product).getByRole("button", {
    //     name: data.addButtonName,
    //     exact: true,
    //   }),
    // ).toBeVisible();
  });

  test("TC_NAV_003 - Logged-out customer should not open Products directly @negative @security @regression", async ({
    page,
    loginPage,
    inventoryPage,
    navigation,
  }) => {
    const data = navigationData.TC_NAV_003;

    await navigation.clickOnOpenMenu();

    await navigation.clickOnLogout();

    await expect(loginPage.loginButton).toBeVisible();

    await page.goto(data.protectedUrl);

    await expect(loginPage.loginButton).toBeVisible();

    await expect(inventoryPage.pagetitile).toBeHidden();

    await expect(page).toHaveURL(data.loginUrl);
  });

  test("TC_NAV_004 - All menu options should be visible @smoke @navigation @regression", async ({
    navigation,
  }) => {
    const data = navigationData.TC_NAV_004;

    await navigation.clickOnOpenMenu();

    await expect(navigation.menuOptions).toHaveText(data.expectedMenuOptions);

    await navigation.clickOnCloseMenu();
  });

  test("TC_NAV_005 - About menu should have the correct destination @positive @navigation @regression", async ({
    navigation,
  }) => {
    const data = navigationData.TC_NAV_005;

    await navigation.clickOnOpenMenu();

    await expect(navigation.btnAbout).toHaveAttribute("href", data.aboutUrl);

    await navigation.clickOnCloseMenu();
  });

  test("TC_NAV_006 - All Items should return customer to Products page @positive @navigation @regression", async ({
    page,
    inventoryPage,
    navigation,
  }) => {
    const data = navigationData.TC_NAV_006;

    await inventoryPage.OpenProductDetails(data.product);

    await navigation.clickOnOpenMenu();

    await expect(navigation.menuOptions).toHaveText(data.expectedMenuOptions);

    await navigation.clickOnAllItems();

    await expect(page).toHaveURL(new RegExp(data.inventoryUrl));

    await expect(inventoryPage.pagetitile).toBeVisible();
  });

  test("TC_NAV_007 - Reset App State should clear every selected product @positive @reset @regression", async ({
    inventoryPage,
    navigation,
  }) => {
    const data = navigationData.TC_NAV_007;

    const productNames = await inventoryPage.productNames.allTextContents();

    expect(productNames.length).toBeGreaterThan(0);

    for (const productName of productNames) {
      await inventoryPage.addProductToCart(productName);
    }

    await expect(inventoryPage.cartBadge).toHaveText(
      String(productNames.length),
    );

    await navigation.clickOnOpenMenu();

    await navigation.clickOnRestAppState();

    await navigation.clickOnCloseMenu();

    await expect(inventoryPage.cartBadge).toBeHidden();

    for (const productName of productNames) {
      await expect(
        inventoryPage.productCard(productName).getByRole("button", {
          name: data.addButtonName,
          exact: true,
        }),
      ).toBeVisible();
    }
  });

  test("TC_NAV_008 - Reset App State should remain cleared after page reload @positive @reset @persistence @regression", async ({
    page,
    inventoryPage,
    navigation,
  }) => {
    const data = navigationData.TC_NAV_008;

    const productNames = await inventoryPage.productNames.allTextContents();

    expect(productNames.length).toBeGreaterThan(0);

    for (const productName of productNames) {
      await inventoryPage.addProductToCart(productName);
    }

    await expect(inventoryPage.cartBadge).toHaveText(
      String(productNames.length),
    );

    await navigation.clickOnOpenMenu();

    await navigation.clickOnRestAppState();

    await navigation.clickOnCloseMenu();

    await page.reload();

    await expect(inventoryPage.pagetitile).toBeVisible();

    await expect(inventoryPage.cartBadge).toBeHidden();

    for (const productName of productNames) {
      await expect(
        inventoryPage.productCard(productName).getByRole("button", {
          name: data.addButtonName,
          exact: true,
        }),
      ).toBeVisible();
    }
  });
});
