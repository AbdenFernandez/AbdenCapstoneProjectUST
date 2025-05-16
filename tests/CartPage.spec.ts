import { test, expect } from '../fixtures/plum.fixtures.ts';
import { captureAndAttachFullPageScreenshot } from '../utils/Screenshot.util.ts';


test.describe('Cart Page Tests for Plum Goodness', () => {
    test.beforeEach(async ({ homePage, productsPage }) => {
        await homePage.userNavigatesToHomePage();
        await homePage.closeAnyPopups();
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Facewash');
        await productsPage.verifyUserIsOnProductsPage();

    });

    test.afterEach(async ({ page }, testInfo) => {
        await captureAndAttachFullPageScreenshot(page, testInfo);
    });

    test('Verify user is on Cart Page', async ({ homePage, productsPage, cartPage }) => {
        await productsPage.userClicksOnCartIcon();
        await cartPage.verifyUserIsOnCartPage();
    });

    test('Verify cart is empty', async ({ homePage, productsPage, cartPage }) => {
        await productsPage.userClicksOnCartIcon();
        await cartPage.verifyCartPageHasTitle();
        await cartPage.verifyCartIsEmpty();
    });

    test('Verify user can add a product to cart', async ({ productsPage, cartPage }) => {
        await productsPage.userClickOnAddToCartButtonOfFirstProduct();
        await productsPage.verifyCartQuantityIsEqualTo('1');
    });
    
    test('Verify user can add multiple products to cart', async ({ productsPage, cartPage }) => {
        await productsPage.userClickOnAddToCartButtonOfFirstProduct();
        await productsPage.userClickOnAddToCartButtonOfSecondProduct();
        await productsPage.verifyCartQuantityIsEqualTo('2');   
    });

    test('Verify cart page has title', async ({ productsPage, cartPage }) => {
        await productsPage.userClicksOnCartIcon();
        await cartPage.verifyUserIsOnCartPage();
        await cartPage.verifyCartPageHasTitle();
    });

    test('Verify user can add product to cart from product details page', async ({ productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyAddToCartButtonIsVisible();
        await productDetailsPage.userClicksOnAddToCartButton();
        await productDetailsPage.verifyCartQuantityIsEqualTo('1');
    });

    test('Verify user can remove all products from cart from products page', async ({ productsPage, productDetailsPage, cartPage }) => {
        await productsPage.userClickOnAddToCartButtonOfFirstProduct();
        await productsPage.verifyCartQuantityIsEqualTo('1');
        await productsPage.userClicksOnCartIcon();
        await cartPage.userClickOnClearCart();
        await productsPage.verifyUserIsOnProductsPage();

    });

    test('Verify user can remove a particular product from cart from products page', async ({ productsPage, productDetailsPage, cartPage }) => {
        await productsPage.userClickOnAddToCartButtonOfFirstProduct();
        await productsPage.verifyCartQuantityIsEqualTo('1');
        await productsPage.userClicksOnCartIcon();
        await cartPage.userClickOnRemoveProductFromCart();
        await cartPage.userClickOnClearCart();
        await productsPage.verifyUserIsOnProductsPage();
    });
    
});