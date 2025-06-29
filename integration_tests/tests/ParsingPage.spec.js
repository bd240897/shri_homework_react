import { test, expect } from '@playwright/test';
import { ParsingPage } from '../pages/ParsingPage';
import path from 'path';

test.describe('Тесты на GenerationPage', () => {
  test('страница открывается', async ({ page }) => {
    const parsingPage = new ParsingPage(page);

    await parsingPage.goto();
    await expect(parsingPage.description).toBeVisible({ timeout: 2000 });
  });

  test('файл грузиться и появляются хайлайты', async ({ page }) => {
    const parsingPage = new ParsingPage(page);

    await parsingPage.goto();

    const testFile = path.join('files', 'test1.csv');

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testFile);

    await expect(parsingPage.submitUploadButton).toContainText(
      'Файл: test1.csv',
      {
        timeout: 2000,
      }
    );

    await parsingPage.submitButton.click();

    await expect(
      page.locator('text=Идет обработка файла... Подождите.')
    ).toBeVisible({
      timeout: 10000,
    });

    await expect(parsingPage.highlights).toBeVisible({
      timeout: 10000,
    });
  });
});
