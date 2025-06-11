import "jest-puppeteer";
import "expect-puppeteer";

describe("delete", () => {
  test("delete task", async () => {
    await Promise.all([
      page.goto(`${TARGET_PAGE_URL}/tasks/1`),
      page.waitForSelector("[data-test=header]"),
    ]);

    await Promise.all([
      page.click("[data-test=delete-button]"),
      page.waitForNavigation(),
    ]);

    expect(page.url()).toBe(`${TARGET_PAGE_URL}/`);

    const taskTitles = await page.$$eval("[data-test=task-title]", els => {
      return els.map(el => el.textContent!.trim());
    });
    expect(taskTitles).not.toContain("Task1");
  });
});
