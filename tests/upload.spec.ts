import { expect, test } from '@playwright/test';
const path = require('path');

test.describe('Upload file', () => {
    test('should upload a test file', async ({ page }) => {
        // Open Url
        await page.goto('https://practice.sdetunicorns.com/cart/');

        //provide test file path
        const filePath = path.join(__dirname,'../data/logo.png');

        //Upload test file (the input must actual input[type=file])
        await page.setInputFiles('input#upfile_1',filePath);

        //Click submit button
        await page.locator('#upload_1').click();

        //Assertion
        await expect(page.locator('#wfu_messageblock_header_1_label_1')).toContainText('uploaded successfully');
    })
    
})
