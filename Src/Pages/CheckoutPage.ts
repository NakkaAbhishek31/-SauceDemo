import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class CheckoutPage extends BasePage {

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly btnContinue: Locator;
    readonly btnFinish: Locator;
    readonly orderCompltedMsg: Locator
    readonly errorMsg: Locator;
    readonly btncancel: Locator;
    readonly checkoutsummary:Locator;
    readonly checkoutTotal:Locator;
    readonly  subTotal:Locator;
    readonly tax:Locator;
    readonly btnBackHome:Locator;
readonly paymentInfo :Locator;
readonly shippingInfo :Locator;
 readonly inventoryCheckoutProductPrice:Locator;
    constructor(page: Page) {
        super(page)

        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.btnContinue = page.locator('input[name="continue"]')
        this.btnFinish = page.locator('[data-test="finish"]');
        this.orderCompltedMsg = page.getByText('Thank you for your order!', { exact: true });
        this.errorMsg = page.locator('div.error-message-container.error');
        this.btncancel = page.locator('button:has-text("Cancel")');
        this.checkoutsummary=page.locator('#checkout_summary_container');
        this.checkoutTotal=page.locator('[data-test="total-label"]');
        this.subTotal=page.locator('[data-test="subtotal-label"]');
        this.tax= page.locator('[data-test="tax-label"]');
        this.btnBackHome=page.locator('[data-test="back-to-products"]');
        this.paymentInfo = this.page.getByText(
  'SauceCard #31337',
  { exact: true }
);

  this.shippingInfo = this.page.getByText(
  'FREE PONY EXPRESS DELIVERY!',
  { exact: true }
);

this.inventoryCheckoutProductPrice=page.locator('.inventory_item_price')
    }

    async checkoutCustomerDetailsFilling(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);

    }


    async clickOncheckoutContinue(): Promise<void> {
        await this.btnContinue.click()
    }

    async clickoncheckoutfinish(): Promise<void> {
        await this.btnFinish.click();
    }

    async clickOnCheckoutCancel():Promise<void>
    {
        await this.btncancel.click()

    }

      checkoutSummary(productName: string): Locator {
    return this.checkoutsummary.filter({
      hasText: productName
    });
  }

  async ReturnToHome():Promise<void>
  {
         await this.btnBackHome.click()
  }

}