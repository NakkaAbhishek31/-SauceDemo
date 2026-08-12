# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Inventory.spec.ts >> Inventory Tests >> TC_INVENTORY_021 - Sorting option should remain after returning from Details @positive @sort @regression
- Location: tests\Inventory.spec.ts:361:7

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-test="product-sort-container"]')
Expected: "lohi"
Received: "az"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('[data-test="product-sort-container"]')
    14 × locator resolved to <select class="product_sort_container" data-test="product-sort-container">…</select>
       - unexpected value "az"

```

```yaml
- combobox:
  - option "Name (A to Z)" [selected]
  - option "Name (Z to A)"
  - option "Price (low to high)"
  - option "Price (high to low)"
```

# Test source

```ts
  274 |     inventoryPage,
  275 |   }) => {
  276 |     const data = inventoryData.TC_INVENTORY_016;
  277 | 
  278 |     await inventoryPage.selectOption(data.sortOption);
  279 | 
  280 |     const actualNames = await inventoryPage.productNames.allTextContents();
  281 | 
  282 |     const sortedNames = [...actualNames].sort((a, b) => a.localeCompare(b));
  283 | 
  284 |     expect(actualNames).toEqual(sortedNames);
  285 |   });
  286 | 
  287 |   test("TC_INVENTORY_017 - Every product image should be visible with matching alt text @positive @accessibility @regression", async ({
  288 |     inventoryPage,
  289 |   }) => {
  290 |     const data = inventoryData.TC_INVENTORY_017;
  291 | 
  292 |     await expect(inventoryPage.inventoryImages).toHaveCount(
  293 |       data.expectedProductCount,
  294 |     );
  295 | 
  296 |     const productNames = await inventoryPage.productNames.allTextContents();
  297 | 
  298 |     for (const [index, productName] of productNames.entries()) {
  299 |       const productImage = inventoryPage.inventoryImages.nth(index);
  300 | 
  301 |       await expect(productImage).toBeVisible();
  302 | 
  303 |       await expect(productImage).toHaveAttribute("alt", productName);
  304 |     }
  305 |   });
  306 | 
  307 |   test("TC_INVENTORY_018 - Every product should open its correct details page @positive @navigation @regression", async ({
  308 |     inventoryPage,
  309 |   }) => {
  310 |     const productNames = await inventoryPage.productNames.allTextContents();
  311 | 
  312 |     for (const productName of productNames) {
  313 |       await inventoryPage.OpenProductDetails(productName);
  314 | 
  315 |       await expect(inventoryPage.productDetailsName).toHaveText(productName);
  316 | 
  317 |       await inventoryPage.backToProducts();
  318 | 
  319 |       await expect(inventoryPage.pagetitile).toBeVisible();
  320 |     }
  321 |   });
  322 | 
  323 |   test("TC_INVENTORY_019 - Adding one product should only change its button to Remove @positive @inventory @regression", async ({
  324 |     inventoryPage,
  325 |   }) => {
  326 |     const data = inventoryData.TC_INVENTORY_019;
  327 | 
  328 |     await inventoryPage.addProductToCart(data.selectedProduct);
  329 | 
  330 |     await expect(
  331 |       inventoryPage.productCard(data.selectedProduct).getByRole("button", {
  332 |         name: "Remove",
  333 |       }),
  334 |     ).toBeVisible();
  335 | 
  336 |     await expect(
  337 |       inventoryPage.productCard(data.unselectedProduct).getByRole("button", {
  338 |         name: "Add to cart",
  339 |       }),
  340 |     ).toBeVisible();
  341 | 
  342 |     await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);
  343 |   });
  344 | 
  345 |   test("TC_INVENTORY_020 - Product description should remain consistent on Details page @positive @details @regression", async ({
  346 |     inventoryPage,
  347 |   }) => {
  348 |     const data = inventoryData.TC_INVENTORY_020;
  349 | 
  350 |     const inventoryDescription = (
  351 |       await inventoryPage.productDescription(data.product).innerText()
  352 |     ).trim();
  353 | 
  354 |     await inventoryPage.OpenProductDetails(data.product);
  355 | 
  356 |     await expect(inventoryPage.productDetailsDesc).toHaveText(
  357 |       inventoryDescription,
  358 |     );
  359 |   });
  360 | 
  361 |   test("TC_INVENTORY_021 - Sorting option should remain after returning from Details @positive @sort @regression", async ({
  362 |     inventoryPage,
  363 |   }) => {
  364 |     const data = inventoryData.TC_INVENTORY_021;
  365 | 
  366 |     await inventoryPage.selectOption(data.sortOption);
  367 | 
  368 |     await expect(inventoryPage.productNames.first()).toHaveText(data.product);
  369 | 
  370 |     await inventoryPage.OpenProductDetails(data.product);
  371 | 
  372 |     await inventoryPage.backToProducts();
  373 | 
> 374 |     await expect(inventoryPage.filtterBtn).toHaveValue(data.sortOption);
      |                                            ^ Error: expect(locator).toHaveValue(expected) failed
  375 | 
  376 |     await expect(inventoryPage.productNames.first()).toHaveText(data.product);
  377 |   });
  378 | 
  379 |   test("TC_INVENTORY_022 - Cart should combine products added from Products and Details pages @positive @cart @regression", async ({
  380 |     inventoryPage,
  381 |   }) => {
  382 |     const data = inventoryData.TC_INVENTORY_022;
  383 | 
  384 |     await inventoryPage.addProductToCart(data.productsPageProduct);
  385 | 
  386 |     await inventoryPage.OpenProductDetails(data.detailsProduct);
  387 | 
  388 |     await inventoryPage.AddToCartFromDetailsPage();
  389 | 
  390 |     await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);
  391 | 
  392 |     await inventoryPage.backToProducts();
  393 | 
  394 |     await expect(inventoryPage.pagetitile).toBeVisible();
  395 |   });
  396 | 
  397 |   test("TC_INVENTORY_023 - Product added from Details should show Remove on Products page @positive @cart @regression", async ({
  398 |     inventoryPage,
  399 |   }) => {
  400 |     const data = inventoryData.TC_INVENTORY_023;
  401 | 
  402 |     await inventoryPage.OpenProductDetails(data.product);
  403 | 
  404 |     await inventoryPage.AddToCartFromDetailsPage();
  405 | 
  406 |     await expect(inventoryPage.cartBadge).toHaveText(data.cartCount);
  407 | 
  408 |     await inventoryPage.backToProducts();
  409 | 
  410 |     await expect(
  411 |       inventoryPage.productCard(data.product).getByRole("button", {
  412 |         name: "Remove",
  413 |       }),
  414 |     ).toBeVisible();
  415 |   });
  416 | });
  417 | 
```