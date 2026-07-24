import { expect,type Locator,type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    readonly usernameInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;
    readonly errorMessage:Locator;
    constructor(page:Page){
     super(page);
     this.usernameInput=page.getByPlaceholder('Username')
     this.passwordInput=page.getByPlaceholder('Password');
     this.loginButton= page.locator('#login-button')
     this.errorMessage=page.locator("h3[data-test='error']")
    }

async Visit():Promise<void>
{
    await this.goto('/');
    await expect(this.loginButton).toBeVisible();
}

async login(Username:string,Password:string):Promise<void>
{
    await this.usernameInput.fill(Username);
    await this.passwordInput.fill(Password);
    await this.loginButton.click();
}



}

