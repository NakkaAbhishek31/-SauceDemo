// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../Src/Pages/LoginPages';
// import { InventoryPage } from '../Src/Pages/InventoryPages';
// import { CartPage } from '../Src/Pages/cartPage';
// import { CheckoutPage } from '../Src/Pages/CheckoutPage';
// import { NavigationPage } from '../Src/Pages/NavigationPage.ts';



// let loginPage: LoginPage;
// let inventoryPage: InventoryPage;
// let cartPage: CartPage;
// let checkout: CheckoutPage;
// let navigation: NavigationPage

// test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     inventoryPage = new InventoryPage(page);
//     cartPage = new CartPage(page);
//     checkout = new CheckoutPage(page);
//     navigation = new NavigationPage(page);
// });

// test('standard customer can add the product to cart ', async ({ page }) => {

//     const product = 'Sauce Labs Backpack';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(product);

//     await expect(inventoryPage.cartBadge).toHaveText('1');

// })

// test('customer can add and remove a product from the cart ', async ({ page }) => {


//     const product = 'Sauce Labs Backpack';
//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');



//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(product);

//     await inventoryPage.verifyProductWasAdded(product);
//     await expect(inventoryPage.cartBadge).toHaveText('1');


//     await inventoryPage.openCart();

//     await cartPage.verifyProductExists(product);

//     await cartPage.removeProduct(product);

// })


// test('locked user sees a login error', async ({ page }) => {


//     await loginPage.Visit();

//     await loginPage.login('locked_out_user', 'secret_sauce');

//     await expect(loginPage.errorMessage).toContainText('locked out')


// })


// test(' username and password requried ', async ({ page }) => {



//     await loginPage.Visit();

//     await loginPage.login('', '');

//     await expect(loginPage.errorMessage).toContainText('Username is required');
//     await loginPage.login('standard_user', '');
//     await expect(loginPage.errorMessage).toContainText('Password is required');
//     // await expect(loginPage.errorMessage).toContainText('Epic sadface: Password is required')


// })



// test('standard customer can add the  2  diff product to cart ', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);

//     await expect(inventoryPage.cartBadge).toHaveText('2');

// })


// test('standard customer can remove  from the Product Page ', async ({ page }) => {

//     const product = 'Sauce Labs Backpack';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(product);

//     await cartPage.removeProductFromPage(product);


// })



// test('standard customer can add 2 product and  removing one product  from the cart and  verify  other product  avalible in  cart ', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);


//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await inventoryPage.verifyProductWasAdded(secondProduct);
//     await expect(inventoryPage.cartBadge).toHaveText('2');
//     await inventoryPage.openCart();

//     await cartPage.removeProduct(firstproduct);

//     await expect(inventoryPage.cartBadge).toHaveText('1');

// })

// test('filling the checkout customer details . and ordering produt  ', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);


//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await inventoryPage.verifyProductWasAdded(secondProduct);
//     await expect(inventoryPage.cartBadge).toHaveText('2');

//     await inventoryPage.openCart();

//     await cartPage.clickOnCheckOut();
//     await checkout.checkoutCustomerDetailsFilling('test', 'test', '53307');
//     await checkout.clickOncheckoutContinue();
//     await checkout.clickoncheckoutfinish()

//     await expect(checkout.orderCompltedMsg).toContainText('Thank you for your order!');
// })


// test('First Name is required during checkout.', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);


//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await inventoryPage.verifyProductWasAdded(secondProduct);
//     await expect(inventoryPage.cartBadge).toHaveText('2');

//     await inventoryPage.openCart();

//     await cartPage.clickOnCheckOut();
//     await checkout.checkoutCustomerDetailsFilling('', 'test', '53307');
//     await checkout.clickOncheckoutContinue();
//     await expect(checkout.errorMsg).toContainText('Error: First Name is required');

// })


// test('Last Name is required during checkout.', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);


