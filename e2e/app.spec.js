// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
];

test.describe("New Todo", () => {
  test("should allow me to add todo items", async ({ page }) => {
    // Create 1st todo.
    await page.locator(".new-todo").fill(TODO_ITEMS[0]);
    await page.locator(".new-todo").press("Enter");

    // Make sure the list only has one todo item.
    await expect(page.locator(".view label")).toHaveText([TODO_ITEMS[0]]);

    // Create 2nd todo.
    await page.locator(".new-todo").fill(TODO_ITEMS[1]);
    await page.locator(".new-todo").press("Enter");

    // Make sure the list now has two todo items.
    await expect(page.locator(".view label")).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ]);

    await checkNumberOfTodosInLocalStorage(page, 2);
  });

  test("should clear text input field when an item is added", async ({
    page,
  }) => {
    // Create one todo item.
    await page.locator(".new-todo").fill(TODO_ITEMS[0]);
    await page.locator(".new-todo").press("Enter");

    // Check that input is empty.
    await expect(page.locator(".new-todo")).toBeEmpty();
    await checkNumberOfTodosInLocalStorage(page, 1);
  });

  test("should append new items to the bottom of the list", async ({
    page,
  }) => {
    // Create 3 items.
    await createDefaultTodos(page);

    // Check test using different methods.
    await expect(page.locator(".todo-count")).toHaveText("3 items left");
    await expect(page.locator(".todo-count")).toContainText("3");
    await expect(page.locator(".todo-count")).toHaveText(/3/);

    // Check all items in one call.
    await expect(page.locator(".view label")).toHaveText(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test("should show #main and #footer when items added", async ({ page }) => {
    await page.locator(".new-todo").fill(TODO_ITEMS[0]);
    await page.locator(".new-todo").press("Enter");

    await expect(page.locator(".main")).toBeVisible();
    await expect(page.locator(".footer")).toBeVisible();
    await checkNumberOfTodosInLocalStorage(page, 1);
  });
});

test.describe("Item", () => {
  test("should allow me to mark items as complete", async ({ page }) => {
    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await page.locator(".new-todo").fill(item);
      await page.locator(".new-todo").press("Enter");
    }

    // Check first item.
    const firstTodo = page.locator(".todo-list li").nth(0);
    await firstTodo.locator(".toggle").check();
    await expect(firstTodo).toHaveClass("completed");

    // Check second item.
    const secondTodo = page.locator(".todo-list li").nth(1);
    await expect(secondTodo).not.toHaveClass("completed");
    await secondTodo.locator(".toggle").check();

    // Assert completed class.
    await expect(firstTodo).toHaveClass("completed");
    await expect(secondTodo).toHaveClass("completed");
  });

  test("should allow me to un-mark items as complete", async ({ page }) => {
    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await page.locator(".new-todo").fill(item);
      await page.locator(".new-todo").press("Enter");
    }

    const firstTodo = page.locator(".todo-list li").nth(0);
    const secondTodo = page.locator(".todo-list li").nth(1);
    await firstTodo.locator(".toggle").check();
    await expect(firstTodo).toHaveClass("completed");
    await expect(secondTodo).not.toHaveClass("completed");
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await firstTodo.locator(".toggle").uncheck();
    await expect(firstTodo).not.toHaveClass("completed");
    await expect(secondTodo).not.toHaveClass("completed");
    await checkNumberOfCompletedTodosInLocalStorage(page, 0);
  });

  test("should allow me to edit an item", async ({ page }) => {
    await createDefaultTodos(page);

    const todoItems = page.locator(".todo-list li");
    const secondTodo = todoItems.nth(1);
    await secondTodo.dblclick();
    await expect(secondTodo.locator(".edit")).toHaveValue(TODO_ITEMS[1]);
    await secondTodo.locator(".edit").fill("buy some sausages");
    await secondTodo.locator(".edit").press("Enter");

    // Explicitly assert the new text value.
    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      "buy some sausages",
      TODO_ITEMS[2],
    ]);
    await checkTodosInLocalStorage(page, "buy some sausages");
  });
});

test.describe("Editing", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test("should hide other controls when editing", async ({ page }) => {
    const todoItem = page.locator(".todo-list li").nth(1);
    await todoItem.dblclick();
    await expect(todoItem.locator(".toggle")).not.toBeVisible();
    await expect(todoItem.locator("label")).not.toBeVisible();
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test("should trim entered text", async ({ page }) => {
    const todoItems = page.locator(".todo-list li");
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).locator(".edit").fill("    buy some sausages    ");
    await todoItems.nth(1).locator(".edit").press("Enter");

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      "buy some sausages",
      TODO_ITEMS[2],
    ]);
    await checkTodosInLocalStorage(page, "buy some sausages");
  });

  test("should cancel edits on escape", async ({ page }) => {
    const todoItems = page.locator(".todo-list li");
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).locator(".edit").press("Escape");
    await expect(todoItems).toHaveText(TODO_ITEMS);
  });
});

