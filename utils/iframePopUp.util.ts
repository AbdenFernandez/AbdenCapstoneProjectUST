import { Locator, Page } from '@playwright/test';
import { expect } from '../fixtures/plum.fixtures.ts';

export class IframePopUp {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async closePopupIframes() {
        const popupSelectors = [
            { iframeId: '#iframe-kp', closeSelector: '#close_button' },
            {
                iframeId: '#preview-notification-frame-57',
                closeSelector: '.smt-close.smt-close-icon.nxt-blank-state-close.close-icon-right'
            }
        ];
        for (const { iframeId, closeSelector } of popupSelectors) {
            const iframeHandle = await this.page.$(iframeId);
            if (iframeHandle) {
                const frame = await iframeHandle.contentFrame();
                if (frame) {
                    const closeButton = await frame.$(closeSelector);
                    if (closeButton) {
                        await closeButton.click();
                        console.log(`Closed popup in iframe: ${iframeId}`);
                    }
                }
            }
        }
    }
}