//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await inventoryPage.verifyProductWasAdded(secondProduct);
//     await expect(inventoryPage.cartBadge).toHaveText('2');

//     await inventoryPage.openCart();

//     await cartPage.clickOnCheckOut();
//     await checkout.checkoutCustomerDetailsFilling('test', '', '53307');
//     await checkout.clickOncheckoutContinue();
//     await expect(checkout.errorMsg).toContainText('Error: Last Name is required');

// })

// test('Postalcode is required during checkout.', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);


//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await inventoryPage.verifyProductWasAdded(secondProduct);
//     await expect(inventoryPage.cartBadge).toHaveText('2');

//     await inventoryPage.openCart();

//     await cartPage.clickOnCheckOut();
//     await checkout.checkoutCustomerDetailsFilling('test', 'test', '');
//     await checkout.clickOncheckoutContinue();
//     await expect(checkout.errorMsg).toContainText('Error: Postal Code is required');

// })


// test('customer cancels checkout and returns to the Cart page.', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);


//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await inventoryPage.verifyProductWasAdded(secondProduct);
//     await expect(inventoryPage.cartBadge).toHaveText('2');

//     await inventoryPage.openCart();

//     await cartPage.clickOnCheckOut();
//     await checkout.clickOnCheckoutCancel();
//     await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
//     await expect(cartPage.cartItem(firstproduct)).toBeVisible();
//     await expect(cartPage.cartItem(secondProduct)).toBeVisible();
//     await expect(inventoryPage.cartBadge).toHaveText('2');

// })


// test('Checkout Overview shows the selected product before order completion.', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';


//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);


//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await expect(inventoryPage.cartBadge).toHaveText('1');

//     await inventoryPage.openCart();

//     await cartPage.clickOnCheckOut();
//     await checkout.checkoutCustomerDetailsFilling('test', 'test', '53306');
//     await checkout.clickOncheckoutContinue()
//     await checkout.checkoutSummary(firstproduct);

//     const total = await checkout.checkoutTotal.innerText();
//     console.log(`Checkout total: ${total}`);

//     await expect(checkout.checkoutTotal).toBeVisible();


// })


// test('verify checkout price totals for two products', async ({ page }) => {
//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);


//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await inventoryPage.verifyProductWasAdded(secondProduct);
//     await expect(inventoryPage.cartBadge).toHaveText('2');

//     await inventoryPage.openCart();

//     await cartPage.clickOnCheckOut();
//     await checkout.checkoutCustomerDetailsFilling('test', 'test', '53306');
//     await checkout.clickOncheckoutContinue()
//     await expect(checkout.checkoutSummary(firstproduct)).toBeVisible();
//     await expect(checkout.checkoutSummary(secondProduct)).toBeVisible();
//     await expect(checkout.checkoutSummary(firstproduct)).toContainText('$29.99');
//     await expect(checkout.checkoutSummary(secondProduct)).toContainText('$9.99');
//     await expect(checkout.subTotal).toHaveText('Item total: $39.98');
//     await expect(checkout.tax).toHaveText('Tax: $3.20');
//     await expect(checkout.checkoutTotal).toHaveText('Total: $43.18');

// })


// test('verify Sort products by price — Low to High', async ({ page }) => {


//     const firstproduct = 'Sauce Labs Onesie';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     //await inventoryPage.clickonFilterOption();

//     await inventoryPage.selectOption('lohi');;


//     await expect(inventoryPage.allInventoryProducts.first()).toContainText(firstproduct);


// })



// test('Sort products by price: High to Low', async ({ page }) => {
//     const firstproduct = 'Sauce Labs Fleece Jacket';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     //await inventoryPage.clickonFilterOption();

//     await inventoryPage.selectOption('hilo');;


//     await expect(inventoryPage.allInventoryProducts.first()).toContainText(firstproduct);


// })

// test('Sort products alphabetically: A to Z', async ({ page }) => {

