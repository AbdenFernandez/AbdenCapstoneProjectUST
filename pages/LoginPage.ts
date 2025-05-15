import { FrameLocator, Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts'; 



export class LoginPage {

    private readonly page: Page;
    private readonly frameLocators: FrameLocator;
    private readonly loginTitle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.frameLocators = page.frameLocator('#iframe-kp');
        this.loginTitle = page.getByPlaceholder('Enter Mobile Number');


    }

    async verifyUserIsOnLoginPage(){
        await expect(this.frameLocators.locator('#phone-input')).toBeVisible();
        
    }

    async verifyLoginPageHasTitle(){
        await expect(this.frameLocators.locator(this.loginTitle)).toBeVisible();
    }

    async userEntersValidCredentials(phone: number){
        await this.frameLocators.locator(this.loginTitle).fill(phone.toString());
    }

    async userEntersOTP(){
        await this.page.waitForTimeout(10000);
    }

    async verifyOtpFieldIsVisible(){
        await expect(this.frameLocators.locator('.resend.svelte-7cy43c')).toBeVisible();
    }
    async verifyOtpFieldIsNotVisible(){
        await expect(this.frameLocators.locator('.resend.svelte-7cy43c')).toBeHidden();
    }
}