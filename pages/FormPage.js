/**
 * Form Page Object Model
 * Encapsulates all form-related locators and actions
 */
export class FormPage {
  constructor(page) {
    this.page = page;

    // Form container
    this.formContainer = page.locator('form[id="contactForm"]');

    // Input fields
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.emailInput = page.locator('input[name="email"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.messageTextarea = page.locator('textarea[name="message"]');
    this.websiteInput = page.locator('input[name="website"]');

    // Checkbox and Radio buttons
    this.agreeCheckbox = page.locator('input[name="agree"]');
    this.newsletterCheckbox = page.locator('input[name="newsletter"]');
    this.genderRadioMale = page.locator('input[name="gender"][value="male"]');
    this.genderRadioFemale = page.locator('input[name="gender"][value="female"]');
    this.genderRadioOther = page.locator('input[name="gender"][value="other"]');

    // Select dropdown
    this.countrySelect = page.locator('select[name="country"]');

    // Buttons
    this.submitButton = page.locator('button[type="submit"]');
    this.resetButton = page.locator('button[type="reset"]');
    this.clearButton = page.locator('button[id="clearBtn"]');

    // Error messages
    this.errorMessages = page.locator('[role="alert"]');
    this.firstNameError = page.locator('[data-field="firstName"][role="alert"]');
    this.lastNameError = page.locator('[data-field="lastName"][role="alert"]');
    this.emailError = page.locator('[data-field="email"][role="alert"]');
    this.phoneError = page.locator('[data-field="phone"][role="alert"]');
    this.messageError = page.locator('[data-field="message"][role="alert"]');
    this.agreeError = page.locator('[data-field="agree"][role="alert"]');

    // Success message
    this.successMessage = page.locator('[id="successMessage"]');

    // Labels for accessibility
    this.firstNameLabel = page.locator('label[for="firstName"]');
    this.lastNameLabel = page.locator('label[for="lastName"]');
    this.emailLabel = page.locator('label[for="email"]');
    this.phoneLabel = page.locator('label[for="phone"]');
    this.messageLabel = page.locator('label[for="message"]');
    this.agreeLabel = page.locator('label[for="agree"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  // Input field actions
  async fillFirstName(value) {
    await this.firstNameInput.fill(value);
  }

  async fillLastName(value) {
    await this.lastNameInput.fill(value);
  }

  async fillEmail(value) {
    await this.emailInput.fill(value);
  }

  async fillPhone(value) {
    await this.phoneInput.fill(value);
  }

  async fillMessage(value) {
    await this.messageTextarea.fill(value);
  }

  async fillWebsite(value) {
    await this.websiteInput.fill(value);
  }

  // Checkbox and Radio actions
  async checkAgree() {
    await this.agreeCheckbox.check();
  }

  async uncheckAgree() {
    await this.agreeCheckbox.uncheck();
  }

  async checkNewsletter() {
    await this.newsletterCheckbox.check();
  }

  async uncheckNewsletter() {
    await this.newsletterCheckbox.uncheck();
  }

  async selectGender(gender) {
    if (gender === 'male') {
      await this.genderRadioMale.check();
    } else if (gender === 'female') {
      await this.genderRadioFemale.check();
    } else if (gender === 'other') {
      await this.genderRadioOther.check();
    }
  }

  // Select dropdown actions
  async selectCountry(country) {
    await this.countrySelect.selectOption(country);
  }

  // Button actions
  async submit() {
    await this.submitButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }

  async clear() {
    await this.clearButton.click();
  }

  // Assertion helpers
  async getFirstNameErrorText() {
    return await this.firstNameError.textContent();
  }

  async getLastNameErrorText() {
    return await this.lastNameError.textContent();
  }

  async getEmailErrorText() {
    return await this.emailError.textContent();
  }

  async getPhoneErrorText() {
    return await this.phoneError.textContent();
  }

  async getMessageErrorText() {
    return await this.messageError.textContent();
  }

  async getAgreeErrorText() {
    return await this.agreeError.textContent();
  }

  async getSuccessMessageText() {
    return await this.successMessage.textContent();
  }

  async getAllErrorMessages() {
    return await this.errorMessages.allTextContents();
  }

  async getFirstNameValue() {
    return await this.firstNameInput.inputValue();
  }

  async getLastNameValue() {
    return await this.lastNameInput.inputValue();
  }

  async getEmailValue() {
    return await this.emailInput.inputValue();
  }

  async getPhoneValue() {
    return await this.phoneInput.inputValue();
  }

  async getMessageValue() {
    return await this.messageTextarea.inputValue();
  }

  async getCountryValue() {
    return await this.countrySelect.inputValue();
  }

  // Visibility checks
  async isFirstNameErrorVisible() {
    return await this.firstNameError.isVisible();
  }

  async isLastNameErrorVisible() {
    return await this.lastNameError.isVisible();
  }

  async isEmailErrorVisible() {
    return await this.emailError.isVisible();
  }

  async isPhoneErrorVisible() {
    return await this.phoneError.isVisible();
  }

  async isMessageErrorVisible() {
    return await this.messageError.isVisible();
  }

  async isAgreeErrorVisible() {
    return await this.agreeError.isVisible();
  }

  async isSuccessMessageVisible() {
    return await this.successMessage.isVisible();
  }

  // Accessibility checks
  async isFirstNameLabelAssociated() {
    return await this.firstNameLabel.getAttribute('for') === 'firstName';
  }

  async isLastNameLabelAssociated() {
    return await this.lastNameLabel.getAttribute('for') === 'lastName';
  }

  async isEmailLabelAssociated() {
    return await this.emailLabel.getAttribute('for') === 'email';
  }

  async isPhoneLabelAssociated() {
    return await this.phoneLabel.getAttribute('for') === 'phone';
  }

  async isMessageLabelAssociated() {
    return await this.messageLabel.getAttribute('for') === 'message';
  }

  async isAgreeCheckboxAccessible() {
    return await this.agreeCheckbox.getAttribute('aria-label') || 
           await this.agreeLabel.isVisible();
  }

  async getFormAriaLabel() {
    return await this.formContainer.getAttribute('aria-label');
  }

  async getErrorMessageRole() {
    return await this.errorMessages.first().getAttribute('role');
  }
}
