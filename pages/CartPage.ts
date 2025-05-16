import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';

export class CartPage {
    private readonly page: Page;
    private readonly priceSummary: Locator;
    private readonly cartTitle: Locator;
    private readonly clearCart: Locator;
    private readonly remove: Locator;
    private readonly emptyCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.priceSummary = page.locator('.price_summary');
        this.cartTitle = page.locator('div.first_section_drawer h2');
        this.clearCart = page.locator('.cart-drawer__view-cart.clear_cart');
        this.remove = page.locator('//a[@aria-label="Remove"]');
        this.emptyCart = page.getByText('Your cart is empty');

    }

    async verifyUserIsOnCartPage() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.priceSummary).toBeVisible();
    }

    async verifyCartPageHasTitle() {
        await expect(this.cartTitle).toBeVisible();
    }

    async verifyCartIsEmpty(){
        await expect(this.emptyCart).toBeVisible();
    }

    async userClickOnClearCart(){
        await this.clearCart.click();
    }

    async userClickOnRemoveProductFromCart(){
        await this.remove.isVisible();
        await this.remove.click();
    }
}