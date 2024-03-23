import { APIRequestContext, APIResponse, expect, test } from "@playwright/test";
import ContactPage from "../pages/contact.page";
//const { faker } = require("@faker-js/faker");
test.describe("Contact", () => {
  let contactPage: ContactPage;
  let fakerApi: APIRequestContext;
  let randomPerson: APIResponse;

  test.beforeAll(async ({ playwright }) => {
    fakerApi = await playwright.request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com/",
    });

    const response = await fakerApi.get("users");
    // console.log(await response.json());
    const responseBody = await response.json();
    randomPerson = responseBody[0];
  });

  test("Filling contact form and verify success message", async ({ page }) => {
    contactPage = new ContactPage(page);

    // Open contact page
    await contactPage.navigate();

    // fill out the input fields and submit
    await contactPage.submitForm(
      randomPerson['name'],
      randomPerson['email'],
      randomPerson['phone'],
      randomPerson['website']
    );

    // Verify success message

    await expect(contactPage.successTxt).toHaveText(
      "Thanks for contacting us! We will be in touch with you shortly",
    );
  });
});
