import { test as base, expect, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.ts';
import { HomePage } from '../pages/HomePage.ts';
import { ProductsPage } from '../pages/ProductsPage.ts';
import { CartPage } from '../pages/CartPage.ts';
import { ProfilePage } from '../pages/ProfilePage.ts';
import { AddressPage } from '../pages/AddressPage.ts';
import { PlumRewardsPage } from '../pages/PlumRewardsPage.ts';
import { ProductDetailsPage } from '../pages/ProductDetailsPage.ts';


type PlumFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    profilePage: ProfilePage;
    addressPage: AddressPage;
    plumRewardsPage: PlumRewardsPage;
    productDetailsPage: ProductDetailsPage;
};

export const test = base.extend<PlumFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.userNavigatesToHomePage();
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },
    productDetailsPage: async ({ page }, use) => {
        const productDetailsPage = new ProductDetailsPage(page);
        await use(productDetailsPage);
    },
    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
});

export { expect } from '@playwright/test';