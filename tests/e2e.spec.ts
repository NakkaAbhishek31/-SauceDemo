import { LoginPage } from "../Src/Pages/LoginPages";
import {
    test,
    expect,
} from './fixtures.ts'

test('Selected product price remains the same on Products, Cart, and Checkout Overview pages', async ({ page, loginPage, inventoryPage, cartPage, checkout }) => {

    const firstproduct = 'Sauce Labs Backpack';
    await loginPage.Visit();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.pagetitile).toBeVisible();
    await inventoryPage.addProductToCart(firstproduct);
    await inventoryPage.verifyProductWasAdded(firstproduct);
    const inventoryProductPriceText = await inventoryPage.productPrice(firstproduct).innerText();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.openCart();
    await expect(cartPage.cartItemPrice(firstproduct)).toContainText(inventoryProductPriceText);
    await cartPage.clickOnCheckOut();
    await checkout.checkoutCustomerDetailsFilling('test', 'test', '53307');
    await checkout.clickOncheckoutContinue();
    await expect(checkout.checkoutItemPrice(firstproduct)).toContainText(inventoryProductPriceText);
    await checkout.clickoncheckoutfinish()
    await expect(checkout.orderCompltedMsg).toContainText('Thank you for your order!');
    await expect(inventoryPage.cartBadge).toBeHidden();
    await checkout.ReturnToHome();
    await expect(inventoryPage.pagetitile).toBeVisible();
    await expect(page).toHaveURL(/inventory.html/);
})
