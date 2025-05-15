import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';


export class ProfilePage {
    private readonly page: Page;
    private readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.locator('.logout_button');

    }

    async verifyUserIsOnProfilePage() {
        await expect(this.logoutButton).toBeVisible();
    }

    async clickOnlogoutButton(){
        await this.logoutButton.click();
    }
}