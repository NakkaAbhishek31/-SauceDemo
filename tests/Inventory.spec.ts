
import { LoginPage } from '../Src/Pages/LoginPages';
import { InventoryPage } from '../Src/Pages/InventoryPages';
import { CartPage } from '../Src/Pages/cartPage';
import { CheckoutPage } from '../Src/Pages/CheckoutPage';
import { NavigationPage } from '../Src/Pages/NavigationPage.ts';
import {
  test,
  expect,
} from './fixtures.ts'

test('standard customer can add the product to cart ', async ({ loginPage, inventoryPage }) => {
    const product = 'Sauce Labs Backpack';
    await loginPage.Visit();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.pagetitile).toBeVisible();
    await inventoryPage.addProductToCart(product);
    await expect(inventoryPage.cartBadge).toHaveText('1');

})


test('standard customer can add the  2  diff product to cart ', async ({ loginPage, inventoryPage, }) => {

    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);

    await inventoryPage.addProductToCart(secondProduct);

    await expect(inventoryPage.cartBadge).toHaveText('2');

})


test('standard customer can remove  from the Product Page ', async ({ loginPage, inventoryPage,cartPage,}) => {

    const product = 'Sauce Labs Backpack';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(product);

    await cartPage.removeProductFromPage(product);


})


test('verify Sort products by price — Low to High', async ({ loginPage, inventoryPage,}) => {


    const firstproduct = 'Sauce Labs Onesie';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    //await inventoryPage.clickonFilterOption();

    await inventoryPage.selectOption('lohi');;


    await expect(inventoryPage.allInventoryProducts.first()).toContainText(firstproduct);


})



test('Sort products by price: High to Low', async ({ loginPage, inventoryPage }) => {
    const firstproduct = 'Sauce Labs Fleece Jacket';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    //await inventoryPage.clickonFilterOption();

    await inventoryPage.selectOption('hilo');;


    await expect(inventoryPage.allInventoryProducts.first()).toContainText(firstproduct);


})

test('Sort products alphabetically: A to Z', async ({ page,loginPage}) => {

    const inventoryPage = new InventoryPage(page);

    const firstProduct = 'Sauce Labs Backpack';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    //await inventoryPage.clickonFilterOption();

    await inventoryPage.selectOption('az');;


    await expect(inventoryPage.allInventoryProducts.first()).toContainText(firstProduct);


})


test('Sort products alphabetically: Z to A', async ({ loginPage, inventoryPage }) => {

    const firstProduct = 'Test.allTheThings() T-Shirt (Red';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    //await inventoryPage.clickonFilterOption();

    await inventoryPage.selectOption('za');;


    await expect(inventoryPage.allInventoryProducts.first()).toContainText(firstProduct);


})



test('Return from product details to Products page', async ({ page,loginPage, inventoryPage }) => {

    const firstproduct = 'Sauce Labs Backpack';


    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.OpenProductDetails(firstproduct);

    await expect(page).toHaveURL(/inventory-item.html/);
    await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();

    await inventoryPage.backToProducts();
    await expect(inventoryPage.pagetitile).toBeVisible();

})



test('Add a product from its details page', async ({ page,loginPage, inventoryPage }) => {

    const firstproduct = 'Sauce Labs Backpack';


    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.OpenProductDetails(firstproduct);

    await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();

    await inventoryPage.AddToCartFromDetailsPage();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.removeProductFromDetailsPage).toBeVisible();
    await inventoryPage.backToProducts();
    await expect(inventoryPage.pagetitile).toBeVisible();

})


test('Remove a product from its details page', async ({ loginPage, inventoryPage,page }) => {

    const firstproduct = 'Sauce Labs Backpack';


    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.OpenProductDetails(firstproduct);

    await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();

    await inventoryPage.AddToCartFromDetailsPage();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.removeProductFromDetailsPage).toBeVisible();
    await inventoryPage.removeProductFromCartFromDetails();
    await expect(inventoryPage.cartBadge).toBeHidden();
    await expect(inventoryPage.addToCartFromDetailsPage).toBeVisible();
    await inventoryPage.backToProducts();
    await expect(inventoryPage.pagetitile).toBeVisible();

})


test('Verify all inventory products display required details', async ({ loginPage, inventoryPage }) => {



    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await expect(inventoryPage.allInventoryProducts).toHaveCount(6);

    const productCount = await inventoryPage.allInventoryProducts.count();

    for (let index = 0; index < productCount; index++) {
        const productCard = inventoryPage.allInventoryProducts.nth(index);
        await expect(productCard.locator('.inventory_item_name')).toBeVisible();
        await expect(productCard.locator('.inventory_item_price')).toBeVisible();
        await expect(
            productCard.getByRole('button', { name: 'Add to cart' })
        ).toBeVisible();
    }
})



test('Product details show correct price and description', async ({ page,loginPage, inventoryPage}) => {

    const firstproduct = 'Sauce Labs Backpack';


    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.OpenProductDetails(firstproduct);

    await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();
    await expect(inventoryPage.productDetailsPrice).toHaveText('$29.99');
    await expect(inventoryPage.productDetailsDesc).toContainText('carry.allTheThings()');


})



test('Cart state persists after sorting products', async ({ loginPage, inventoryPage }) => {


    const firstproduct = 'Sauce Labs Onesie';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.addProductToCart(firstproduct);


    await inventoryPage.selectOption('lohi');;


    await expect(inventoryPage.cartBadge).toHaveText('1');

await expect(
  inventoryPage.productCard(firstproduct)
    .getByRole('button', { name: 'Remove' })
).toBeVisible();


})


