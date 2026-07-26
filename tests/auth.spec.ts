import { LoginPage } from "../Src/Pages/LoginPages";
import { InventoryPage } from "../Src/Pages/InventoryPages";
import { CartPage } from "../Src/Pages/cartPage";
import { CheckoutPage } from "../Src/Pages/CheckoutPage";
import { NavigationPage } from "../Src/Pages/NavigationPage.ts";
import { test, expect } from "./fixtures.ts";

test("locked user sees a login error", async ({ loginPage }) => {
  await loginPage.Visit();
  await loginPage.login("locked_out_user", "secret_sauce");
  await expect(loginPage.errorMessage).toContainText("locked out");
});

test(" username and password requried ", async ({ loginPage }) => {
  await loginPage.Visit();
  await loginPage.login("", "");
  await expect(loginPage.errorMessage).toContainText("Username is required");
  await loginPage.login("standard_user", "");
  await expect(loginPage.errorMessage).toContainText("Password is required");
  // await expect(loginPage.errorMessage).toContainText('Epic sadface: Password is required')
});

test(" User can close the login error message ", async ({ loginPage }) => {
  await loginPage.Visit();
  await loginPage.login("standard_user", "secret_saucee");
  await expect(loginPage.errorMessage).toContainText(
    "Epic sadface: Username and password do not match any user in this service",
  );
  await loginPage.errorMessageClose();
  await expect(loginPage.errorMessage).toBeHidden();
  // await loginPage.login('standard_user', '');
  // await expect(loginPage.errorMessage).toContainText('Password is required');
  // await expect(loginPage.errorMessage).toContainText('Epic sadface: Password is required')
});


test(" Valid username with invalid password shows login error ", async ({ loginPage }) => {
  await loginPage.Visit();
  await loginPage.login("standard_user", "secret_saucee");

  await expect(loginPage.errorMessage).toContainText("Epic sadface: Username and password do not match any user in this service");
});