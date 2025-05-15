import { test, expect } from '../fixtures/plum.fixtures.ts';
import { captureAndAttachFullPageScreenshot } from '../utils/Screenshot.util.ts';


test.describe('Product Details Page Tests for Plum Goodness', () => {
    test.beforeEach(async ({ homePage, productsPage }) => {
        await homePage.userNavigatesToHomePage();
        await homePage.closeAnyPopups();
        await homePage.verifyUserIsOnHomePage();
        await homePage.userSearchesForAProduct('Facewash');
        await productsPage.verifyUserIsOnProductsPage();
        await homePage.closeAnyPopups();

    });

    test.afterEach(async ({ page }, testInfo) => {
        await captureAndAttachFullPageScreenshot(page, testInfo);
    });

    test('Verify user is on Product Details Page', async ({ productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
    });

    test('Verify Product Details Page Title', async ({ productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyProductDetailsPageHasTitle(/Plum/);
    });

    test('Verify product details page has add to cart button', async ({ productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyAddToCartButtonIsVisible();
    });

    test('Verify user can add product to cart', async ({ productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyAddToCartButtonIsVisible();
        await productDetailsPage.userClicksOnAddToCartButton();
        await productDetailsPage.verifyCartQuantityIsEqualTo('1');
    });

    test('Verify Product name is visible in product details page', async ({ productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();

        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyProductDetailsPageHasTitle(/Plum/);
        await productDetailsPage.verifyProductNameIsVisible(/Vitamin C/)
    });

    test('Verify Product Price is visible in product details page', async ({ productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyProductDetailsPageHasTitle(/Plum/);
        await productDetailsPage.verifyProductsPriceIsVisible(/₹/);
    });

    test('Verify best suited for you container is visible in product details page', async ({ productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyProductDetailsPageHasTitle(/Plum/);
        await productDetailsPage.verifyBestSuitedForYouContainerIsVisible(/best suited/);
    });

    test('Verify product size is visibe in product details page', async ({ productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyProductDetailsPageHasTitle(/Plum/);
        await productDetailsPage.verifyProductSizeIsVisible(/Size/);
    });

    test('Verify user can navigate to reviews section in product details page', async ({ homePage, productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyProductDetailsPageHasTitle(/Plum/);
        await productDetailsPage.userClicksOnReviews();
        await homePage.closeAnyPopups();
        await productDetailsPage.verifyUserIsOnReviewsSection();
    });

    [
        {
            'reviewtitle': 'I love this product',
            'reviewtext': 'I love this product. It is amazing. I am very satisfied with the product.',
            'name': 'Abden next',
            'email': 'antonyabdene@gmail.com'
        },
        {
            'reviewtitle': 'I  dont love this product',
            'reviewtext': 'I love this product. It is amazing. I am very satisfied with the product.',
            'name': 'Abden',
            'email': 'abdenan@gmail.com'
        },
        {
            'reviewtitle': 'I love this product',
            'reviewtext': 'I love this product. It is amazing. I am very satisfied with the product.',
            'name': 'Abden',
            'email': 'abdenfer@gmail.com'
        }
    ].forEach(async ({ reviewtitle, reviewtext, name, email }) => {
        test(`Verify user can write reviews for (${reviewtitle}, ${name}, ${email}) in product details page`, async ({ homePage, productsPage, productDetailsPage }) => {
            await productsPage.userClickOnFirstProduct();
            await productDetailsPage.verifyUserIsOnProductDetailsPage();
            await productDetailsPage.verifyProductDetailsPageHasTitle(/Plum/);
            await productDetailsPage.userClicksOnReviews();
            await homePage.closeAnyPopups();
            await homePage.closeAnyPopups();
            await productDetailsPage.verifyUserIsOnReviewsSection();
            await productDetailsPage.userWritesReview(reviewtitle, reviewtext, name, email);
            await productDetailsPage.verifyReviewSubmittedSuccessfully();
        });
    });

    test('Verify user can enter pincode in product details page', async ({ homePage, productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyProductDetailsPageHasTitle(/Plum/);
        await productDetailsPage.userEntersPincode('682001');
        await productDetailsPage.verifyExpectedDeliverDateIsVisible();

    });

    test('Verify user can like a review in product details page', async ({ homePage, productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyProductDetailsPageHasTitle(/Plum/);
        await productDetailsPage.userClicksOnReviews();
        await homePage.closeAnyPopups();
        await productDetailsPage.verifyUserIsOnReviewsSection();
        await productDetailsPage.userLikesReview();
        await homePage.closeAnyPopups();
        await productDetailsPage.verifyReviewLikedSuccessfully();
    });

    test('Verify user can dislike a review in product details page', async ({ homePage, productsPage, productDetailsPage }) => {
        await productsPage.userClickOnFirstProduct();
        await productDetailsPage.verifyUserIsOnProductDetailsPage();
        await productDetailsPage.verifyProductDetailsPageHasTitle(/Plum/);
        await productDetailsPage.userClicksOnReviews();
        await homePage.closeAnyPopups();
        await productDetailsPage.verifyUserIsOnReviewsSection();
        await productDetailsPage.userDislikesReview();
        await homePage.closeAnyPopups();
        await productDetailsPage.verifyReviewDislikedSuccessfully();
    });

    

});
