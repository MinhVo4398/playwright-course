import { expect, test } from "@playwright/test";
import ContactPage from "../pages/contact.page";

test.describe("Contact", () => {
  let contactPage: ContactPage;
  test("Filling contact form and verify success message", async ({ page }) => {
    contactPage = new ContactPage(page);
    

    // Open contact page
    await contactPage.navigate();

    // fill out the input fields and submit
    await contactPage.submitForm("test name", "test@mail.ca", "123789123", "Hello, this is taking advantage of POM");


    // Verify success message

    await expect(contactPage.successTxt).toHaveText("Thanks for contacting us! We will be in touch with you shortly",);
   
  });
});
