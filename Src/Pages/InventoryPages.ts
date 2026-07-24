import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {

  readonly pagetitile: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly filtterBtn:Locator;
  readonly allInventoryProducts:Locator;
  readonly addToCartFromDetailsPage:Locator;
  readonly removeProductFromDetailsPage:Locator;
  readonly productDetailsPrice:Locator;
  readonly productDetailsDesc:Locator;
   readonly inventoryPriceDetails:Locator;
   readonly productNames :Locator
   
  constructor(page: Page) {
    super(page);
    this.pagetitile = page.getByText('Products', { exact: true });
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.filtterBtn=page.locator('[data-test="product-sort-container"]');
    this.allInventoryProducts=page.locator('.inventory_item');
    this.addToCartFromDetailsPage=page.locator('[data-test="add-to-cart"]');
    this.removeProductFromDetailsPage=page.locator('[data-test="remove"]');
    this.productDetailsPrice = this.page.locator('.inventory_details_price');
    this.productDetailsDesc=page.locator('div.inventory_details_desc.large_size:visible');
    this.inventoryPriceDetails= page.locator('[data-test="inventory-item-price"]');
    this.productNames = this.page.locator('.inventory_item_name');
   
  }

  productCard(productName: string): Locator {
    return this.page.locator('.inventory_item').filter({
      hasText: productName
    });
  }


  async addProductToCart(productName: string): Promise<void> {
    const product = this.productCard(productName);

    await expect(product).toBeVisible();
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async verifyProductWasAdded(productName: string): Promise<void> {
    const product = this.productCard(productName);
    await expect(product.getByRole('button', { name: 'Remove' })).toBeVisible();
  }


  async openCart(): Promise<void> {
    await this.cartLink.click();
  }


//   async  clickonFilterOption():Promise<void>
// {
 
//    this.filtterBtn.click();
  
// }

//  filterOption(FilterOption:string):Locator
// {
//  return this.page.locator('[data-test="product-sort-container"]').filter({
//   hasText:FilterOption
//  });

// }

async selectOption(option: string): Promise<void> {
  await this.page
    .locator('[data-test="product-sort-container"]')
    .selectOption(option);
}


async OpenProductDetails(productName: string): Promise<void> {
  await this.productCard(productName)
    .locator('.inventory_item_name')
    .click();
}


async backToProducts(): Promise<void> {
  await this.page.locator('[data-test="back-to-products"]').click();
}


async AddToCartFromDetailsPage():Promise<void>
{
  await this.addToCartFromDetailsPage.click()
}

async removeProductFromCartFromDetails():Promise<void>
{
  await this.removeProductFromDetailsPage.click()
}



}
