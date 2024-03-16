import { expect, test } from "@playwright/test";
const path = require("path");

test.describe("Upload file", () => {
  test("should upload a test file ", async ({ page }) => {
    // Open Url
    await page.goto("https://practice.sdetunicorns.com/cart/");

    //provide test file path
    const filePath = path.join(__dirname, "../data/Java.pdf");

    //Upload test file (the input must actual input[type=file])
    await page.setInputFiles("input#upfile_1", filePath);

    //Click submit button
    await page.locator("#upload_1").click();

    // hardcoded sleep - WRONG WAY
    //await page.waitForTimeout(5000);

    // wait for condition
    //await page.locator("#wfu_messageblock_header_1_label_1").waitFor({state:'visible',timeout: 10000});

    //Assertion
    await expect(
      page.locator("#wfu_messageblock_header_1_label_1")
    ).toContainText("uploaded successfully", {timeout: 20000});
  });

  test("should upload a test file on a hidden input field ", async ({
    page,
  }) => {
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
