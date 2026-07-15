import { expect, test } from "@playwright/test";

test("visitor can sign in and manage todos end to end", async ({ page }) => {
  await page.goto("/todos");
  await expect(page).toHaveURL(/\/login/);

  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/todos/);

  const board = page.getByRole("heading", { name: "Todos" }).locator("..");
  await expect(board.getByText("Read the FSD architecture docs")).toBeVisible();

  const title = `New todo ${Date.now()}`;
  await page.getByPlaceholder("Add a new todo").fill(title);
  await page.getByRole("button", { name: "Add" }).click();
  const newItem = page.getByText(title);
  await expect(newItem).toBeVisible();

  const newRow = newItem.locator("xpath=ancestor::li");
  await newRow.getByRole("checkbox").click();
  await expect(newRow.getByRole("checkbox")).toBeChecked();
  await expect(newRow.getByText(title)).toHaveClass(/line-through/);

  await newRow.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText(title)).toHaveCount(0);
});
