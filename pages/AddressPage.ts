import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';


export class AddressPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;

    }
}