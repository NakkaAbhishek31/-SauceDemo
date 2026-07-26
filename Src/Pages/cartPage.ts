import { expect, Expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    readonly checkButton: Locator;
    readonly btnCheckout: Locator
    readonly btnContinueShopping:Locator;
    readonly item_price:Locator;
     readonly cartItems:Locator;
     readonly cartProductName:Locator

    constructor(page: Page) {
        super(page);
        this.checkButton = page.getByRole('button', { name: 'Checkout' });
        this.btnCheckout = page.locator('[data-test="checkout"]');
         this.btnContinueShopping=page.locator('[data-test="continue-shopping"]');
         this.item_price=page.locator('[data-test="inventory-item-price"]');
          this.cartItems=page.locator('.cart_item');
          this.cartProductName=page.locator('[data-test="inventory-item-name"]');

    }

    cartItem(productName: string): Locator {
        return this.page.locator('.cart_item').filter({
            hasText: productName

        });

    }


    pageItem(productName: string): Locator {
        return this.page.locator('.inventory_container').filter({
            hasText: productName

        });

    }



    async verifyProductExists(productName: string): Promise<void> {
        await expect(this.cartItem(productName)).toBeVisible;
    }

    async removeProduct(productName: string): Promise<void> {
        const product = this.cartItem(productName);
        await product.getByRole('button', { name: 'Remove' }).click();
    }


    async removeProductFromPage(productName: string): Promise<void> {
        const product = this.pageItem(productName);
        await product.getByRole('button', { name: 'Remove' }).click();
    }

    async clickOnCheckOut(): Promise<void> {
        await this.btnCheckout.click();
    }


    async ClickOnContinueOnShopping():Promise<void>
{
  await this.btnContinueShopping.click()
}

 async openProductDetailsFromCart(productName: string): Promise<void> {
  await this.cartItem(productName)
    .locator('.inventory_item_name')
    .click();
}

cartItemPrice(productName: string): Locator {
  return this.cartItem(productName).locator('.inventory_item_price');
}


}