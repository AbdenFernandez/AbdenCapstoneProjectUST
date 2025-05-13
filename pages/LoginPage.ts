import { FrameLocator, Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts'; 



export class LoginPage {

    private readonly page: Page;
    private readonly frameLocators: FrameLocator;


    constructor(page: Page) {
        this.page = page;
        this.frameLocators = page.frameLocator('#iframe-kp');


    }

    async verifyUserIsOnLoginPage(){
        await expect(this.frameLocators.locator('#phone-input')).toBeVisible();
        
    }

}