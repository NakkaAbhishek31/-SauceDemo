
import { LoginPage } from '../Src/Pages/LoginPages';
import { InventoryPage } from '../Src/Pages/InventoryPages';
import { CartPage } from '../Src/Pages/cartPage';
import { CheckoutPage } from '../Src/Pages/CheckoutPage';
import { NavigationPage } from '../Src/Pages/NavigationPage.ts';
import {
  test,
  expect,
} from './fixtures.ts'

test('filling the checkout customer details . and ordering produt  ', async ({ loginPage, inventoryPage,cartPage,checkout }) => {

    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.addProductToCart(secondProduct);


    await inventoryPage.verifyProductWasAdded(firstproduct);
    await inventoryPage.verifyProductWasAdded(secondProduct);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();

    await cartPage.clickOnCheckOut();
    await checkout.checkoutCustomerDetailsFilling('test', 'test', '53307');
    await checkout.clickOncheckoutContinue();
    await checkout.clickoncheckoutfinish()

    await expect(checkout.orderCompltedMsg).toContainText('Thank you for your order!');
})


test('First Name is required during checkout.', async ({ loginPage, inventoryPage,cartPage,checkout }) => {

    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.addProductToCart(secondProduct);


    await inventoryPage.verifyProductWasAdded(firstproduct);
    await inventoryPage.verifyProductWasAdded(secondProduct);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();

    await cartPage.clickOnCheckOut();
    await checkout.checkoutCustomerDetailsFilling('', 'test', '53307');
    await checkout.clickOncheckoutContinue();
    await expect(checkout.errorMsg).toContainText('Error: First Name is required');

})


test('Last Name is required during checkout.', async ({ loginPage, inventoryPage,cartPage,checkout }) => {

    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.addProductToCart(secondProduct);


    await inventoryPage.verifyProductWasAdded(firstproduct);
    await inventoryPage.verifyProductWasAdded(secondProduct);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();

    await cartPage.clickOnCheckOut();
    await checkout.checkoutCustomerDetailsFilling('test', '', '53307');
    await checkout.clickOncheckoutContinue();
    await expect(checkout.errorMsg).toContainText('Error: Last Name is required');

})

test('Postalcode is required during checkout.', async ({ loginPage, inventoryPage,cartPage,checkout }) => {

    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.addProductToCart(secondProduct);


    await inventoryPage.verifyProductWasAdded(firstproduct);
    await inventoryPage.verifyProductWasAdded(secondProduct);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();

    await cartPage.clickOnCheckOut();
    await checkout.checkoutCustomerDetailsFilling('test', 'test', '');
    await checkout.clickOncheckoutContinue();
    await expect(checkout.errorMsg).toContainText('Error: Postal Code is required');

})


test('customer cancels checkout and returns to the Cart page.', async ({ page ,loginPage, inventoryPage,cartPage,checkout}) => {

    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.addProductToCart(secondProduct);


    await inventoryPage.verifyProductWasAdded(firstproduct);
    await inventoryPage.verifyProductWasAdded(secondProduct);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();

    await cartPage.clickOnCheckOut();
    await checkout.clickOnCheckoutCancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
    await expect(cartPage.cartItem(firstproduct)).toBeVisible();
    await expect(cartPage.cartItem(secondProduct)).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('2');

})


test('Checkout Overview shows the selected product before order completion.', async ({ loginPage, inventoryPage,cartPage,checkout }) => {

    const firstproduct = 'Sauce Labs Backpack';


    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);


    await inventoryPage.verifyProductWasAdded(firstproduct);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await cartPage.clickOnCheckOut();
    await checkout.checkoutCustomerDetailsFilling('test', 'test', '53306');
    await checkout.clickOncheckoutContinue()
    await checkout.checkoutSummary(firstproduct);

    const total = await checkout.checkoutTotal.innerText();
    console.log(`Checkout total: ${total}`);

    await expect(checkout.checkoutTotal).toBeVisible();


})


test('verify checkout price totals for two products', async ({ loginPage, inventoryPage,cartPage,checkout }) => {
    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.addProductToCart(secondProduct);


    await inventoryPage.verifyProductWasAdded(firstproduct);
    await inventoryPage.verifyProductWasAdded(secondProduct);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();

    await cartPage.clickOnCheckOut();
    await checkout.checkoutCustomerDetailsFilling('test', 'test', '53306');
    await checkout.clickOncheckoutContinue()
    await expect(checkout.checkoutSummary(firstproduct)).toBeVisible();
    await expect(checkout.checkoutSummary(secondProduct)).toBeVisible();
    await expect(checkout.checkoutSummary(firstproduct)).toContainText('$29.99');
    await expect(checkout.checkoutSummary(secondProduct)).toContainText('$9.99');
    await expect(checkout.subTotal).toHaveText('Item total: $39.98');
    await expect(checkout.tax).toHaveText('Tax: $3.20');
    await expect(checkout.checkoutTotal).toHaveText('Total: $43.18');

})



test('Back Home after successful order', async ({ page ,loginPage, inventoryPage,cartPage,checkout}) => {

    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.addProductToCart(secondProduct);


    await inventoryPage.verifyProductWasAdded(firstproduct);
    await inventoryPage.verifyProductWasAdded(secondProduct);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();

    await cartPage.clickOnCheckOut();
    await checkout.checkoutCustomerDetailsFilling('test', 'test', '53307');
    await checkout.clickOncheckoutContinue();
    await checkout.clickoncheckoutfinish()

    await expect(checkout.orderCompltedMsg).toContainText('Thank you for your order!');

    await expect(inventoryPage.cartBadge).toBeHidden();
    await checkout.ReturnToHome();
    await expect(inventoryPage.pagetitile).toBeVisible();
    await expect(page).toHaveURL(/inventory.html/);
})


test('Checkout Overview shows payment and shipping information.', async ({ loginPage, inventoryPage,cartPage,checkout}) => {

    const firstproduct = 'Sauce Labs Backpack';


    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);


    await inventoryPage.verifyProductWasAdded(firstproduct);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await cartPage.clickOnCheckOut();
    await checkout.checkoutCustomerDetailsFilling('test', 'test', '53306');
    await checkout.clickOncheckoutContinue()
    await checkout.checkoutSummary(firstproduct);
    await expect(checkout.paymentInfo).toBeVisible();

})


test('Checkout item total equals sum of selected product prices', async ({ loginPage, inventoryPage,cartPage,checkout }) => {

    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.addProductToCart(secondProduct);

    await inventoryPage.openCart();

    await expect(inventoryPage.cartBadge).toHaveText('2');

     await cartPage.clickOnCheckOut();

    await checkout.checkoutCustomerDetailsFilling('test', 'test', '53307');

    await checkout.clickOncheckoutContinue();
   
const priceTexts =
  await checkout.inventoryCheckoutProductPrice.allTextContents();

const numericPrices = priceTexts.map(price =>
  parseFloat(price.replace(/[^0-9.]/g, ''))
);

const calculatedTotal = numericPrices.reduce(
  (sum, price) => sum + price,
  0
);

console.log("calculatedTotal:",calculatedTotal)

const subtotalText = await checkout.subTotal.innerText();

const displayedItemTotal = parseFloat(
  subtotalText.replace(/[^0-9.]/g, '')
);

console.log("displayedItemTotal:",calculatedTotal)
expect(calculatedTotal).toBeCloseTo(displayedItemTotal, 2);

})