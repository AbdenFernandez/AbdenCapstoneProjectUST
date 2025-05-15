import { test, expect } from '../fixtures/plum.fixtures.ts';
import { captureAndAttachFullPageScreenshot } from '../utils/Screenshot.util.ts';


test.describe('Profile Page Tests for Plum Goodness', () => {
    test.beforeEach(async ({ homePage, productsPage }) => {
        await homePage.userNavigatesToHomePage();
        await homePage.closeAnyPopups();
    });

    test.afterEach(async ({ page }, testInfo) => {
        await captureAndAttachFullPageScreenshot(page, testInfo);
    });

    test('Verify user is on Profile Page', async ({ homePage, loginPage, profilePage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userClicksOnProfileIcon();
        await loginPage.verifyUserIsOnLoginPage();
        await loginPage.userEntersValidCredentials(8330029511); 
        await loginPage.userEntersOTP();
        await homePage.verifyUserIsOnHomePage();
        await homePage.userClicksOnLoginIcon();
        await homePage.userClickOrderHistory();
        await profilePage.verifyUserIsOnProfilePage();
    });

    test('Verify user can logout successfully', async ({ homePage, loginPage, profilePage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userClicksOnProfileIcon();
        await loginPage.verifyUserIsOnLoginPage();
        await loginPage.userEntersValidCredentials(8330029511); 
        await loginPage.userEntersOTP();
        await homePage.verifyUserIsOnHomePage();
        await homePage.userClicksOnLoginIcon();
        await homePage.userClickOrderHistory();
        await profilePage.verifyUserIsOnProfilePage();
        await profilePage.clickOnlogoutButton();
        await homePage.verifyUserIsOnHomePage();
    });

    test('Verify user can login and add product to cart from product details page', async ({ homePage, loginPage, profilePage, productsPage, productDetailsPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userClicksOnProfileIcon();
        await loginPage.verifyUserIsOnLoginPage();
        await loginPage.userEntersValidCredentials(8330029511); 
        await loginPage.userEntersOTP();
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Facewash');
        await productsPage.verifyUserIsOnProductsPage();
        await productsPage.userClickOnAddToCartButtonOfFirstProduct();
        await productsPage.verifyCartQuantityIsEqualTo('1');

        
    });
});