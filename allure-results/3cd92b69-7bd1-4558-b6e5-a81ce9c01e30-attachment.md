# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Reset App State clears every selected product button
- Location: tests\navigation.spec.ts:153:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Add to cart' })

```

```yaml
- button "Open Menu"
- img "Open Menu"
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
- button "Remove"
- link "Sauce Labs Bolt T-Shirt":
  - /url: "#"
  - img "Sauce Labs Bolt T-Shirt"
- link "Sauce Labs Bolt T-Shirt":
  - /url: "#"
- text: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt. $15.99
- button "Remove"
- link "Sauce Labs Fleece Jacket":
  - /url: "#"
  - img "Sauce Labs Fleece Jacket"
- link "Sauce Labs Fleece Jacket":
  - /url: "#"
- text: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. $49.99
- button "Remove"
- link "Sauce Labs Onesie":
  - /url: "#"
  - img "Sauce Labs Onesie"
- link "Sauce Labs Onesie":
  - /url: "#"
- text: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel. $7.99
- button "Remove"
- link "Test.allTheThings() T-Shirt (Red)":
  - /url: "#"
  - img "Test.allTheThings() T-Shirt (Red)"
- link "Test.allTheThings() T-Shirt (Red)":
  - /url: "#"
- text: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton. $15.99
- button "Remove"
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
  79  |     await expect(inventoryPage.pagetitile).toBeHidden();
  80  | 
  81  |     await expect(page).toHaveURL('https://www.saucedemo.com/');
  82  | });
  83  | 
  84  | test('Verify all menu options are visible', async ({ loginPage, inventoryPage,navigation }) => {
  85  | 
  86  |     await loginPage.Visit();
  87  | 
  88  |     await loginPage.login('standard_user', 'secret_sauce');
  89  | 
  90  |     await expect(inventoryPage.pagetitile).toBeVisible();
  91  | 
  92  |     await navigation.clickOnOpenMenu();
  93  | 
  94  |     await expect(navigation.menuOptions).toHaveText(['All Items',
  95  |     'About','Logout','Reset App State']);
  96  | 
  97  |     await navigation.clickOnCloseMenu();
  98  | 
  99  | 
  100 | 
  101 | });
  102 | 
  103 | 
  104 | test(' About menu link has the correct destination', async ({ loginPage, inventoryPage,navigation }) => {
  105 | 
  106 |     
  107 |     
  108 |     await loginPage.Visit();
  109 | 
  110 |     await loginPage.login('standard_user', 'secret_sauce');
  111 | 
  112 |     await expect(inventoryPage.pagetitile).toBeVisible();
  113 | 
  114 |      await navigation.clickOnOpenMenu();
  115 | 
  116 |      await expect(navigation.btnAbout).toHaveAttribute(
  117 |   'href',
  118 |   'https://saucelabs.com/'
  119 | );
  120 | 
  121 |     //await navigation.clickOnAbout();
  122 | 
  123 |     //await expect(page).toHaveURL('https://saucelabs.com/')
  124 | 
  125 | 
  126 | })
  127 | 
  128 | 
  129 | test(' Open Backpack details → Open Menu → Click All Items All Items menu returns to Products page', async ({ loginPage, inventoryPage,navigation }) => {
  130 | 
  131 |     const firstproduct = 'Sauce Labs Onesie';
  132 |     
  133 |     await loginPage.Visit();
  134 | 
  135 |     await loginPage.login('standard_user', 'secret_sauce');
  136 | 
  137 |     await expect(inventoryPage.pagetitile).toBeVisible();
  138 | 
  139 |     await inventoryPage.OpenProductDetails(firstproduct);
  140 | 
  141 |      await navigation.clickOnOpenMenu();
  142 | 
  143 |      await expect(navigation.menuOptions).toHaveText(['All Items',
  144 |      'About','Logout','Reset App State']);
  145 | 
  146 |      await navigation.clickOnCloseMenu();
  147 | 
  148 | 
  149 | })
  150 | 
  151 | 
  152 | //bug
  153 | test('Reset App State clears every selected product button', async ({ page,loginPage, inventoryPage,navigation }) => {
  154 | 
  155 |     await loginPage.Visit();
  156 |     await loginPage.login('standard_user', 'secret_sauce');
  157 |     await expect(inventoryPage.pagetitile).toBeVisible();
  158 |     let productNames=await inventoryPage.productNames.allTextContents();
  159 | 
  160 |     for(let productname of productNames)
  161 |     {
  162 |       await inventoryPage.addProductToCart(productname);
  163 |     }
  164 | 
  165 |       await expect(inventoryPage.cartBadge)
  166 |       .toHaveText(String(productNames.length));
  167 | 
  168 |     await navigation.clickOnOpenMenu();
  169 | 
  170 |     await navigation.clickOnRestAppState();
  171 | 
  172 |     await navigation.clickOnCloseMenu();
  173 | 
  174 |     await expect(inventoryPage.cartBadge).toBeHidden();
  175 | for (const productName of productNames) {
  176 |       await expect(
  177 |         inventoryPage.productCard(productName)
  178 |           .getByRole('button', { name: 'Add to cart' })
> 179 |       ).toBeVisible();
      |         ^ Error: expect(locator).toBeVisible() failed
  180 |     }
  181 | 
  182 | });
  183 | 
  184 | 
  185 | 
  186 | test('Reset App State clears every selected product button.with reloading page', async ({ page,loginPage, inventoryPage,navigation }) => {
  187 | 
  188 |     await loginPage.Visit();
  189 |     await loginPage.login('standard_user', 'secret_sauce');
  190 |     await expect(inventoryPage.pagetitile).toBeVisible();
  191 |     let productNames=await inventoryPage.productNames.allTextContents();
  192 | 
  193 |     for(let productname of productNames)
  194 |     {
  195 |       await inventoryPage.addProductToCart(productname);
  196 |     }
  197 | 
  198 |       await expect(inventoryPage.cartBadge)
  199 |       .toHaveText(String(productNames.length));
  200 | 
  201 |     await navigation.clickOnOpenMenu();
  202 | 
  203 |     await navigation.clickOnRestAppState();
  204 | 
  205 |     await navigation.clickOnCloseMenu();
  206 |     await page.reload();
  207 |     await expect(inventoryPage.cartBadge).toBeHidden();
  208 | for (const productName of productNames) {
  209 |       await expect(
  210 |         inventoryPage.productCard(productName)
  211 |           .getByRole('button', { name: 'Add to cart' })
  212 |       ).toBeVisible();
  213 |     }
  214 | 
  215 | });
```