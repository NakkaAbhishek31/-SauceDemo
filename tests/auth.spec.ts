import { test, expect } from "./fixtures";

import loginData from "../test-data/login.data.json";

test("TC_LOGIN_001 - Locked user should see a login error @negative @login @regression", async ({
  loginPage,
}) => {
  const data = loginData.TC_LOGIN_001;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(loginPage.errorMessage).toContainText(data.expectedError);
});

test("TC_LOGIN_002 - Username and password required validations should appear @negative @validation @regression", async ({
  loginPage,
}) => {
  const data = loginData.TC_LOGIN_002;

  await loginPage.Visit();

  // Empty username and password.
  await loginPage.login(
    data.emptyCredentials.username,
    data.emptyCredentials.password,
  );

  await expect(loginPage.errorMessage).toContainText(
    data.emptyCredentials.expectedError,
  );

  // Valid username with empty password.
  await loginPage.login(
    data.emptyPassword.username,
    data.emptyPassword.password,
  );

  await expect(loginPage.errorMessage).toContainText(
    data.emptyPassword.expectedError,
  );
});

test("TC_LOGIN_003 - User should close the login error message @negative @ui @regression", async ({
  loginPage,
}) => {
  const data = loginData.TC_LOGIN_003;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(loginPage.errorMessage).toContainText(data.expectedError);

  await loginPage.errorMessageClose();

  await expect(loginPage.errorMessage).toBeHidden();
});

test("TC_LOGIN_004 - Valid username with invalid password should show login error @negative @login @regression", async ({
  loginPage,
}) => {
  const data = loginData.TC_LOGIN_004;

  await loginPage.Visit();

  await loginPage.login(data.username, data.password);

  await expect(loginPage.errorMessage).toContainText(data.expectedError);
});
