
import { LoginPage } from '../Src/Pages/LoginPages';
import { InventoryPage } from '../Src/Pages/InventoryPages';
import { CartPage } from '../Src/Pages/cartPage';
import { CheckoutPage } from '../Src/Pages/CheckoutPage';
import { NavigationPage } from '../Src/Pages/NavigationPage.ts';
import {
  test,expect,
} from './fixtures.ts'

test('customer can add and remove a product from the cart ', async ({ loginPage, inventoryPage,cartPage}) => {


    const product = 'Sauce Labs Backpack';
    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');



    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(product);

    await inventoryPage.verifyProductWasAdded(product);
    await expect(inventoryPage.cartBadge).toHaveText('1');


    await inventoryPage.openCart();

    await cartPage.verifyProductExists(product);

    await cartPage.removeProduct(product);

});



test('standard customer can add 2 product and  removing one product  from the cart and  verify  other product  avalible in  cart ', async ({loginPage, inventoryPage,cartPage}) => {

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

    await cartPage.removeProduct(firstproduct);

    await expect(inventoryPage.cartBadge).toHaveText('1');

});



test('standard customer can add 2 product and   returning from Continue Shopping  ', async ({ page,loginPage, inventoryPage,cartPage }) => {

    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.addProductToCart(secondProduct);

    await inventoryPage.openCart();

    await expect(inventoryPage.cartBadge).toHaveText('2');

    await cartPage.ClickOnContinueOnShopping();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(inventoryPage.pagetitile).toBeVisible();

});


test('Cart displays the correct price for the selected product ', async ({ loginPage, inventoryPage,cartPage }) => {

    const firstproduct = 'Sauce Labs Backpack';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);


    await inventoryPage.openCart();

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await expect(cartPage.cartItem(firstproduct).locator('.inventory_item_price')).toContainText('$29.99')

});



test('Removing from Cart restores “Add to cart” on Products page', async ({ page, loginPage, inventoryPage,cartPage}) => {

    const firstproduct = 'Sauce Labs Backpack';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.verifyProductWasAdded(firstproduct);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await cartPage.removeProduct(firstproduct);

    await expect(inventoryPage.cartBadge).toBeHidden();

    await cartPage.ClickOnContinueOnShopping();

    await expect(inventoryPage.pagetitile).toBeVisible();

    await expect(
        inventoryPage.productCard(firstproduct)
            .getByRole('button', { name: 'Add to cart' })
    ).toBeVisible();
});



test('Open product details from the Cart page', async ({ page, loginPage, inventoryPage,cartPage}) => {

    const firstproduct = 'Sauce Labs Backpack';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.verifyProductWasAdded(firstproduct);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await  cartPage.openProductDetailsFromCart(firstproduct);

    await expect(page).toHaveURL(/inventory-item.html/);
 
     await expect(
  page.getByText(firstproduct, { exact: true })
).toBeVisible();

await expect(inventoryPage.productDetailsPrice).toHaveText('$29.99');
    
});