//     const inventoryPage = new InventoryPage(page);

//     const firstProduct = 'Sauce Labs Backpack';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     //await inventoryPage.clickonFilterOption();

//     await inventoryPage.selectOption('az');;


//     await expect(inventoryPage.allInventoryProducts.first()).toContainText(firstProduct);


// })


// test('Sort products alphabetically: Z to A', async ({ page }) => {

//     const firstProduct = 'Test.allTheThings() T-Shirt (Red';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     //await inventoryPage.clickonFilterOption();

//     await inventoryPage.selectOption('za');;


//     await expect(inventoryPage.allInventoryProducts.first()).toContainText(firstProduct);


// })



// test('Return from product details to Products page', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';


//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.OpenProductDetails(firstproduct);

//     await expect(page).toHaveURL(/inventory-item.html/);
//     await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();

//     await inventoryPage.backToProducts();
//     await expect(inventoryPage.pagetitile).toBeVisible();

// })



// test('Add a product from its details page', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';


//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.OpenProductDetails(firstproduct);

//     await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();

//     await inventoryPage.AddToCartFromDetailsPage();
//     await expect(inventoryPage.cartBadge).toHaveText('1');
//     await expect(inventoryPage.removeProductFromDetailsPage).toBeVisible();
//     await inventoryPage.backToProducts();
//     await expect(inventoryPage.pagetitile).toBeVisible();

// })


// test('Remove a product from its details page', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';


//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.OpenProductDetails(firstproduct);

//     await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();

//     await inventoryPage.AddToCartFromDetailsPage();
//     await expect(inventoryPage.cartBadge).toHaveText('1');
//     await expect(inventoryPage.removeProductFromDetailsPage).toBeVisible();
//     await inventoryPage.removeProductFromCartFromDetails();
//     await expect(inventoryPage.cartBadge).toBeHidden();
//     await expect(inventoryPage.addToCartFromDetailsPage).toBeVisible();
//     await inventoryPage.backToProducts();
//     await expect(inventoryPage.pagetitile).toBeVisible();

// })


// test('standard customer can add 2 product and   returning from Continue Shopping  ', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);

//     await inventoryPage.openCart();

//     await expect(inventoryPage.cartBadge).toHaveText('2');

//     await cartPage.ClickOnContinueOnShopping();

//     await expect(page).toHaveURL(/inventory.html/);
//     await expect(inventoryPage.pagetitile).toBeVisible();

// })


// test('Logout successfully', async ({ page }) => {

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await navigation.clickOnOpenMenu();

//     await navigation.clickOnLogout();

//     await expect(loginPage.loginButton).toBeVisible();

//     await expect(page).toHaveURL('https://www.saucedemo.com/')



// })

// test('Reset App State clears the cart', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';


//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await expect(inventoryPage.cartBadge).toHaveText('1');

//     await navigation.clickOnOpenMenu();

//     await navigation.clickOnRestAppState();

//     await expect(inventoryPage.cartBadge).toBeHidden();

//     await expect(
//         inventoryPage.productCard(firstproduct)
//             .getByRole('button', { name: /Remove/i })
//     ).toBeVisible();

// })


// test('Verify all inventory products display required details', async ({ page }) => {



//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await expect(inventoryPage.allInventoryProducts).toHaveCount(6);

//     const productCount = await inventoryPage.allInventoryProducts.count();

//     for (let index = 0; index < productCount; index++) {
//         const productCard = inventoryPage.allInventoryProducts.nth(index);
//         await expect(productCard.locator('.inventory_item_name')).toBeVisible();
//         await expect(productCard.locator('.inventory_item_price')).toBeVisible();
//         await expect(
//             productCard.getByRole('button', { name: 'Add to cart' })
//         ).toBeVisible();
//     }
// })



// test('Cart displays the correct price for the selected product ', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);


//     await inventoryPage.openCart();

//     await expect(inventoryPage.cartBadge).toHaveText('1');

