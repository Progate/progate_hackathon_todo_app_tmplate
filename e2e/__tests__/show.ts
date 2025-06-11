import "jest-puppeteer";
import "expect-puppeteer";

test("show page", async () => {
  await Promise.all([
    page.goto(`${TARGET_PAGE_URL}/tasks/1`),
    page.waitForSelector("[data-test=header]"),
  ]);

  const title = await page.$eval("[data-test=task-title]", el => {
    return el.textContent!.trim();
  });
  const description = await page.$eval("[data-test=task-description]", el => {
    return el.textContent!.trim();
  });
  const dueDate = await page.$eval("[data-test=task-due-date]", el => {
    return el.textContent!.trim();
  });
  const dueDateFormat = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
  const done = await page.$eval("[data-test=task-done]", el => {
    return el.textContent!.trim();
  });

  expect(title).toBe("Task1");
  expect(description).toBe("description1");
  expect(dueDateFormat.test(dueDate)).toBe(true);
  expect(done).toBe("false");
});
