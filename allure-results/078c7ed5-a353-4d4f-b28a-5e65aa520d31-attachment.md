# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation and Application State Tests >> TC_NAV_002 - Reset App State should clear the cart @positive @reset @regression
- Location: tests\navigation.spec.ts:33:8

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart', exact: true })

```

```yaml
- button "Open Menu"
- img "Open Menu"
- navigation:
  - link "All Items":
    - /url: "#"
  - link "About":
    - /url: https://saucelabs.com/
  - link "Logout":
    - /url: "#"
  - link "Reset App State":
    - /url: "#"
- button "Close Menu"
- img "Close Menu"
- text: Swag Labs Products Name (A to Z)
- combobox:
  - option "Name (A to Z)" [selected]
  - option "Name (Z to A)"
  - option "Price (low to high)"
  - option "Price (high to low)"
- link "Sauce Labs Backpack":
  - /url: "#"
  - img "Sauce Labs Backpack"
- link "Sauce Labs Backpack":
  - /url: "#"
- text: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99
- button "Remove"
- link "Sauce Labs Bike Light":
  - /url: "#"
  - img "Sauce Labs Bike Light"
- link "Sauce Labs Bike Light":
  - /url: "#"
- text: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included. $9.99
- button "Add to cart"
- link "Sauce Labs Bolt T-Shirt":
  - /url: "#"
  - img "Sauce Labs Bolt T-Shirt"
- link "Sauce Labs Bolt T-Shirt":
  - /url: "#"
- text: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt. $15.99
- button "Add to cart"
- link "Sauce Labs Fleece Jacket":
  - /url: "#"
  - img "Sauce Labs Fleece Jacket"
- link "Sauce Labs Fleece Jacket":
  - /url: "#"
- text: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. $49.99
- button "Add to cart"
- link "Sauce Labs Onesie":
  - /url: "#"
  - img "Sauce Labs Onesie"
- link "Sauce Labs Onesie":
  - /url: "#"
- text: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel. $7.99
- button "Add to cart"
- link "Test.allTheThings() T-Shirt (Red)":
  - /url: "#"
  - img "Test.allTheThings() T-Shirt (Red)"
- link "Test.allTheThings() T-Shirt (Red)":
  - /url: "#"
