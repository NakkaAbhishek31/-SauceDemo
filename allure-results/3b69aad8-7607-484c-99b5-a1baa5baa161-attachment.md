# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.ts >> Customer can add every inventory product to the cart
- Location: tests\cart.spec.ts:182:6

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.shopping_cart_badge')
Expected: "productslength"
Received: "6"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.shopping_cart_badge')
    14 × locator resolved to <span class="shopping_cart_badge" data-test="shopping-cart-badge">6</span>
       - unexpected value "6"

```

```yaml
- text: "6"
```

# Test source

```ts
  95  | test('Cart displays the correct price for the selected product ', async ({ loginPage, inventoryPage,cartPage }) => {
  96  | 
  97  |     const firstproduct = 'Sauce Labs Backpack';
  98  | 
  99  |     await loginPage.Visit();
  100 | 
  101 |     await loginPage.login('standard_user', 'secret_sauce');
  102 | 
  103 |     await expect(inventoryPage.pagetitile).toBeVisible();
  104 | 
  105 |     await inventoryPage.addProductToCart(firstproduct);
  106 | 
  107 | 
  108 |     await inventoryPage.openCart();
  109 | 
  110 |     await expect(inventoryPage.cartBadge).toHaveText('1');
  111 | 
  112 |     await expect(cartPage.cartItem(firstproduct).locator('.inventory_item_price')).toContainText('$29.99')
  113 | 
  114 | });
  115 | 
  116 | 
  117 | 
  118 | test('Removing from Cart restores “Add to cart” on Products page', async ({ page, loginPage, inventoryPage,cartPage}) => {
  119 | 
  120 |     const firstproduct = 'Sauce Labs Backpack';
  121 | 
  122 |     await loginPage.Visit();
  123 | 
  124 |     await loginPage.login('standard_user', 'secret_sauce');
  125 | 
  126 |     await expect(inventoryPage.pagetitile).toBeVisible();
  127 | 
  128 |     await inventoryPage.addProductToCart(firstproduct);
  129 | 
  130 |     await inventoryPage.verifyProductWasAdded(firstproduct);
  131 |     await expect(inventoryPage.cartBadge).toHaveText('1');
  132 | 
  133 |     await inventoryPage.openCart();
  134 | 
  135 |     await cartPage.removeProduct(firstproduct);
  136 | 
  137 |     await expect(inventoryPage.cartBadge).toBeHidden();
  138 | 
  139 |     await cartPage.ClickOnContinueOnShopping();
  140 | 
  141 |     await expect(inventoryPage.pagetitile).toBeVisible();
  142 | 
  143 |     await expect(
  144 |         inventoryPage.productCard(firstproduct)
  145 |             .getByRole('button', { name: 'Add to cart' })
  146 |     ).toBeVisible();
  147 | });
  148 | 
  149 | 
  150 | 
  151 | test('Open product details from the Cart page', async ({ page, loginPage, inventoryPage,cartPage}) => {
  152 | 
  153 |     const firstproduct = 'Sauce Labs Backpack';
  154 | 
  155 |     await loginPage.Visit();
  156 | 
  157 |     await loginPage.login('standard_user', 'secret_sauce');
  158 | 
  159 |     await expect(inventoryPage.pagetitile).toBeVisible();
  160 | 
  161 |     await inventoryPage.addProductToCart(firstproduct);
  162 | 
  163 |     await inventoryPage.verifyProductWasAdded(firstproduct);
  164 |     await expect(inventoryPage.cartBadge).toHaveText('1');
  165 | 
  166 |     await inventoryPage.openCart();
  167 | 
  168 |     await  cartPage.openProductDetailsFromCart(firstproduct);
  169 | 
  170 |     await expect(page).toHaveURL(/inventory-item.html/);
  171 |  
  172 |      await expect(
  173 |   page.getByText(firstproduct, { exact: true })
  174 | ).toBeVisible();
  175 | 
  176 | await expect(inventoryPage.productDetailsPrice).toHaveText('$29.99');
  177 |     
  178 | });
  179 | 
  180 | 
  181 | 
  182 | test.only('Customer can add every inventory product to the cart', async ({ page,loginPage, inventoryPage,cartPage }) => {
  183 | 
  184 |     await loginPage.Visit();
  185 |     await loginPage.login('standard_user', 'secret_sauce');
  186 |     await expect(inventoryPage.pagetitile).toBeVisible();
  187 |     const productNames=await inventoryPage.productNames.allTextContents();
  188 |    const productslength = String(productNames.length)
  189 |     for(let productName of productNames)
  190 |     {
  191 |         await inventoryPage.addProductToCart(productName);
  192 |     }
  193 |     await inventoryPage.openCart();
  194 | 
> 195 |     await expect(inventoryPage.cartBadge).toHaveText('productslength');
      |                                           ^ Error: expect(locator).toHaveText(expected) failed
  196 | 
  197 |        for(let productName of productNames)
  198 |     {
  199 |          cartPage.cartItem(productName)
  200 |     }
  201 | });
  202 | 
  203 | 
```