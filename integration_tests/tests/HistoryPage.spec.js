import { test, expect } from '@playwright/test';
import { HistoryPage } from '../pages/HistoryPage';

test.describe('Тесты на HistoryPage', () => {
  test('страница открывается', async ({ page }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();

    await expect(historyPage.pageDiv).toBeVisible();
  });

  test('на страница есть элемент истории', async ({ page }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();
    await historyPage.addLocalStorage();
    await historyPage.page.reload();

    await expect(historyPage.clearButton).toBeVisible();
    await expect(historyPage.historyItem).toBeVisible();
  });

  test('при клике на кнопку очистки история очищается', async ({ page }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();
    await historyPage.addLocalStorage();
    await historyPage.page.reload();

    await historyPage.clearButton.click();

    await expect(historyPage.historyItem).not.toBeVisible();
  });

  test('при клике на элемент истории открывается модалка', async ({ page }) => {
    const historyPage = new HistoryPage(page);

    await historyPage.goto();
    await historyPage.addLocalStorage();
    await historyPage.page.reload();

    await historyPage.historyItem.click();

    await expect(historyPage.modalWindow).toBeVisible({ timeout: 2000 });
  });
});