- text: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton. $15.99
- button "Add to cart"
- contentinfo:
  - list:
    - listitem:
      - link "Twitter":
        - /url: https://twitter.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | import { test, expect } from "./fixtures";
  2   | 
  3   | import navigationData from "../test-data/navigation.data.json";
  4   | 
  5   | test.describe("Navigation and Application State Tests", () => {
  6   |   test.beforeEach(async ({ loginPage, inventoryPage }) => {
  7   |     await loginPage.Visit();
  8   | 
  9   |     await loginPage.login(
  10  |       navigationData.login.username,
  11  |       navigationData.login.password,
  12  |     );
  13  | 
  14  |     await expect(inventoryPage.pagetitile).toBeVisible();
  15  |   });
  16  | 
  17  |   test("TC_NAV_001 - Customer should logout successfully @smoke @navigation @regression", async ({
  18  |     page,
  19  |     loginPage,
  20  |     navigation,
  21  |   }) => {
  22  |     const data = navigationData.TC_NAV_001;
  23  | 
  24  |     await navigation.clickOnOpenMenu();
  25  | 
  26  |     await navigation.clickOnLogout();
  27  | 
  28  |     await expect(loginPage.loginButton).toBeVisible();
  29  | 
  30  |     await expect(page).toHaveURL(data.loginUrl);
  31  |   });
  32  | 
  33  |   test.only("TC_NAV_002 - Reset App State should clear the cart @positive @reset @regression", async ({
  34  |     inventoryPage,
  35  |     navigation,
  36  |   }) => {
  37  |     const data = navigationData.TC_NAV_002;
  38  | 
  39  |     await inventoryPage.addProductToCart(data.product);
  40  | 
  41  |     await expect(inventoryPage.cartBadge).toHaveText(data.expectedCartCount);
  42  | 
  43  |     await navigation.clickOnOpenMenu();
  44  | 
  45  |     await navigation.clickOnRestAppState();
  46  | 
  47  |     await expect(inventoryPage.cartBadge).toBeHidden();
  48  | 
  49  |     // After reset, the button should be
  50  |     // "Add to cart", not "Remove".
  51  |     await expect(
  52  |       inventoryPage.productCard(data.product).getByRole("button", {
  53  |         name: data.addButtonName,
  54  |         exact: true,
  55  |       }),
> 56  |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  57  |   });
  58  | 
  59  |   test("TC_NAV_003 - Logged-out customer should not open Products directly @negative @security @regression", async ({
  60  |     page,
  61  |     loginPage,
  62  |     inventoryPage,
  63  |     navigation,
  64  |   }) => {
  65  |     const data = navigationData.TC_NAV_003;
  66  | 
  67  |     await navigation.clickOnOpenMenu();
  68  | 
  69  |     await navigation.clickOnLogout();
  70  | 
  71  |     await expect(loginPage.loginButton).toBeVisible();
  72  | 
  73  |     await page.goto(data.protectedUrl);
  74  | 
  75  |     await expect(loginPage.loginButton).toBeVisible();
  76  | 
  77  |     await expect(inventoryPage.pagetitile).toBeHidden();
  78  | 
  79  |     await expect(page).toHaveURL(data.loginUrl);
  80  |   });
  81  | 
  82  |   test("TC_NAV_004 - All menu options should be visible @smoke @navigation @regression", async ({
  83  |     navigation,
  84  |   }) => {
  85  |     const data = navigationData.TC_NAV_004;
  86  | 
  87  |     await navigation.clickOnOpenMenu();
  88  | 
  89  |     await expect(navigation.menuOptions).toHaveText(data.expectedMenuOptions);
  90  | 
  91  |     await navigation.clickOnCloseMenu();
  92  |   });
  93  | 
  94  |   test("TC_NAV_005 - About menu should have the correct destination @positive @navigation @regression", async ({
  95  |     navigation,
  96  |   }) => {
  97  |     const data = navigationData.TC_NAV_005;
  98  | 
  99  |     await navigation.clickOnOpenMenu();
  100 | 
  101 |     await expect(navigation.btnAbout).toHaveAttribute("href", data.aboutUrl);
  102 | 
  103 |     await navigation.clickOnCloseMenu();
  104 |   });
  105 | 
  106 |   test("TC_NAV_006 - All Items should return customer to Products page @positive @navigation @regression", async ({
  107 |     page,
  108 |     inventoryPage,
  109 |     navigation,
  110 |   }) => {
  111 |     const data = navigationData.TC_NAV_006;
  112 | 
  113 |     await inventoryPage.OpenProductDetails(data.product);
  114 | 
  115 |     await navigation.clickOnOpenMenu();
  116 | 
  117 |     await expect(navigation.menuOptions).toHaveText(data.expectedMenuOptions);
  118 | 
  119 |     await navigation.clickOnAllItems();
  120 | 
  121 |     await expect(page).toHaveURL(new RegExp(data.inventoryUrl));
  122 | 
  123 |     await expect(inventoryPage.pagetitile).toBeVisible();
  124 |   });
  125 | 
  126 |   test("TC_NAV_007 - Reset App State should clear every selected product @positive @reset @regression", async ({
  127 |     inventoryPage,
  128 |     navigation,
  129 |   }) => {
  130 |     const data = navigationData.TC_NAV_007;
  131 | 
  132 |     const productNames = await inventoryPage.productNames.allTextContents();
  133 | 
  134 |     expect(productNames.length).toBeGreaterThan(0);
  135 | 
  136 |     for (const productName of productNames) {
  137 |       await inventoryPage.addProductToCart(productName);
  138 |     }
  139 | 
  140 |     await expect(inventoryPage.cartBadge).toHaveText(
  141 |       String(productNames.length),
  142 |     );
  143 | 
  144 |     await navigation.clickOnOpenMenu();
  145 | 
  146 |     await navigation.clickOnRestAppState();
  147 | 
  148 |     await navigation.clickOnCloseMenu();
  149 | 
  150 |     await expect(inventoryPage.cartBadge).toBeHidden();
  151 | 
  152 |     for (const productName of productNames) {
  153 |       await expect(
  154 |         inventoryPage.productCard(productName).getByRole("button", {
  155 |           name: data.addButtonName,
  156 |           exact: true,
```