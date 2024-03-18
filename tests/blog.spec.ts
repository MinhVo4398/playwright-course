import { expect, test } from '@playwright/test';
import BlogPage from '../pages/blog.page';
test.describe('Blog', () => {
    let blogPage: BlogPage;

    test('Verify Recent Posts count and verify the length of each list item', async ({ page }) => {
        blogPage = new BlogPage(page);
        // Open blog page
      await  blogPage.navigate();
      
        //loop through the list and assert the char length > 10
        for (const el of await blogPage.recentPostList.elementHandles()) {
            console.log(await el.textContent());
            expect(((await el.textContent())!.trim()).length).toBeGreaterThan(10)
          }

        // assert the total = 5
        expect(await blogPage.recentPostList.count()).toEqual(5);
    })
    
})
