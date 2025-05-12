import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';


export class PlumRewardsPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;

    }
}