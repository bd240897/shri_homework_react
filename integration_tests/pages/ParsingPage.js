export class ParsingPage {
  parsingPageLinkLocator = 'parsing-link';
  descriptionLocator = 'page-description';
  submitUploadButtonLocator = 'submit-upload-button';
  submitButtonLocator = 'submit-button';
  highlightsLocator = 'highlights';

  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://localhost:5173');
    await this.parsingPageLink.click();
  }

  get description() {
    return this.page.getByTestId(this.descriptionLocator);
  }

  get parsingPageLink() {
    return this.page.getByTestId(this.parsingPageLinkLocator);
  }

  get submitUploadButton() {
    return this.page.getByTestId(this.submitUploadButtonLocator);
  }

  get submitButton() {
    return this.page.getByTestId(this.submitButtonLocator);
  }

  get highlights() {
    return this.page.getByTestId(this.highlightsLocator);
  }
}
