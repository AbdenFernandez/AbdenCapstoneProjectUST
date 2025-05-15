import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';

export class CartPage {
    private readonly page: Page;
    private readonly priceSummary: Locator;
    private readonly cartTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.priceSummary = page.locator('.price_summary');
        this.cartTitle = page.locator('div.first_section_drawer h2');

    }

    async verifyUserIsOnCartPage() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.priceSummary).toBeVisible();
    }

    async verifyCartPageHasTitle() {
        await expect(this.cartTitle).toBeVisible();
    }
}