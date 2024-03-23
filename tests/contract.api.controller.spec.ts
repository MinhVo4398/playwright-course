import { APIResponse, expect, test } from "@playwright/test";
import ContactPage from "../pages/contact.page";
import apiController from "../controller/api.controller";
import dataUserTodoJson from '../datajson/data_usertodo.json'; //import json file for using request body

test.describe("Contact", () => {
  let contactPage: ContactPage;
  let randomPerson: APIResponse;

  test.beforeAll(async () => {
    await apiController.init();
    // call GET API
    randomPerson = await apiController.getUsers();

    // call POST API
    const newUserTodo = await apiController.createUserTodo(dataUserTodoJson);
    console.log(newUserTodo);
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
