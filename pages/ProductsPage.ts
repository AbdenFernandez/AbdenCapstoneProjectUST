import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';

export class ProductsPage {
    private readonly page: Page;
    private readonly showingResultsBlock: Locator;
    private readonly scienceBackedProductsContainer: Locator;
    private readonly scienceBackedProducts: Locator;


    constructor(page: Page) {
        this.page = page;
        this.showingResultsBlock = page.locator('div.st-hidden div.st-toolbox-left div.st-show-result span.st-show-text');
        this.scienceBackedProductsContainer = page.locator('.collection-banner__heading');
        this.scienceBackedProducts = page.locator('.js-pagination-result');
    }

    async verifyUserIsOnProductsPage() {
        await expect(this.showingResultsBlock).toBeVisible();
    }

    async verifyUserIsOnScienceBackedProductsPage() {
        await expect(this.scienceBackedProductsContainer).toBeVisible();
    }
    async userClickOnFirstScienceBackedProduct() {
        await this.scienceBackedProducts.first().click();
    }
}