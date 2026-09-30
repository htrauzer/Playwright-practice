import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});


test('pet types', async ({ page }) => {


  await page.getByText('Pet Types').click();
  await expect(page.getByRole('heading')).toHaveText('Pet Types');

  const targetRow = page.locator('tbody tr').nth(0);
  await targetRow.getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByRole('heading')).toHaveText('Edit Pet Type');

  const input = page.getByRole('textbox');
  await input.click();
  await input.clear();
  await input.pressSequentially('rabbit', { delay: 50 });
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(targetRow.locator("input")).toHaveValue('rabbit');

  await targetRow.locator('button', { hasText: 'Edit' }).click();
  await input.click();
  await input.clear();
  await input.pressSequentially('cat', { delay: 50 });
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(targetRow.locator("input")).toHaveValue('cat');
})