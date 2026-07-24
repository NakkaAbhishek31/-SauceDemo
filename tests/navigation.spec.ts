
import { LoginPage } from '../Src/Pages/LoginPages';
import { InventoryPage } from '../Src/Pages/InventoryPages';
import { CartPage } from '../Src/Pages/cartPage';
import { CheckoutPage } from '../Src/Pages/CheckoutPage';
import { NavigationPage } from '../Src/Pages/NavigationPage.ts';

import {
  test,
  expect,
} from './fixtures.ts'

test('Logout successfully', async ({ page,loginPage, inventoryPage,navigation }) => {

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await navigation.clickOnOpenMenu();

    await navigation.clickOnLogout();

    await expect(loginPage.loginButton).toBeVisible();

    await expect(page).toHaveURL('https://www.saucedemo.com/')



});


test('Reset App State clears the cart', async ({ page,loginPage, inventoryPage,navigation }) => {

    const firstproduct = 'Sauce Labs Backpack';


    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await navigation.clickOnOpenMenu();

    await navigation.clickOnRestAppState();

    await expect(inventoryPage.cartBadge).toBeHidden();

    await expect(
        inventoryPage.productCard(firstproduct)
            .getByRole('button', { name: /Remove/i })
    ).toBeVisible();

});



test('logged-out user cannot open Products page directly', async ({ page,loginPage, inventoryPage,navigation }) => {
    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await navigation.clickOnOpenMenu();
    await navigation.clickOnLogout();

    await expect(loginPage.loginButton).toBeVisible();

    await page.goto('/inventory.html');

    await expect(loginPage.loginButton).toBeVisible();
    await expect(inventoryPage.pagetitile).toBeHidden();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('Verify all menu options are visible', async ({ loginPage, inventoryPage,navigation }) => {

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await navigation.clickOnOpenMenu();

    await expect(navigation.menuOptions).toHaveText(['All Items',
    'About','Logout','Reset App State']);

    await navigation.clickOnCloseMenu();



});


test(' About menu link has the correct destination', async ({ loginPage, inventoryPage,navigation }) => {

    
    
    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

     await navigation.clickOnOpenMenu();

     await expect(navigation.btnAbout).toHaveAttribute(
  'href',
  'https://saucelabs.com/'
);

    //await navigation.clickOnAbout();

    //await expect(page).toHaveURL('https://saucelabs.com/')


})


test(' Open Backpack details → Open Menu → Click All Items All Items menu returns to Products page', async ({ loginPage, inventoryPage,navigation }) => {

    const firstproduct = 'Sauce Labs Onesie';
    
    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.OpenProductDetails(firstproduct);

     await navigation.clickOnOpenMenu();

     await expect(navigation.menuOptions).toHaveText(['All Items',
     'About','Logout','Reset App State']);

     await navigation.clickOnCloseMenu();


})
