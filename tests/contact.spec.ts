import { expect, test } from '@playwright/test';

test.describe('Contact', () => {
    test('Filling contact form and verify success message', async ({ page }) => {
        // Open contact page
        await page.goto('https://practice.sdetunicorns.com/contact/');

        // fill out the input fields
        await page.locator('.contact-name input').fill('Test Name');
        await page.locator('.contact-email input').fill('test@mail.com');
        await page.locator('.contact-phone input').fill('1234567864');
        await page.locator('.contact-message textarea').fill('This is a text message');

        // Click submit
        await page.locator('button[type=submit]').click();

        // Verify success message
        const successAlert =  page.locator("div[role='alert']")
        await expect(successAlert).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
		
    })
    
})
