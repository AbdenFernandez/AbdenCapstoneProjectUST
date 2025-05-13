import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';

export class ProductDetailsPage{
    private readonly page: Page; 
    private readonly productTitle: Locator;
    private readonly addToCartButton: Locator;
    private readonly cartQuantity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('div.hidden h1.product-title.h5');
        this.addToCartButton = page.getByText('Add to Cart');
        this.cartQuantity = page.locator('//div[@id="cart-icon-bubble"]/div/span[1]');
    }

    async verifyUserIsOnProductDetailsPage(){
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.productTitle).toBeVisible();
    }

    async userClicksOnAddToCartButton(){
        await this.addToCartButton.click();
    }

    async verifyCartQuantityIsEqualTo(quantity: string){
        const cartQuantityText = await this.cartQuantity.textContent();
        await expect(cartQuantityText).toBe(quantity);

    }
}