test('Verify selected sorting option a-z to low to high', async ({ loginPage, inventoryPage }) => {


    const firstproduct = 'Sauce Labs Onesie';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await expect(inventoryPage.filtterBtn).toHaveValue('az');

    await inventoryPage.addProductToCart(firstproduct);


    await inventoryPage.selectOption('lohi');
await expect(inventoryPage.filtterBtn).toHaveValue('lohi');

//await expect(inventoryPage.filtterBtn).toContainText('Price (low to high)');
    await expect(inventoryPage.cartBadge).toHaveText('1');

await expect(
  inventoryPage.productCard(firstproduct)
    .getByRole('button', { name: 'Remove' })
).toBeVisible();


})


test('Verify every product is sorted Low to High and  all product prices are ascending', async ({ loginPage, inventoryPage }) => {


    
    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.selectOption('lohi');
   
const priceDetails = await inventoryPage.inventoryPriceDetails.allTextContents();

const numericPrices = priceDetails.map(price =>
  parseFloat(price.replace(/[^0-9.]/g, ''))
);

const sortedPrices = [...numericPrices].sort((a, b) => a - b);

expect(numericPrices).toEqual(sortedPrices);


})


test('Verify every product is sorted az and  all product prices are ascending', async ({loginPage, inventoryPage }) => {


    
    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await inventoryPage.selectOption('az');
   
    const productNames =
  await inventoryPage.productNames.allTextContents();


const sortedNames = [...productNames].sort((a, b) =>
  a.localeCompare(b)
);

expect(productNames).toEqual(sortedNames);

})

test('Verify every inventory product image is visible and has matching alt text',
  async ({ loginPage, inventoryPage }) => {
    await loginPage.Visit();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    await expect(inventoryPage.inventoryImages).toHaveCount(6);

    const productNames = await inventoryPage.productNames.allTextContents();

    for (const [index, productName] of productNames.entries()) {
      const productImage = inventoryPage.inventoryImages.nth(index);

      await expect(productImage).toBeVisible();
      await expect(productImage).toHaveAttribute('alt', productName);
    }
  }
);


test('Verify every product opens its correct product-details page',
  async ({ page, loginPage, inventoryPage }) => {
    await loginPage.Visit();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.pagetitile).toBeVisible();
    const productNames = await inventoryPage.productNames.allTextContents();
    for(const productName of productNames )
    {
       await inventoryPage.OpenProductDetails(productName);
       await expect(inventoryPage.productDetailsName).toHaveText(productName);
       await inventoryPage.backToProducts();
       await expect(inventoryPage.pagetitile).toBeVisible();
    }


  });


  test('Adding one product changes only that product button to Remove ', async ({page, loginPage, inventoryPage, }) => {

    const firstproduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bike Light';
    await loginPage.Visit();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.pagetitile).toBeVisible();
    await inventoryPage.addProductToCart(firstproduct);
    await expect(inventoryPage.productCard(firstproduct).getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(inventoryPage.productCard(secondProduct).getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');

})


test('Product description remains the same from Products page to Details page', async ({ page,loginPage, inventoryPage}) => {

    const firstproduct = 'Sauce Labs Backpack';


    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

     const inventoryDescription =
      await inventoryPage.productDescription(firstproduct).innerText();

    await inventoryPage.OpenProductDetails(firstproduct);

    await expect(inventoryPage.productDetailsDesc).toHaveText(inventoryDescription);
  


})


//bug
test('Selected sorting option is retained after returning from product details', async ({ page,loginPage, inventoryPage,}) => {


    const firstproduct = 'Sauce Labs Onesie';

    await loginPage.Visit();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pagetitile).toBeVisible();

    //await inventoryPage.clickonFilterOption();

    await inventoryPage.selectOption('lohi');;


    await expect(inventoryPage.allInventoryProducts.first()).toContainText(firstproduct);

    await inventoryPage.OpenProductDetails(firstproduct);

await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();

await inventoryPage.backToProducts();

await expect(inventoryPage.pagetitile).toBeVisible();

await expect(inventoryPage.filtterBtn).toHaveValue('lohi');

await expect(inventoryPage.productNames.first())
  .toHaveText('Sauce Labs Onesie');
})


test('Cart combines products added from Products page and Details page', async ({ page,loginPage, inventoryPage }) => {

    const firstproduct = 'Sauce Labs Backpack';
    const  secondProduct = 'Sauce Labs Bike Light';
    await loginPage.Visit();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProductToCart(secondProduct);
    await expect(inventoryPage.pagetitile).toBeVisible();
    await inventoryPage.OpenProductDetails(firstproduct);
    await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();
    await inventoryPage.AddToCartFromDetailsPage();
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await inventoryPage.backToProducts();
    await expect(inventoryPage.pagetitile).toBeVisible();
})

test('Product added from Details page shows Remove button on Products page', async ({ loginPage, inventoryPage,page }) => {

    const firstproduct = 'Sauce Labs Backpack';
    await loginPage.Visit();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.pagetitile).toBeVisible();
    await inventoryPage.OpenProductDetails(firstproduct);
    await inventoryPage.AddToCartFromDetailsPage();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.backToProducts();
    await expect(inventoryPage.pagetitile).toBeVisible();
   await expect(page.getByText(firstproduct, { exact: true })).toBeVisible();
   await expect(
  inventoryPage.productCard(firstproduct)
    .getByRole('button', { name: 'Remove' })
).toBeVisible();

})