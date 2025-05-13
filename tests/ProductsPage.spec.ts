import { test, expect } from '../fixtures/plum.fixtures.ts';
import { captureAndAttachFullPageScreenshot } from '../utils/Screenshot.util.ts';

test.describe('Product Page Tests for Plum Goodness', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.userNavigatesToHomePage();
        await homePage.closeAnyPopups(4);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await captureAndAttachFullPageScreenshot(page, testInfo);
    });

    test('Verify user is on Products page', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
    });

    test('Verify producst page title', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.verifyProductPageHasTitle(/plumgoodness.com/);
    });

    test('Verify user can search for a particular product', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.userSearchesForAProduct('Plum Vitamin C Serum');
        await productsPage.verifySearchedProductContainsSearchTerm('Vitamin C');
    });

    test('Verify user is able to click on filter tags in products page', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.userClickOnFilterTag('Vitamin C');
        await productsPage.verifySearchedProductContainsSearchTerm('Vitamin C');
    });

    test('Verify user click on logo and navigate to home Page', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.verifySearchedProductContainsSearchTerm('Vitamin C');
        await productsPage.userClickOnLogo();
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyHomePageHasTitle(/Science-Backed Skincare, Haircare & Body care \| 100% vegan\s*– Plum/);
    });

    test('Verify Shop by Product Type is visible in products page', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.verifySearchedProductContainsSearchTerm('Vitamin C');
        await productsPage.verifyShopByProductTypeIsVisible(/Shop by Product Type/);
    });

    test('Verify user can access shop by product type functionality in products page', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.verifySearchedProductContainsSearchTerm('Vitamin C');
        await productsPage.verifyShopByProductTypeIsVisible(/Shop by Product Type/);
        await productsPage.userChooseAproductType('Face Serum');
        await productsPage.verifySearchedProductContainsSearchTerm('Face Serum');
    });

    test('Verify Shop By Concern is visible in products page', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.verifySearchedProductContainsSearchTerm('Vitamin C');
        await productsPage.verifyShopByConcernIsVisible(/Shop by Concern/);

    });

    test('Verify user can access shop by concern functionality in products page', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.verifySearchedProductContainsSearchTerm('Vitamin C');
        await productsPage.verifyShopByConcernIsVisible(/Shop by Concern/);
        await productsPage.userChooseConcern('Acne');
        await productsPage.verifySearchedProductContainsSearchTerm('Vitamin C');


    });

    test('Verify Price functionality is visible in products page', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.verifySearchedProductContainsSearchTerm('Vitamin C');
        await productsPage.verifyPriceIsVisible(/Price/);
    });

    test('Verify user can access the price functionality in products page', async ({ homePage, productsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Vitamin C Serum');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.verifySearchedProductContainsSearchTerm('Vitamin C');
        await productsPage.verifyPriceIsVisible(/Price/);
        await productsPage.userChoosePrice(499);
        await productsPage.verifySearchedProductsContainPriceLessThan(499);

    });
});