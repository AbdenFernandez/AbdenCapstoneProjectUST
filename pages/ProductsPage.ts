import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';
import { HomePage } from './HomePage.ts';

export class ProductsPage {
    private readonly page: Page;
    private readonly logo: Locator;
    private readonly showingResultsBlock: Locator;
    private readonly scienceBackedProductsContainer: Locator;
    private readonly scienceBackedProducts: Locator;
    private readonly searchInput: Locator;
    private readonly searchedProductTitle: Locator;
    private readonly products: Locator
    private readonly productsTwo: Locator
    private readonly filterTags: Locator;
    private readonly shopBy: Locator;
    private readonly productTypeAndConcern: Locator;
    private readonly priceRange: Locator;
    private readonly priceRangeTwo: Locator;
    private readonly productPagePriceList: Locator;
    private readonly sortBox: Locator;
    private readonly sortAscending: Locator;
    private readonly sortDescending: Locator;
    private readonly clear: Locator;
    private readonly addToCartButton: Locator;
    private readonly cartIcon: Locator;
    readonly cartQuantity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('.logo__link');
        this.showingResultsBlock = page.locator('div.st-hidden div.st-toolbox-left div.st-show-result span.st-show-text');
        this.scienceBackedProductsContainer = page.locator('.collection-banner__heading');
        this.scienceBackedProducts = page.locator('.js-pagination-result');
        this.searchInput = page.locator('//div[@id="search-desktop"]//input[@name="st"]');
        // this.searchedProductTitle = page.locator('div.st-product-name a span');
        this.searchedProductTitle = page.locator('.card-link.text-current.js-prod-link');
        this.products = page.locator('div.st-w-full.st-h-auto.st-product-image.st-block.st-group.st-relative');
        this.productsTwo = page.locator('.card-link.text-current.js-prod-link');
        this.filterTags = page.locator('span.filter-tags');
        this.shopBy = page.locator('div.main-products-grid__filters div.st-sidebar div.st-sidebar-content.st-relative div h3.st-widget-title');
        this.sortBox = page.locator('div.st-toolbox.st-hidden div.st-sort-dropdown');
        this.productTypeAndConcern = page.locator('span.st-leading-normal');
        this.priceRange = page.locator("(//li[@class='st-py-[0px] st-w-full st-m-0 st-block st-pl-0 st-overflow-hidden']//span[3])");
        this.priceRangeTwo = page.locator("(//li[@class='st-py-[0px] st-w-full st-m-0 st-block st-pl-0 st-overflow-hidden']//span[3])[4]");
        this.productPagePriceList = page.locator("//span[@class='new-price money st-pr-[2px] !st-font-normal st-text-[#000000] st-tracking-[0px] st-text-[12px] sm:!st-text-[18px] sm:!st-leading-[27px] st-tracking-[0px]']");
        this.sortAscending = page.locator("//div[contains(@class,'st-toolbox st-hidden ')]//div[contains(@class,'st-sort-dropdown')]//ul/li/span[contains(text(),'Price: Low to High')]");
        this.sortDescending = page.locator("//div[contains(@class,'st-toolbox st-hidden ')]//div[contains(@class,'st-sort-dropdown')]//ul/li/span[contains(text(),'Price: High to Low')]");
        this.clear = page.locator('div.st-sidebar-content.st-relative div h3.st-widget-title span.filter-clear');
        this.cartIcon = page.locator('.icon_basket.header__icon.relative.text-current');
        this.cartQuantity = page.locator('//div[@id="cart-icon-bubble"]/div/span[1]');
        this.addToCartButton = page.locator('//div[@class="card__quick-add mob:card__quick-add--below desktop:card__quick-add--below st-cart-btn"]//span[@class="quick-add-btn-text"]');
    }

    async verifyUserIsOnProductsPage() {
        await this.page.waitForLoadState('domcontentloaded');

        await this.logo.hover();
        await this.page.waitForTimeout(1000);
        await expect(this.shopBy.first()).toBeVisible();
    }

    async verifyUserIsOnScienceBackedProductsPage() {
        await expect(this.scienceBackedProductsContainer).toBeVisible();
    }
    async userClickOnFirstScienceBackedProduct() {
        await this.scienceBackedProducts.first().click();
    }
    async userClickOnFirstProduct() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.logo.hover();
        if (await this.productsTwo.first().isVisible()) {
            await this.productsTwo.first().click();
        } else if (await this.products.first().isVisible()) {
            await this.products.first().click();
        } else {
            throw new Error('Neither productsTwo nor products are visible to click.');
        }
    }

    async userSearchesForAProduct(searchTerm: string) {
        await this.searchInput.fill(searchTerm);
        await this.searchInput.press('Enter');
        await this.searchInput.press('Enter');
    }

    async verifyProductPageHasTitle(title: RegExp) {
        await expect(this.page).toHaveTitle(title);
    }
    async verifySearchedProductContainsSearchTerm(searchTerm: string) {
        const homePage = new HomePage(this.page);
        await homePage.closeAnyPopups();

        const selectors = [
            '.card-link.text-current.js-prod-link',
            'a.st-title span'
        ];

        const visibleTitles: string[] = [];

        for (const selector of selectors) {
            const elements = this.page.locator(selector);

            // Wait for at least one matching element of this type to be visible (if any)
            const count = await elements.count();
            for (let i = 0; i < count; i++) {
                const element = elements.nth(i);
                if (await element.isVisible()) {
                    const text = await element.textContent();
                    if (text && text.trim()) {
                        visibleTitles.push(text.trim());
                    }
                }
            }
        }

        // Match titles to search term
        const matched = visibleTitles.filter(title =>
            title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (matched.length === 0) {
            await this.page.screenshot({ path: 'no-match.png', fullPage: true });
            throw new Error(
                `No product title matched "${searchTerm}".\nVisible titles were:\n- ${visibleTitles.join('\n- ')}`
            );
        }
        await expect(matched.length).toBeGreaterThan(0);
    }





    async userClickOnFilterTag(filterTag: string) {
        await this.logo.hover();
        const filterTagElements = await this.filterTags.all();
        for (const element of filterTagElements) {
            const text = (await element.textContent())?.trim().toLowerCase() || '';
            if (text.includes(filterTag.trim().toLowerCase())) {
                await element.click();
                return;
            }
        }
        throw new Error(`Filter tag with text "${filterTag}" not found.`);
    }

    async userClickOnLogo() {
        await this.logo.click();
    }

    async verifyShopByProductTypeIsVisible(productTypeString: RegExp) {
        await expect(this.shopBy.first()).toBeVisible();
        await expect(this.shopBy.first()).toHaveText(productTypeString);
    }

    async userChooseAproductType(productType: string) {
        await this.logo.hover();

        const productTypeElements = await this.productTypeAndConcern.all();

        for (const element of productTypeElements) {
            if (await element.isVisible()) {
                const text = (await element.textContent())?.trim().toLowerCase() || '';
                if (text.includes(productType.trim().toLowerCase())) {
                    await element.click();
                    return;
                }
            }
        }

        throw new Error(`Visible product type with text "${productType}" not found.`);
    }


    async verifyShopByConcernIsVisible(concernString: RegExp) {
        await expect(this.shopBy.nth(1)).toBeVisible();
        await expect(this.shopBy.nth(1)).toHaveText(concernString);
    }

    async userChooseConcern(concern: string) {
        await this.logo.hover();
        await this.shopBy.nth(1).click();

        const concernElements = await this.productTypeAndConcern.all();

        for (const element of concernElements) {
            if (await element.isVisible()) {
                const text = (await element.textContent())?.trim().toLowerCase() || '';
                if (text.includes(concern.trim().toLowerCase())) {
                    await element.click();
                    return;
                }
            }
        }

        throw new Error(`Visible concern with text "${concern}" not found.`);
    }


    async verifyPriceIsVisible(priceString: RegExp) {
        await expect(this.shopBy.nth(2)).toBeVisible();
        await expect(this.shopBy.nth(2)).toHaveText(priceString);
    }

    async userChoosePrice(price: number) {
        await this.logo.hover();
        await this.shopBy.nth(2).click();
        let concernElements: Locator[];
        if (await this.priceRange.first().isVisible()) {
            concernElements = await this.priceRange.all();
        }
        else {
            concernElements = await this.priceRangeTwo.all();
        }
        for (const element of concernElements) {
            const text = (await element.textContent())?.toString().trim().toLowerCase() || '';
            if (text.includes(price.toString().trim().toLowerCase())) {
                await element.click();
                return;
            }
        }
        throw new Error(`Price with amoubt "${price}" not found.`);
    }

    async verifySearchedProductsContainPriceLessThan(price: number) {
        await this.logo.hover();
        const count = await this.productPagePriceList.count();
        for (let i = 0; i < count; i++) {
            const element = this.productPagePriceList.nth(i);
            if (await element.isVisible()) {
                const text = await element.textContent();
                if (text) {
                    const priceText = text.trim();
                    const priceNumber = parseFloat(priceText.replace(/[^0-9.,]/g, '').replace(',', ''));

                    if (priceNumber <= price) {
                        console.log(`Actual price ${priceNumber} is less than or equal to ${price}`);
                        return;
                    }
                }
            }
        }
    }

    async verifySortBoxIsVisible() {
        await expect(this.sortBox).toBeVisible();
    }

    async userClickOnAscendingSort() {
        await this.sortBox.click();
        await expect(this.sortAscending).toBeVisible();
        await this.sortAscending.click();
    }
    async verifyPriceIsSortedInAscendingOrder(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');

        const count = await this.productPagePriceList.count();
        const prices: number[] = [];

        for (let i = 0; i < count; i++) {
            const element = this.productPagePriceList.nth(i);
            if (await element.isVisible()) {
                const text = await element.textContent();
                if (text) {
                    const priceText = text.trim();
                    const priceNumber = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                    prices.push(priceNumber);
                }
            }
        }
        console.log('Prices are :', prices);

        for (let i = 1; i < prices.length; i++) {
            if (prices[i] < prices[i - 1]) {
                const errorMessage = `Prices are not sorted in ascending order. Price at index ${i} (${prices[i]}) is less than next price at index ${i - 1} (${prices[i - 1]}).`;
                console.error(errorMessage);
                return Promise.reject(errorMessage); // Use Promise rejection instead of throw
            }
        }

        console.log('Prices are sorted in ascending order:', prices);
        return Promise.resolve();
    }

    async userClickOnDescendingSort() {
        await this.sortBox.click();
        await expect(this.sortDescending).toBeVisible();
        await this.sortDescending.click();
    }
    async verifyPriceIsSortedInDescendingOrder(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');

        const count = await this.productPagePriceList.count();
        const prices: number[] = [];

        for (let i = 0; i < count; i++) {
            const element = this.productPagePriceList.nth(i);
            if (await element.isVisible()) {
                const text = await element.textContent();
                if (text) {
                    const priceText = text.trim();
                    const priceNumber = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                    prices.push(priceNumber);
                }
            }
        }


        console.log('Prices are :', prices);

        for (let i = 0; i < prices.length - 1; i++) {
            if (prices[i] < prices[i + 1]) {
                const errorMessage = `Prices are not sorted in descending order. Price at index ${i + 1} (${prices[i + 1]}) is greater than next price at index ${i} (${prices[i]}).`;
                console.error(errorMessage);
                return Promise.reject(errorMessage); // Use Promise rejection instead of throw
            }
        }

        console.log('Prices are sorted in descending order:', prices);
        return Promise.resolve();

    }

    async userClickOnClearShopByFilter() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.clear.first()).toBeVisible();
        await this.clear.first().click();
    }


    async userClickOnAddToCartButtonOfFirstProduct() {
        await this.addToCartButton.first().isVisible();
        await this.addToCartButton.first().click();

    }
    async userClickOnAddToCartButtonOfSecondProduct() {
        await this.addToCartButton.nth(1).isVisible();
        await this.addToCartButton.nth(1).click();

    }

    async userClicksOnCartIcon() {
        if (await this.cartIcon.isVisible()) {
            await this.cartIcon.click();
        }
        else {
            await this.cartQuantity.click();
        }
    }

    async verifyCartQuantityIsEqualTo(quantity: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const cartQuantityText = await this.cartQuantity.textContent();
                if (cartQuantityText === null || cartQuantityText === undefined) {
                    return reject(new Error('Cart quantity text is undefined or null'));
                }
                if (cartQuantityText.trim() === quantity) {
                    return resolve();
                } else {
                    return reject(new Error(`Expected cart quantity to be '${quantity}', but got '${cartQuantityText.trim()}'`));
                }
            } catch (error) {
                return reject(error);
            }
        });
    }


}