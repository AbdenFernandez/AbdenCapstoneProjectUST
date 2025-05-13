import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';

export class HomePage {

    private readonly page: Page
    private readonly logo: Locator;
    private readonly userIcon: Locator;
    private readonly searchInput: Locator;
    private readonly offersContainer: Locator;
    private readonly trendingProducts: Locator;
    private readonly bestOfPlumsProduct: Locator;
    private readonly routineEssentialsProduct: Locator;
    private readonly spotlightRoutineContainer: Locator;
    private readonly newLaunchesContainer: Locator;
    private readonly newLaunchesProduct: Locator;
    private readonly scienceBackedSolutionsContainer: Locator;
    private readonly scienceBackedSolutionsProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('.logo__link');
        this.userIcon = page.locator('#kp-login-button-header-logo');
        this.searchInput = page.locator('//div[@id="search-desktop"]//input[@name="st"]');
        this.offersContainer = page.locator('#game-template--17970905415740__image_offer_banner_dwwwGd a img');
        this.trendingProducts = page.getByText('best of plums');
        this.bestOfPlumsProduct = page.locator('a.card-link.text-current.js-prod-link');
        this.spotlightRoutineContainer = page.locator('h2.h4.mb-0.flex-auto.section__heading.text-start');
        this.routineEssentialsProduct = page.locator("//div[@id='routine']/div/following-sibling::div/carousel-slider/div/div/div/ul/li/product-card/div/a");
        this.newLaunchesContainer = page.getByText('new Launches');
        this.newLaunchesProduct = page.locator('div.section.new_launches carousel-slider div div div ul li product-card div a img');
        this.scienceBackedSolutionsContainer = page.locator('div.section.defeat-one div div h2.h4.mb-0.flex-auto.section__heading.text-center');
        this.scienceBackedSolutionsProduct = page.locator('div.section.defeat-one carousel-slider div div div ul li div div img');
    }

    async userNavigatesToHomePage() {
        await this.page.goto('/');
        await this.page.waitForLoadState();
    }

    async closeAnyPopups(retries: number){
        await this.page.waitForLoadState();
        const popupSelectors = [
            {
                iframeId: '#iframe-kp',
                closeSelector: '#close_button'
            },
            {
                iframeId: '#preview-notification-frame-58',
                closeSelector: '.smt-close.smt-close-icon.nxt-blank-state-close.close-icon-right'
            }
            
            
        ];
    
        for (const { iframeId, closeSelector } of popupSelectors) {
            try {
                const iframeHandle = await this.page.waitForSelector(iframeId, {
                    timeout: 5000, 
                    state: 'attached'
                });
    
                if (iframeHandle) {
                    const frame = await iframeHandle.contentFrame();
                    if (frame) {
                        const closeButton = await frame.waitForSelector(closeSelector, {
                            timeout: 3000,
                            state: 'visible'
                        });
                        if (closeButton) {
                            await closeButton.click();
                            console.log(`Popup closed for ${iframeId}`);
                        }
                    }
                }
            } catch (e) {
                console.log(`No popup found for ${iframeId}`);
            }
        }
    }
    

    async verifyUserIsOnHomePage() {
        await expect(this.offersContainer.nth(1)).toBeVisible();
    }

    async verifyLogoIsDisplayed() {
        await expect(this.logo).toBeVisible();
    }

    async userNavigatesToLoginPage() {
        await this.userIcon.click();

    }
    async verifyOffersContainerIsVisible() {
        await expect(this.offersContainer.nth(1)).toBeVisible();
    }

    async verifyHomePageHasTitle(title: RegExp) {
        await expect(this.page).toHaveTitle(title);
    }

    async userSearchesForAProduct(searchTerm: string) {
        await this.searchInput.fill(searchTerm);
        await this.searchInput.press('Enter');
        await this.searchInput.press('Enter');
    }
    async verifyHomePageHasTrendingProducts(trendingProductsExp: string) {
        await expect(this.trendingProducts).toHaveText(trendingProductsExp);
    }

    async userClicksOnBestOfPlumsProduct() {
        await expect(this.bestOfPlumsProduct.first()).toBeVisible();
        await this.bestOfPlumsProduct.first().click();
    }

    async verifySpotlightContainerIsVisibleWithText(spotlightText: string) {
        await expect(this.spotlightRoutineContainer.first()).toBeVisible();
        const spotlightTextContent = await this.spotlightRoutineContainer.first().textContent();
        await expect(spotlightTextContent).toContain(spotlightText);
    }
    async verifyRoutineEssentialsContainerIsVisibleWithText(routineEssentialsText: string) {
        await expect(this.spotlightRoutineContainer.nth(1)).toBeVisible();
        const routineEssentialsTextContent = await this.spotlightRoutineContainer.nth(1).textContent();
        await expect(routineEssentialsTextContent).toContain(routineEssentialsText);
    }

    async userClicksOnRoutineEssentialsProduct() {
        await expect(this.routineEssentialsProduct.first()).toBeVisible();
        await this.routineEssentialsProduct.first().click();
    }

    async verifyNewLaunchesContainerIsVisibleWithText(newLaunchesText: string) {
        await expect(this.newLaunchesContainer.first()).toBeVisible();
        const newLaunchesTextContent = await this.newLaunchesContainer.first().textContent();
        await expect(newLaunchesTextContent).toContain(newLaunchesText);
    }

    async userClicksOnNewLaunchesProduct() {
        await expect(this.newLaunchesProduct.first()).toBeVisible();
        await this.newLaunchesProduct.first().click();
    }

    async verifyScienceBackedSolutionsContainerIsVisibleWithText(scienceBackedSolutionsText: string) {
        await expect(this.scienceBackedSolutionsContainer).toBeVisible();
        const scienceBackedSolutionsTextContent = await this.scienceBackedSolutionsContainer.textContent();
        await expect(scienceBackedSolutionsTextContent).toContain(scienceBackedSolutionsText);

    }

    async userClicksOnScienceBackedSolutionsProduct() {
        await expect(this.scienceBackedSolutionsProduct.first()).toBeVisible();
        await this.scienceBackedSolutionsProduct.first().click();
    }
}