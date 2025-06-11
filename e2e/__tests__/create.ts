import "jest-puppeteer";
import "expect-puppeteer";

describe("create", () => {
  beforeEach(async () => {
    await Promise.all([
      page.goto(`${TARGET_PAGE_URL}/tasks/new`),
      page.waitForSelector("[data-test=header]"),
    ]);
  });

  test("create task", async () => {
    await page.type("[data-test=input-title]", "New Task");
    await page.type("[data-test=input-description]", "description");
    await page.type("[data-test=input-due-date]", "2020-04-01");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit-button]"),
    ]);

    expect(page.url()).toBe(`${TARGET_PAGE_URL}/`);

    const taskTitles = await page.$$eval("[data-test=task-title]", els => {
      return els.map(el => el.textContent!.trim());
    });
    expect(taskTitles).toContain("New Task");
  });

  test("validation", async () => {
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
