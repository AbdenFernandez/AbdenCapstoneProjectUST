import { FrameLocator, Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts'; 



export class LoginPage {

    private readonly page: Page;
    private readonly frameLocator: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.frameLocator = page.frameLocator('#iframe-kp');

    }

    async verifyUserIsOnLoginPage(){
        await expect(this.frameLocator.locator('#phone-input')).toBeVisible();
        
    }

}