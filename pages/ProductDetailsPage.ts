import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';

export class ProductDetailsPage{
    private readonly page: Page; 
    private readonly productTitle: Locator;
    private readonly addToCartButton: Locator;
    private readonly cartQuantity: Locator;
    private readonly productName: Locator;
    private readonly productPrice: Locator;
    private readonly bestSuitedForYouContainer: Locator;
    private readonly sizeContainer: Locator;
    private readonly reviews: Locator;
    private readonly reviewsHeader: Locator;
    private readonly writeReview: Locator;
    private readonly reviewTitleInput: Locator;
    private readonly reviewTextInput: Locator;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly submitReview: Locator;
    private readonly ratings: Locator;
    private readonly reviewConfirmation: Locator;
    private readonly pincodeInput: Locator;
    private readonly expectedDeliveryDate: Locator;
    private readonly likeReview: Locator;
    private readonly likeCount: Locator;
    private readonly dislikeReview: Locator;
    private readonly dislikeCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('div.hidden h1.product-title.h5');
        this.addToCartButton = page.getByText('Add to Cart');
        this.cartQuantity = page.locator('//div[@id="cart-icon-bubble"]/div/span[1]');
        this.productName = page.locator('div.product-info div.product-info__title h1');
        this.productPrice = page.locator('div.product-info__price strong span.money');
        this.bestSuitedForYouContainer = page.locator('div.best-suited-for div.title');
        this.sizeContainer = page.locator('.option-selector.size legend');
        this.reviews = page.locator('.rating__count.inline-block.align-middle.text-sm');
        this.reviewsHeader = page.getByText('Ratings & Reviews');
        this.writeReview = page.locator('div a.jdgm-write-rev-link');
        this.reviewTitleInput = page.locator('(//input[@name="review_title"])[1]');
        this.reviewTextInput = page.locator('(//textarea[@name="review_body"])[1]');
        this.nameInput = page.locator('(//input[@name="reviewer_name"])[1]');        
        this.emailInput = page.locator('(//input[@name="reviewer_email"])[1]');
        this.submitReview = page.locator('.jdgm-btn.jdgm-btn--solid.jdgm-submit-rev ');
        this.ratings = page.locator('span.jdgm-form__rating a');
        this.reviewConfirmation = page.locator('.jdgm-notification__title');
        this.pincodeInput = page.locator('(//input[@class="pincode_input check-delivery-pincode"])[1]');
        this.expectedDeliveryDate = page.locator('(//div//p[@class="expected"]/br)[1]');
        this.likeReview = page.locator('span.jdgm-rev__thumb-btn.jdgm-rev_thumb-up');
        this.likeCount = page.locator('span.jdgm-rev__thumb-count.jdgm-rev_thump-up-count');
        this.dislikeReview = page.locator('span.jdgm-rev__thumb-btn.jdgm-rev_thumb-down');
        this.dislikeCount = page.locator('span.jdgm-rev__thumb-count.jdgm-rev_thump-down-count');
    }

    async verifyUserIsOnProductDetailsPage(){
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.productTitle).toBeVisible();
    }

    async verifyProductDetailsPageHasTitle(title: RegExp){
        await expect(this.page).toHaveTitle(title);
    }

    async verifyAddToCartButtonIsVisible(){
        await expect(this.addToCartButton).toBeVisible();
    }

    async userClicksOnAddToCartButton(){
        await this.addToCartButton.click();
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

    async verifyProductNameIsVisible(productNameExp: RegExp){
        await expect(this.productName).toBeVisible();
        await expect(this.productName).toContainText(productNameExp);

    }

    async verifyProductsPriceIsVisible(priceExp: RegExp){
        await expect(this.productPrice).toBeVisible();
        await expect(this.productPrice).toHaveText(priceExp);
    }

    async verifyBestSuitedForYouContainerIsVisible(bestSuitedForYouExp: RegExp){
        await expect(this.bestSuitedForYouContainer).toBeVisible();
        await expect(this.bestSuitedForYouContainer).toHaveText(bestSuitedForYouExp);

    }
    async verifyProductSizeIsVisible(sizeExp: RegExp){
        await expect(this.sizeContainer).toBeVisible();
        await expect(this.sizeContainer).toContainText(sizeExp);
    }
    async userClicksOnReviews(){
        await expect(this.reviews).toBeVisible();
        await this.reviews.click();
    }
    async verifyUserIsOnReviewsSection(){
        await expect(this.reviewsHeader).toBeVisible();
    }

    async userWritesReview(reviewTitle: string, reviewText: string, name: string, email: string){
        await this.writeReview.click();
        await expect(this.reviewTitleInput).toBeVisible();
        await this.ratings.nth(4).click();
        await this.reviewTitleInput.fill(reviewTitle);
        await this.reviewTextInput.fill(reviewText);
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.submitReview.click();
    
    }
    async verifyReviewSubmittedSuccessfully(){
        await expect(this.reviewConfirmation).toBeVisible();
    }

    async userEntersPincode(pincode: string){
        await expect(this.pincodeInput).toBeVisible();
        await this.pincodeInput.fill(pincode);
        await this.pincodeInput.press('Enter');
    }

    async verifyExpectedDeliverDateIsVisible(){
        await expect(this.expectedDeliveryDate).toBeHidden()
    }

    private previousLikeCount: number | null = null;

    async userLikesReview() {
        await expect(this.likeReview.first()).toBeVisible();
        await expect(this.likeCount.first()).toBeVisible();
        const previousLikeCountText = await this.likeCount.first().textContent();
        this.previousLikeCount = previousLikeCountText !== null ? parseInt(previousLikeCountText.trim(), 10) : null;
        await this.likeReview.first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyReviewLikedSuccessfully() {
        const currentLikeCountText = await this.likeCount.first().textContent();
        const currentLikeCount = currentLikeCountText !== null ? parseInt(currentLikeCountText.trim(), 10) : null;
        if (this.previousLikeCount !== null && currentLikeCount !== null) {
            await expect(currentLikeCount).toBeGreaterThan(this.previousLikeCount);
        } else {
            throw new Error('Unable to verify like count due to missing data');
        }
    }

    private prevDisLikeCount: number | null = null;

    async userDislikesReview() {
        await expect(this.dislikeReview.first()).toBeVisible();
        await expect(this.dislikeCount.first()).toBeVisible();
        const previousDisLikeCountText = await this.dislikeCount.first().textContent();
        this.prevDisLikeCount = previousDisLikeCountText !== null ? parseInt(previousDisLikeCountText.trim(), 10) : null;
        await this.dislikeReview.first().click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyReviewDislikedSuccessfully() {
        const currentDisLikeCountText = await this.dislikeCount.first().textContent();
        const currentDisLikeCount = currentDisLikeCountText !== null ? parseInt(currentDisLikeCountText.trim(), 10) : null;
        if (this.prevDisLikeCount !== null && currentDisLikeCount !== null) {
            await expect(currentDisLikeCount).toBeGreaterThan(this.prevDisLikeCount);
        } else {
            throw new Error('Unable to verify like count due to missing data');
        }
    }
}