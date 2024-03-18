import {Page, Locator} from '@playwright/test';

class BlogPage {
    private page: Page;
    recentPostList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.recentPostList = page.locator('#recent-posts-3 ul li');
    }
    async navigate() {
        await this.page.goto('/blog');
    }
}

export default BlogPage;