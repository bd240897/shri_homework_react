export class GenerationPage {
  descriptionLocator = 'page-description';
  buttonLocator = 'upload-button';
  generationPageLinkLocator = 'generation-link';
  generationMessageLocator = 'generation-message';
  successMessageLocator = 'success-message';

  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://localhost:5173');
    const generationPageLink = this.generationPageLink;
    await generationPageLink.click();
  }

  get description() {
    return this.page.getByTestId(this.descriptionLocator);
  }

  get generationPageLink() {
    return this.page.getByTestId(this.generationPageLinkLocator);
  }
  get button() {
    return this.page.getByTestId(this.buttonLocator);
  }
  get generationMessage() {
    return this.page.getByTestId(this.generationMessageLocator);
  }
  get successMessage() {
    return this.page.getByTestId(this.successMessageLocator);
  }
}
