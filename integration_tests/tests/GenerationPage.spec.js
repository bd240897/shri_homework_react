import { test, expect } from '@playwright/test';
import { GenerationPage } from '../pages/GenerationPage';

test.describe('Тесты на GenerationPage', () => {
  test('страница открывается', async ({ page }) => {
    const generationPage = new GenerationPage(page);

    await generationPage.goto();
    await generationPage.button.click();
    await expect(generationPage.description).toBeVisible({ timeout: 2000 });
  });

  test('генерация файла проходит успешно', async ({ page }) => {
    const generationPage = new GenerationPage(page);

    await generationPage.goto();
    await generationPage.button.click();
    await expect(generationPage.generationMessage).toBeVisible({
      timeout: 2000,
    });
    await expect(generationPage.successMessage).toBeVisible({ timeout: 60000 });
  });
});
