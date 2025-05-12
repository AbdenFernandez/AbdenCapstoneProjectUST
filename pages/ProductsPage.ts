import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';

export class ProductsPage {
    private readonly page: Page;
    private readonly showingResultsBlock: Locator;

    constructor(page: Page) {
        this.page = page;
        this.showingResultsBlock = page.locator('div.st-hidden div.st-toolbox-left div.st-show-result span.st-show-text');
    }

    async verifyUserIsOnProductsPage() {
        await expect(this.showingResultsBlock).toBeVisible();
    }
}