//     await expect(cartPage.cartItem(firstproduct).locator('.inventory_item_price')).toContainText('$29.99')

// })



// test('Back Home after successful order', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);


//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await inventoryPage.verifyProductWasAdded(secondProduct);
//     await expect(inventoryPage.cartBadge).toHaveText('2');

//     await inventoryPage.openCart();

//     await cartPage.clickOnCheckOut();
//     await checkout.checkoutCustomerDetailsFilling('test', 'test', '53307');
//     await checkout.clickOncheckoutContinue();
//     await checkout.clickoncheckoutfinish()

//     await expect(checkout.orderCompltedMsg).toContainText('Thank you for your order!');

//     await expect(inventoryPage.cartBadge).toBeHidden();
//     await checkout.ReturnToHome();
//     await expect(inventoryPage.pagetitile).toBeVisible();
//     await expect(page).toHaveURL(/inventory.html/);
// })


// test('Product details show correct price and description', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';


//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.OpenProductDetails(firstproduct);

//     await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();
//     await expect(inventoryPage.productDetailsPrice).toHaveText('$29.99');
//     await expect(inventoryPage.productDetailsDesc).toContainText('carry.allTheThings()');


// })



// test('logged-out user cannot open Products page directly', async ({ page }) => {
//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await navigation.clickOnOpenMenu();
//     await navigation.clickOnLogout();

//     await expect(loginPage.loginButton).toBeVisible();

//     await page.goto('/inventory.html');

//     await expect(loginPage.loginButton).toBeVisible();
//     await expect(inventoryPage.pagetitile).toBeHidden();

//     await expect(page).toHaveURL('https://www.saucedemo.com/');
// });



// test('Removing from Cart restores “Add to cart” on Products page', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await expect(inventoryPage.cartBadge).toHaveText('1');

//     await inventoryPage.openCart();

//     await cartPage.removeProduct(firstproduct);

//     await expect(inventoryPage.cartBadge).toBeHidden();

