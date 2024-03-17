import { expect, test } from "@playwright/test";
import HomePage from "../pages/home.page";

test.describe("Home", () => {
  let homePage: HomePage;
  test("Open HomePage and verify title", async ({ page }) => {
    homePage = new HomePage(page);

    await page.goto("https://practice.sdetunicorns.com/");
    //verify title
    await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns");
  });
  test("Open About page and verify title", async ({ page }) => {
    await page.goto("https://practice.sdetunicorns.com/about");
    //verify title
    await expect(page).toHaveTitle("About – Practice E-Commerce Site");
  });

  test("Click get started button using CSS Selector", async ({ page }) => {
    homePage = new HomePage(page);

    await page.goto("https://practice.sdetunicorns.com");

    // click the button
    await homePage.getStartedBtn.click();
  

    //verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/);
  });

  test("Verify heading text is visible using text selector", async ({
    page,
  }) => {
    homePage = new HomePage(page);

    await page.goto("https://practice.sdetunicorns.com");

    // find the text locator
   const headingText = await homePage.headingText;

    //verify heading text is visible
    await expect(headingText).not.toBeHidden();
    await expect(headingText).toBeVisible();
  });

  test("Verify home link is enabled using text and css selector", async ({
    page,
  }) => {
    homePage = new HomePage(page);
    await page.goto("https://practice.sdetunicorns.com");

    // find the home text
   const homeText = await homePage.homeLink;

    //verify heading text is visible
    await expect(homeText).toBeEnabled();
  });

  test("Verify search icon is visible using xpath selector", async ({
    page,
  }) => {
    // open url
    await page.goto("https://practice.sdetunicorns.com");

    // find the search icon
    const searchIcon = await homePage.searchIcon;

    // verify search icon is visible
    await expect(searchIcon).toBeVisible();
  });

  test("Verify text for all nav links", async ({ page }) => {
    homePage = new HomePage(page);
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];

    // open url
    await page.goto("https://practice.sdetunicorns.com");

    // find the nav links
    const navLinks = await homePage.navLinks();

    //print out all the links
    for (const el of await navLinks.elementHandles()) {
      console.log(await el.textContent());
      // manipulating
    }

    // verify nav links text
    // expect(await navLinks.allTextContents()).toEqual(expectedLinks);
    expect(await navLinks.allTextContents()).toEqual(expectedLinks);
  });
});