test.describe("Counter", () => {
  test("should display the current number of todo items", async ({ page }) => {
    await page.locator(".new-todo").fill(TODO_ITEMS[0]);
    await page.locator(".new-todo").press("Enter");
    await expect(page.locator(".todo-count")).toContainText("1");

    await page.locator(".new-todo").fill(TODO_ITEMS[1]);
    await page.locator(".new-todo").press("Enter");
    await expect(page.locator(".todo-count")).toContainText("2");

    await checkNumberOfTodosInLocalStorage(page, 2);
  });
});

test.describe("Clear completed button", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test("should display the correct text", async ({ page }) => {
    await page.locator(".todo-list li .toggle").first().check();
    await expect(page.locator(".clear-completed")).toHaveText(
      "Clear completed"
    );
  });

  test("should remove completed items when clicked", async ({ page }) => {
    const todoItems = page.locator(".todo-list li");
    await todoItems.nth(1).locator(".toggle").check();
    await page.locator(".clear-completed").click();
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test("should be hidden when there are no items that are completed", async ({
    page,
  }) => {
    await page.locator(".todo-list li .toggle").first().check();
    await page.locator(".clear-completed").click();
    await expect(page.locator(".clear-completed")).toBeHidden();
  });
});

test.describe("Persistence", () => {
  test("should persist its data", async ({ page }) => {
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await page.locator(".new-todo").fill(item);
      await page.locator(".new-todo").press("Enter");
    }

    const todoItems = page.locator(".todo-list li");
    await todoItems.nth(0).locator(".toggle").check();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(todoItems).toHaveClass(["completed", ""]);

    // Ensure there is 1 completed item.
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    // Now reload.
    await page.reload();
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(todoItems).toHaveClass(["completed", ""]);
  });
});

test.describe("Routing", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
    // make sure the app had a chance to save updated todos in storage
    // before navigating to a new view, otherwise the items can get lost :(
    // in some frameworks like Durandal
    await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
  });

  test("should allow me to display pending items", async ({ page }) => {
    await page.locator(".todo-list li .toggle").nth(1).check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.locator(".filters >> text=Pending").click();
    await expect(page.locator(".todo-list li")).toHaveCount(2);
    await expect(page.locator(".todo-list li")).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[2],
    ]);
  });

  test("should respect the back button", async ({ page }) => {
    await page.locator(".todo-list li .toggle").nth(1).check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await test.step("Showing all items", async () => {
      await page.locator(".filters >> text=All").click();
      await expect(page.locator(".todo-list li")).toHaveCount(3);
    });

    await test.step("Showing pending items", async () => {
      await page.locator(".filters >> text=Pending").click();
    });

    await test.step("Showing completed items", async () => {
      await page.locator(".filters >> text=Completed").click();
    });

    await expect(page.locator(".todo-list li")).toHaveCount(1);
    await page.goBack();
    await expect(page.locator(".todo-list li")).toHaveCount(2);
    await page.goBack();
    await expect(page.locator(".todo-list li")).toHaveCount(3);
  });

  test("should allow me to display completed items", async ({ page }) => {
    await page.locator(".todo-list li .toggle").nth(1).check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.locator(".filters >> text=Completed").click();
    await expect(page.locator(".todo-list li")).toHaveCount(1);
  });

  test("should allow me to display all items", async ({ page }) => {
    await page.locator(".todo-list li .toggle").nth(1).check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.locator(".filters >> text=Pending").click();
    await page.locator(".filters >> text=Completed").click();
    await page.locator(".filters >> text=All").click();
    await expect(page.locator(".todo-list li")).toHaveCount(3);
  });

  test("should highlight the currently applied filter", async ({ page }) => {
    await expect(page.locator(".filters >> text=All")).toHaveClass("selected");
    await page.locator(".filters >> text=Pending").click();
    // Page change - active items.
    await expect(page.locator(".filters >> text=Pending")).toHaveClass(
      "selected"
    );
    await page.locator(".filters >> text=Completed").click();
    // Page change - completed items.
    await expect(page.locator(".filters >> text=Completed")).toHaveClass(
      "selected"
    );
  });
});

async function createDefaultTodos(page) {
  for (const item of TODO_ITEMS) {
    await page.locator(".new-todo").fill(item);
    await page.locator(".new-todo").press("Enter");
  }
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {number} expected
 */
async function checkNumberOfTodosInLocalStorage(page, expected) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage["mydayapp-js"]).length === e;
  }, expected);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {number} expected
 */
async function checkNumberOfCompletedTodosInLocalStorage(page, expected) {
  return await page.waitForFunction((e) => {
    return (
      JSON.parse(localStorage["mydayapp-js"]).filter((i) => i.completed)
        .length === e
    );
  }, expected);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} title
 */
async function checkTodosInLocalStorage(page, title) {
  return await page.waitForFunction((t) => {
    const data = localStorage.getItem("mydayapp-js");
    if (data) {
      return JSON.parse(data)
        .map((i) => i.title)
        .includes(t);
    }
    return false;
  }, title);
}
