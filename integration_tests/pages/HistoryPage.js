export class HistoryPage {
  pageDivLocator = '.historyPage';
  historyItemLocator = 'history-item';
  generateButtonLocator = 'generate-button';
  clearButtonLocator = 'clear-button';
  historyPageLinkLocator = 'history-link';
  modalWindowLocator = 'modal-window';

  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://localhost:5173');
    const generationPageLink = this.historyPageLink;
    await generationPageLink.click();
  }

  get pageDiv() {
    return this.page.locator(this.pageDivLocator);
  }

  async addLocalStorage() {
    // Данные для сохранения
    const storageData = {
      state: {
        history: [
          {
            id: 'id56c97571ce0dc8',
            filename: 'test1.csv',
            date: '29-06-2025',
            isSuccessful: true,
            data: {
              total_spend_galactic: 0,
              rows_affected: 29,
              average_spend_galactic: 0,
              less_spent_at: 36,
              big_spent_at: 36,
              less_spent_value: 0,
              big_spent_value: 0,
              big_spent_civ: 'humans',
              less_spent_civ: 'humans',
            },
          },
        ],
      },
      version: 0,
    };

    // Запись в localStorage
    await this.page.evaluate((data) => {
      localStorage.setItem('history-storage', JSON.stringify(data));
    }, storageData);
  }

  get historyPageLink() {
    return this.page.getByTestId(this.historyPageLinkLocator);
  }

  get historyItem() {
    return this.page.getByTestId(this.historyItemLocator);
  }

  get generateButton() {
    return this.page.getByTestId(this.generateButtonLocator);
  }
  get clearButton() {
    return this.page.getByTestId(this.clearButtonLocator);
  }
  get modalWindow() {
    return this.page.getByTestId(this.modalWindowLocator);
  }
}
