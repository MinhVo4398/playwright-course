import { expect, test } from "@playwright/test";
import ContactPage from "../pages/contact.page";
import { faker } from '@faker-js/faker';

test.describe.only("Contact", () => {
  let contactPage: ContactPage;
  test("Filling contact form and verify success message", async ({ page }) => {
    contactPage = new ContactPage(page);
    

    // Open contact page
    await contactPage.navigate();

    // fill out the input fields and submit
    await contactPage.submitForm(faker.person.firstName(),  faker.internet.email(), faker.phone.number(), faker.lorem.paragraphs(2));


    // Verify success message

    await expect(contactPage.successTxt).toHaveText("Thanks for contacting us! We will be in touch with you shortly",);
   
  });
});
