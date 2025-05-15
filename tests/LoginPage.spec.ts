import { test, expect } from '../fixtures/plum.fixtures.ts';
import { captureAndAttachFullPageScreenshot } from '../utils/Screenshot.util.ts';


test.describe('Cart Page Tests for Plum Goodness', () => {
    test.beforeEach(async ({ homePage, productsPage }) => {
        await homePage.userNavigatesToHomePage();
        await homePage.closeAnyPopups();
    });

    test.afterEach(async ({ page }, testInfo) => {
        await captureAndAttachFullPageScreenshot(page, testInfo);
    });

    test('Verify user is on Login Page', async ({ homePage, loginPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userNavigatesToLoginPage();
        await loginPage.verifyUserIsOnLoginPage();
    });

    test('Verify login page has title', async ({ homePage, loginPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userNavigatesToLoginPage();
        await loginPage.verifyUserIsOnLoginPage();
        await loginPage.verifyLoginPageHasTitle();
    });

    test('Verify user can login successfully with valid credentials', async ({ homePage, loginPage }) => {
        await homePage.verifyUserIsOnHomePage();
        await homePage.userNavigatesToLoginPage();
        await loginPage.verifyUserIsOnLoginPage();
        await loginPage.userEntersValidCredentials(8330029511);
        await loginPage.userEntersOTP();
        await homePage.verifyUserIsOnHomePage();
    });
    [
        {
            'phoneNumber': 9859338744
        },
        {
            'phoneNumber': 9859338741
        },
        {
            'phoneNumber': 9859338742
        }

    ].forEach(({ phoneNumber }) => {
        test(`Verify user can login with invalid credentials - phoneNumber: ${phoneNumber}`, async ({ homePage, loginPage }) => {
            await homePage.verifyUserIsOnHomePage();
            await homePage.userNavigatesToLoginPage();
            await loginPage.verifyUserIsOnLoginPage();
            await loginPage.userEntersValidCredentials(phoneNumber);
            await loginPage.verifyOtpFieldIsVisible(); // Assuming a method to verify login failure
        });
    });

    [
        {
            'phoneNumber': 83029511
        },
        {
            'phoneNumber': 830029511
        },
        {
            'phoneNumber': 83300291
        }

    ].forEach(({ phoneNumber }) => {
        test(`Verify user cannot login with invalid credentials - phoneNumber: ${phoneNumber}`, async ({ homePage, loginPage }) => {
            await homePage.verifyUserIsOnHomePage();
            await homePage.userNavigatesToLoginPage();
            await loginPage.verifyUserIsOnLoginPage();
            await loginPage.userEntersValidCredentials(phoneNumber);
            await loginPage.verifyOtpFieldIsNotVisible(); // Assuming a method to verify login failure
        });
    });

    
});