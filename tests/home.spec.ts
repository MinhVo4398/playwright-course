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

    test('Click get started button using CSS Selector', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com');
        // click the button
        await page.locator('#get-started').click();

        //verify url has #get-started
        await expect(page).toHaveURL(/.*#get-started/);
    })

    test('Verify heading text is visible using text selector', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com');

        // find the text locator
        const headingText =  page.locator('text=Think different. Make different.');

        //verify heading text is visible
        await expect(headingText).not.toBeHidden();
        await expect(headingText).toBeVisible();
    })

    test('Verify home link is enabled using text and css selector', async ({ page }) => {
        await page.goto('https://practice.sdetunicorns.com');

        // find the home text 
         // const homeText = await page.locator('#zak-primary-menu >> text=Home')
        const homeText =  page.locator('#zak-primary-menu:has-text("Home")');

        //verify heading text is visible
        await expect(homeText).toBeEnabled();
       
    })
    
})