//     await cartPage.ClickOnContinueOnShopping();

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await expect(
//         inventoryPage.productCard(firstproduct)
//             .getByRole('button', { name: 'Add to cart' })
//     ).toBeVisible();
// })



// test('Open product details from the Cart page', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await expect(inventoryPage.cartBadge).toHaveText('1');

//     await inventoryPage.openCart();

//     await  cartPage.openProductDetailsFromCart(firstproduct);

//     await expect(page).toHaveURL(/inventory-item.html/);
 
//      await expect(
//   page.getByText(firstproduct, { exact: true })
// ).toBeVisible();

// await expect(inventoryPage.productDetailsPrice).toHaveText('$29.99');
    
// })



// test('Cart state persists after sorting products', async ({ page }) => {


//     const firstproduct = 'Sauce Labs Onesie';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);


//     await inventoryPage.selectOption('lohi');;


//     await expect(inventoryPage.cartBadge).toHaveText('1');

// await expect(
//   inventoryPage.productCard(firstproduct)
//     .getByRole('button', { name: 'Remove' })
// ).toBeVisible();


// })


// test('Verify selected sorting option a-z to low to high', async ({ page }) => {


//     const firstproduct = 'Sauce Labs Onesie';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await expect(inventoryPage.filtterBtn).toHaveValue('az');

//     await inventoryPage.addProductToCart(firstproduct);


//     await inventoryPage.selectOption('lohi');
// await expect(inventoryPage.filtterBtn).toHaveValue('lohi');

// //await expect(inventoryPage.filtterBtn).toContainText('Price (low to high)');
//     await expect(inventoryPage.cartBadge).toHaveText('1');

// await expect(
//   inventoryPage.productCard(firstproduct)
//     .getByRole('button', { name: 'Remove' })
// ).toBeVisible();


// })


// test('Verify every product is sorted Low to High and  all product prices are ascending', async ({ page }) => {


    
//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.selectOption('lohi');
   
// const priceDetails = await inventoryPage.inventoryPriceDetails.allTextContents();

// const numericPrices = priceDetails.map(price =>
//   parseFloat(price.replace(/[^0-9.]/g, ''))
// );

// const sortedPrices = [...numericPrices].sort((a, b) => a - b);

// expect(numericPrices).toEqual(sortedPrices);


// })


// test('Verify every product is sorted az and  all product prices are ascending', async ({ page }) => {


    
//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.selectOption('az');
   
//     const productNames =
//   await inventoryPage.productNames.allTextContents();


// const sortedNames = [...productNames].sort((a, b) =>
//   a.localeCompare(b)
// );

// expect(productNames).toEqual(sortedNames);

// })


// test('Verify all menu options are visible', async ({ page }) => {

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await navigation.clickOnOpenMenu();

//     await expect(navigation.menuOptions).toHaveText(['All Items',
//     'About','Logout','Reset App State']);

//     await navigation.clickOnCloseMenu();



// })

// test(' Open Backpack details → Open Menu → Click All Items All Items menu returns to Products page', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Onesie';
    
//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.OpenProductDetails(firstproduct);

//      await navigation.clickOnOpenMenu();

//      await expect(navigation.menuOptions).toHaveText(['All Items',
//      'About','Logout','Reset App State']);

//      await navigation.clickOnCloseMenu();


// })


// test(' About menu link has the correct destination', async ({ page }) => {

    
    
//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//      await navigation.clickOnOpenMenu();

//      await expect(navigation.btnAbout).toHaveAttribute(
//   'href',
//   'https://saucelabs.com/'
// );

//     //await navigation.clickOnAbout();

//     //await expect(page).toHaveURL('https://saucelabs.com/')


// })


// test('Checkout Overview shows payment and shipping information.', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';


//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);


//     await inventoryPage.verifyProductWasAdded(firstproduct);
//     await expect(inventoryPage.cartBadge).toHaveText('1');

//     await inventoryPage.openCart();

//     await cartPage.clickOnCheckOut();
//     await checkout.checkoutCustomerDetailsFilling('test', 'test', '53306');
//     await checkout.clickOncheckoutContinue()
//     await checkout.checkoutSummary(firstproduct);
//     await expect(checkout.paymentInfo).toBeVisible();

// await expect(checkout.shippingInfo).toBeVisible();


// })


// test.only('Checkout item total equals sum of selected product prices', async ({ page }) => {

//     const firstproduct = 'Sauce Labs Backpack';
//     const secondProduct = 'Sauce Labs Bike Light';

//     await loginPage.Visit();

//     await loginPage.login('standard_user', 'secret_sauce');

//     await expect(inventoryPage.pagetitile).toBeVisible();

//     await inventoryPage.addProductToCart(firstproduct);

//     await inventoryPage.addProductToCart(secondProduct);

//     await inventoryPage.openCart();

//     await expect(inventoryPage.cartBadge).toHaveText('2');

//      await cartPage.clickOnCheckOut();

//     await checkout.checkoutCustomerDetailsFilling('test', 'test', '53307');

//     await checkout.clickOncheckoutContinue();
   
// const priceTexts =
//   await checkout.inventoryCheckoutProductPrice.allTextContents();

// const numericPrices = priceTexts.map(price =>
//   parseFloat(price.replace(/[^0-9.]/g, ''))
// );

// const calculatedTotal = numericPrices.reduce(
//   (sum, price) => sum + price,
//   0
// );

// console.log("calculatedTotal:",calculatedTotal)

// const subtotalText = await checkout.subTotal.innerText();

// const displayedItemTotal = parseFloat(
//   subtotalText.replace(/[^0-9.]/g, '')
// );

// console.log("displayedItemTotal:",calculatedTotal)
// expect(calculatedTotal).toBeCloseTo(displayedItemTotal, 2);

// })