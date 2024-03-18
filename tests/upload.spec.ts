import { expect, test } from "@playwright/test";
import CartPage from "../pages/cart.page";
import path from "path";


test.describe("Upload file", () => { 
  let cartPage: CartPage;

  const fileName = ['logo.png', 'Java.pdf'];

  for(const name of fileName) {
    test(`should upload a ${name}`, async ({ page }) => {
      cartPage = new CartPage(page);
  
      // Open Url
      await page.goto("https://practice.sdetunicorns.com/cart/");
  
      //provide test file path
      const filePath = path.join(__dirname, `../data/${name}`);
  
      //Upload test file
      cartPage.uploadComponent().uploadFile(filePath);
  
      //Assertion
      await expect(cartPage.uploadComponent().successTxt).toContainText("uploaded successfully", {timeout: 20000});
     
    });
  }

  

  test.skip("should upload a test file on a hidden input field", async ({page,}) => { 
    // Open Url
    await page.goto("https://practice.sdetunicorns.com/cart/");

    //provide test file path
    const filePath = path.join(__dirname, "../data/logo.png");

    //Dom manipulation
    await page.evaluate(() => {
      const selector = document.querySelector("input#upfile_1");
      // if you have the selector -> set the className to empty
      if (selector) {
        selector.className = "";
      }
    });

    // Upload test file
    await page.setInputFiles("input#upfile_1", filePath); //throws error

    //Click submit button
    await page.locator("#upload_1").click();

    //Assertion
    await expect(
      page.locator("#wfu_messageblock_header_1_label_1")
    ).toContainText("uploaded successfully");
  });
});
