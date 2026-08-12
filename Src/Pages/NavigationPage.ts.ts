import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NavigationPage extends BasePage {

    readonly btnMenu:Locator;
    readonly btnlogout:Locator;
    readonly btnRestAppState:Locator;
    readonly menuOptions:Locator
    readonly btnclose:Locator;
    readonly btnAbout:Locator;
    readonly btnAllItems:Locator;
    

    constructor(page:Page){
        super(page);
        this.btnMenu=page.locator('button:has-text("Open Menu")');
        this.btnlogout=page.locator('[data-test="logout-sidebar-link"]');
        this.btnRestAppState=page.locator('[data-test="reset-sidebar-link"]');
        this.menuOptions=page.locator('a.bm-item.menu-item');
        this.btnclose=page.getByText('Close Menu', { exact: true });
        this.btnAbout=page.getByRole('link', { name: /About/i });
        this.btnAllItems = page.getByRole(
  'link',
  {
    name: 'All Items',
    exact: true,
  }
);
    }

    async clickOnOpenMenu():Promise<void>
    {
        await this.btnMenu.click();   

    }


     async clickOnAbout():Promise<void>
    {
        await this.btnAbout.click();   

    }

    async clickOnAllItems(): Promise<void> {
  await this.btnAllItems.click();
}


     async clickOnLogout():Promise<void>
    {
       await this.btnlogout.click();   

    }


     async clickOnRestAppState():Promise<void>
    {
       await this.btnRestAppState.click();   

    }

      async clickOnCloseMenu():Promise<void>
    {
       await this.btnclose.click();   

    }
}