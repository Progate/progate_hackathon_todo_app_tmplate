import "jest-puppeteer";
import "expect-puppeteer";

describe("update", () => {
  beforeEach(async () => {
    await Promise.all([
      page.goto(`${TARGET_PAGE_URL}/tasks/1/edit`),
      page.waitForSelector("[data-test=header]"),
    ]);
  });

  test("update task", async () => {
    await page.$eval("[data-test=input-title]", el => {
      (el as HTMLInputElement).value = "";
    });
    await page.type("[data-test=input-title]", "Edit Task");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit-button]"),
    ]);

    expect(page.url()).toBe(`${TARGET_PAGE_URL}/`);

    const taskTitles = await page.$$eval("[data-test=task-title]", els => {
      return els.map(el => el.textContent!.trim());
    });
    expect(taskTitles).toContain("Edit Task");
  });

  test("validation", async () => {
    await page.$eval("[data-test=input-title]", el => {
      (el as HTMLInputElement).value = "";
    });
    await page.$eval("[data-test=input-description]", el => {
      (el as HTMLInputElement).value = "";
    });
    await page.$eval("[data-test=input-due-date]", el => {
      (el as HTMLInputElement).value = "";
    });
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit-button]"),
    ]);

    const errors = await page.$$eval("[data-test=error-item]", els => {
      return els.map(el => el.textContent!.trim());
    });

    expect(errors).toContain("Title is required");
    expect(errors).toContain("DueDate is required");
    expect(errors).toContain(
      "DueDate must be a valid date in YYYY-MM-DD format",
    );
  });
});
