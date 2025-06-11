import "jest-puppeteer";
import "expect-puppeteer";

test("index page", async () => {
  await Promise.all([
    page.goto(`${TARGET_PAGE_URL}`),
    page.waitForSelector("[data-test=header]"),
  ]);

  await checkTaskRow("[data-test=task-item-1]", "Task1", "TODO", "Low");
  await checkTaskRow("[data-test=task-item-2]", "Task2", "TODO", "High");
  await checkTaskRow("[data-test=task-item-3]", "Task3", "TODO", "Normal");
  await checkTaskRow("[data-test=task-item-4]", "Task4", "DONE", "Low");
});

const checkTaskRow = async (
  selector: string,
  expectedTitle: string,
  expectedStatus: string,
  expectedPriority: string,
) => {
  const taskEl = await page.$(selector);
  const title = await taskEl!.$eval("[data-test=task-title]", el => {
    return el.textContent!.trim();
  });
  const status = await taskEl!.$eval("[data-test=task-status]", el => {
    return el.textContent!.trim();
  });
  const dueDate = await taskEl!.$eval("[data-test=task-due-date]", el => {
    return el.textContent!.trim();
  });
  const dueDateFormat = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
  const priority = await taskEl!.$eval("[data-test=task-priority]", el => {
    return el.textContent!.trim();
  });

  expect(title).toBe(expectedTitle);
  expect(status).toBe(expectedStatus);
  expect(dueDateFormat.test(dueDate)).toBe(true);
  expect(priority).toBe(expectedPriority);
};
