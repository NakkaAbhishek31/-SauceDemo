import { test, expect } from "./fixtures";

import inventoryData from "../test-data/inventory.data.json";

test.describe("Inventory Tests", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.Visit();

    await loginPage.login(
      inventoryData.login.username,
      inventoryData.login.password,
    );

    await expect(inventoryPage.pagetitile).toBeVisible();
  });

  test("TC_INVENTORY_001 - Customer should add one product to cart @positive @inventory @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_001;

    await inventoryPage.addProductToCart(data.product);

    await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);
  });

  test("TC_INVENTORY_002 - Customer should add two different products to cart @positive @inventory @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_002;

    for (const product of data.products) {
      await inventoryPage.addProductToCart(product);
    }

    await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);
  });

  test("TC_INVENTORY_003 - Customer should remove a product from Products page @positive @inventory @regression", async ({
    inventoryPage,
    cartPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_003;

    await inventoryPage.addProductToCart(data.product);

    await cartPage.removeProductFromPage(data.product);

    await expect(inventoryPage.cartBadge).toBeHidden();

    await expect(
      inventoryPage.productCard(data.product).getByRole("button", {
        name: "Add to cart",
      }),
    ).toBeVisible();
  });

  test("TC_INVENTORY_004 - Products should sort by price Low to High @positive @sort @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_004;

    await inventoryPage.selectOption(data.sortOption);

    await expect(inventoryPage.allInventoryProducts.first()).toContainText(
      data.firstProduct,
    );
  });

  test("TC_INVENTORY_005 - Products should sort by price High to Low @positive @sort @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_005;

    await inventoryPage.selectOption(data.sortOption);

    await expect(inventoryPage.allInventoryProducts.first()).toContainText(
      data.firstProduct,
    );
  });

  test("TC_INVENTORY_006 - Products should sort alphabetically A to Z @positive @sort @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_006;

    await inventoryPage.selectOption(data.sortOption);

    await expect(inventoryPage.allInventoryProducts.first()).toContainText(
      data.firstProduct,
    );
  });

  test("TC_INVENTORY_007 - Products should sort alphabetically Z to A @positive @sort @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_007;

    await inventoryPage.selectOption(data.sortOption);

    await expect(inventoryPage.allInventoryProducts.first()).toContainText(
      data.firstProduct,
    );
  });

  test("TC_INVENTORY_008 - Customer should return from product details to Products @positive @navigation @regression", async ({
    page,
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_008;

    await inventoryPage.OpenProductDetails(data.product);

    await expect(page).toHaveURL(new RegExp(data.detailsUrl));

    await expect(
      page.getByText(data.product, {
        exact: true,
      }),
    ).toBeVisible();

    await inventoryPage.backToProducts();

    await expect(inventoryPage.pagetitile).toBeVisible();
  });

  test("TC_INVENTORY_009 - Customer should add a product from Details page @positive @inventory @regression", async ({
    page,
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_009;

    await inventoryPage.OpenProductDetails(data.product);

    await expect(
      page.getByText(data.product, {
        exact: true,
      }),
    ).toBeVisible();

    await inventoryPage.AddToCartFromDetailsPage();

    await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);

    await expect(inventoryPage.removeProductFromDetailsPage).toBeVisible();
  });

  test("TC_INVENTORY_010 - Customer should remove a product from Details page @positive @inventory @regression", async ({
    page,
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_010;

    await inventoryPage.OpenProductDetails(data.product);

    await expect(
      page.getByText(data.product, {
        exact: true,
      }),
    ).toBeVisible();

    await inventoryPage.AddToCartFromDetailsPage();

    await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);

    await inventoryPage.removeProductFromCartFromDetails();

    await expect(inventoryPage.cartBadge).toBeHidden();

    await expect(inventoryPage.addToCartFromDetailsPage).toBeVisible();
  });

  test("TC_INVENTORY_011 - Every product should display required details @positive @ui @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_011;

    await expect(inventoryPage.allInventoryProducts).toHaveCount(
      data.expectedProductCount,
    );

    const productCount = await inventoryPage.allInventoryProducts.count();

    for (let index = 0; index < productCount; index++) {
      const productCard = inventoryPage.allInventoryProducts.nth(index);

      await expect(productCard.locator(".inventory_item_name")).toBeVisible();

      await expect(productCard.locator(".inventory_item_price")).toBeVisible();

      await expect(
        productCard.getByRole("button", {
          name: data.addButton,
        }),
      ).toBeVisible();
    }
  });

  test("TC_INVENTORY_012 - Product details should show correct price and description @positive @details @regression", async ({
    page,
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_012;

    await inventoryPage.OpenProductDetails(data.product);

    await expect(
      page.getByText(data.product, {
        exact: true,
      }),
    ).toBeVisible();

    await expect(inventoryPage.productDetailsPrice).toHaveText(data.price);

    await expect(inventoryPage.productDetailsDesc).toContainText(
      data.description,
    );
  });

  test("TC_INVENTORY_013 - Cart state should persist after sorting @positive @sort @cart @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_013;

    await inventoryPage.addProductToCart(data.product);

    await inventoryPage.selectOption(data.sortOption);

    await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);

    await expect(
      inventoryPage.productCard(data.product).getByRole("button", {
        name: "Remove",
      }),
    ).toBeVisible();
  });

  test("TC_INVENTORY_014 - Selected sorting option should change from A-Z to Low-High @positive @sort @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_014;

    await expect(inventoryPage.filtterBtn).toHaveValue(data.defaultSort);

    await inventoryPage.addProductToCart(data.product);

    await inventoryPage.selectOption(data.changedSort);

    await expect(inventoryPage.filtterBtn).toHaveValue(data.changedSort);

    await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);
  });

  test("TC_INVENTORY_015 - Every product price should be sorted Low to High @positive @sort @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_015;

    await inventoryPage.selectOption(data.sortOption);

    const priceTexts =
      await inventoryPage.inventoryPriceDetails.allTextContents();

    const actualPrices = priceTexts.map((price) =>
      Number(price.replace(/[^0-9.]/g, "")),
    );

    const sortedPrices = [...actualPrices].sort((a, b) => a - b);

    expect(actualPrices).toEqual(sortedPrices);
  });

  test("TC_INVENTORY_016 - Every product name should be sorted A to Z @positive @sort @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_016;

    await inventoryPage.selectOption(data.sortOption);

    const actualNames = await inventoryPage.productNames.allTextContents();

    const sortedNames = [...actualNames].sort((a, b) => a.localeCompare(b));

    expect(actualNames).toEqual(sortedNames);
  });

  test("TC_INVENTORY_017 - Every product image should be visible with matching alt text @positive @accessibility @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_017;

    await expect(inventoryPage.inventoryImages).toHaveCount(
      data.expectedProductCount,
    );

    const productNames = await inventoryPage.productNames.allTextContents();

    for (const [index, productName] of productNames.entries()) {
      const productImage = inventoryPage.inventoryImages.nth(index);

      await expect(productImage).toBeVisible();

      await expect(productImage).toHaveAttribute("alt", productName);
    }
  });

  test("TC_INVENTORY_018 - Every product should open its correct details page @positive @navigation @regression", async ({
    inventoryPage,
  }) => {
    const productNames = await inventoryPage.productNames.allTextContents();

    for (const productName of productNames) {
      await inventoryPage.OpenProductDetails(productName);

      await expect(inventoryPage.productDetailsName).toHaveText(productName);

      await inventoryPage.backToProducts();

      await expect(inventoryPage.pagetitile).toBeVisible();
    }
  });

  test("TC_INVENTORY_019 - Adding one product should only change its button to Remove @positive @inventory @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_019;

    await inventoryPage.addProductToCart(data.selectedProduct);

    await expect(
      inventoryPage.productCard(data.selectedProduct).getByRole("button", {
        name: "Remove",
      }),
    ).toBeVisible();

    await expect(
      inventoryPage.productCard(data.unselectedProduct).getByRole("button", {
        name: "Add to cart",
      }),
    ).toBeVisible();

    await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);
  });

  test("TC_INVENTORY_020 - Product description should remain consistent on Details page @positive @details @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_020;

    const inventoryDescription = (
      await inventoryPage.productDescription(data.product).innerText()
    ).trim();

    await inventoryPage.OpenProductDetails(data.product);

    await expect(inventoryPage.productDetailsDesc).toHaveText(
      inventoryDescription,
    );
  });

  test("TC_INVENTORY_021 - Sorting option should remain after returning from Details @positive @sort @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_021;

    await inventoryPage.selectOption(data.sortOption);

    await expect(inventoryPage.productNames.first()).toHaveText(data.product);

    await inventoryPage.OpenProductDetails(data.product);

    await inventoryPage.backToProducts();

    await expect(inventoryPage.filtterBtn).toHaveValue(data.sortOption);

    await expect(inventoryPage.productNames.first()).toHaveText(data.product);
  });

  test("TC_INVENTORY_022 - Cart should combine products added from Products and Details pages @positive @cart @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_022;

    await inventoryPage.addProductToCart(data.productsPageProduct);

    await inventoryPage.OpenProductDetails(data.detailsProduct);

    await inventoryPage.AddToCartFromDetailsPage();

    await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);

    await inventoryPage.backToProducts();

    await expect(inventoryPage.pagetitile).toBeVisible();
  });

  test("TC_INVENTORY_023 - Product added from Details should show Remove on Products page @positive @cart @regression", async ({
    inventoryPage,
  }) => {
    const data = inventoryData.TC_INVENTORY_023;

    await inventoryPage.OpenProductDetails(data.product);

    await inventoryPage.AddToCartFromDetailsPage();

    await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);

    await inventoryPage.backToProducts();

    await expect(
      inventoryPage.productCard(data.product).getByRole("button", {
        name: "Remove",
      }),
    ).toBeVisible();
  });
});
