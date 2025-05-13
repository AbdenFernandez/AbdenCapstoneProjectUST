import { test, expect } from '../fixtures/plum.fixtures.ts';
import { captureAndAttachFullPageScreenshot } from '../utils/Screenshot.util.ts';

test.describe('Home Page Tests for Plum Goodness', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.userNavigatesToHomePage();
        await homePage.closeAnyPopups(4);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await captureAndAttachFullPageScreenshot(page, testInfo);
    });

    test('Verify user is on home page', async ({ homePage }) => {
        await homePage.verifyUserIsOnHomePage();
    });

    test('Verify logo is displayed on home page', async ({ homePage }) => {
        await homePage.verifyLogoIsDisplayed();
    });

    test('Verify user can navigate to login page', async ({ homePage, loginPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userNavigatesToLoginPage();
        await loginPage.verifyUserIsOnLoginPage();
    });

    test('Verify home page title', async ({ homePage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyHomePageHasTitle(/Science-Backed Skincare, Haircare & Body care \| 100% vegan\s*– Plum/);
    });

    test('Verify user can view offers container in home page', async ({ homePage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyOffersContainerIsVisible();

    });

    test('Verify user can navigate to products page', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
    });

    test('Verify user can view best of plums products in homepage', async ({ homePage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyHomePageHasTrendingProducts('best of plums');
    });

    test('Verify user can add best of plums product to cart', async ({ homePage, productDetailsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyHomePageHasTrendingProducts('best of plums');
        await homePage.userClicksOnBestOfPlumsProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.userClicksOnAddToCartButton();
        await productDetailsPage.verifyCartQuantityIsEqualTo('1');
    });

    test('Verify that the spotlight container is visible in home page', async ({ homePage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifySpotlightContainerIsVisibleWithText('spotlight');
    });

    test('Verify user can view routine essentials container in home page', async ({ homePage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyRoutineEssentialsContainerIsVisibleWithText('routine essentials');
    });

    test('Verify user can add routine essentials product to cart', async ({ homePage, productDetailsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyRoutineEssentialsContainerIsVisibleWithText('routine essentials');
        await homePage.userClicksOnRoutineEssentialsProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.userClicksOnAddToCartButton();
        await productDetailsPage.verifyCartQuantityIsEqualTo('1');
    });

    test('Verify user can view new product launches in home page', async({ homePage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyNewLaunchesContainerIsVisibleWithText('new launches');
    });

    test('Verify user can add new launches product to cart', async ({ homePage, productDetailsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyNewLaunchesContainerIsVisibleWithText('new launches');
        await homePage.userClicksOnNewLaunchesProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.userClicksOnAddToCartButton();
        await productDetailsPage.verifyCartQuantityIsEqualTo('1');
    });

    test('Verify user can science backed solutions container in home page', async ({ homePage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyScienceBackedSolutionsContainerIsVisibleWithText('science-backed solutions for');
    });

    test('Verify user can add science backed solutions product to cart', async ({ homePage, productsPage, productDetailsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyScienceBackedSolutionsContainerIsVisibleWithText('science-backed solutions for');
        await homePage.userClicksOnScienceBackedSolutionsProduct();
        await productsPage.verifyUserIsOnScienceBackedProductsPage();
        await productsPage.userClickOnFirstScienceBackedProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.userClicksOnAddToCartButton();
        await productDetailsPage.verifyCartQuantityIsEqualTo('1');
    });


});