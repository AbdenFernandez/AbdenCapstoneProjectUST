import fs from 'fs';
import path from 'path';
import { Page, TestInfo } from '@playwright/test';

export async function captureAndAttachFullPageScreenshot(page: Page, testInfo: TestInfo) {
    const screenshotDir = path.join(process.cwd(), 'screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });
    const sanitizedTitle = testInfo.title.replace(/[^\w\d-]/g, '_');
    const filePath = path.join(screenshotDir, `${sanitizedTitle}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    await testInfo.attach('Full Page Screenshot', {
        path: filePath,
        contentType: 'image/png',
    });
}
