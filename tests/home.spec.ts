import { expect , test} from '@playwright/test';

test.describe('Home', () => {
   test('Open HomePage and verify title', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com/');
        //verify title
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
   })
    test('Open About page and verify title', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com/about');
        //verify title
        await expect(page).toHaveTitle('About – Practice E-Commerce Site');
    })
    
})
