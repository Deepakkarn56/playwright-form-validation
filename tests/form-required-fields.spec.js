import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/FormPage';

test.describe('Form Validation - Required Fields', () => {
  let formPage;

  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    await formPage.goto();
  });

  test('should display error when submitting empty required fields', async () => {
    // Try to submit without filling any fields
    await formPage.submit();

    // Check that error messages are visible
    await expect(formPage.firstNameError).toBeVisible();
    await expect(formPage.lastNameError).toBeVisible();
    await expect(formPage.emailError).toBeVisible();
    await expect(formPage.agreeError).toBeVisible();
  });

  test('should show firstName error message', async () => {
    await formPage.submit();
    const errorText = await formPage.getFirstNameErrorText();
    expect(errorText).toContain('First name is required');
  });

  test('should show lastName error message', async () => {
    await formPage.submit();
    const errorText = await formPage.getLastNameErrorText();
    expect(errorText).toContain('Last name is required');
  });

  test('should show email error message', async () => {
    await formPage.submit();
    const errorText = await formPage.getEmailErrorText();
    expect(errorText).toContain('Email is required');
  });

  test('should show agree checkbox error message', async () => {
    await formPage.submit();
    const errorText = await formPage.getAgreeErrorText();
    expect(errorText).toContain('You must agree');
  });

  test('should clear errors when filling required fields', async () => {
    // First, submit to show errors
    await formPage.submit();
    await expect(formPage.firstNameError).toBeVisible();

    // Fill the required field
    await formPage.fillFirstName('John');
    await expect(formPage.firstNameError).not.toBeVisible();
  });

  test('should allow submission when all required fields are filled', async ({ page }) => {
    // Fill all required fields
    await formPage.fillFirstName('John');
    await formPage.fillLastName('Doe');
    await formPage.fillEmail('john@example.com');
    await formPage.checkAgree();

    // Submit form
    await formPage.submit();

    // Check for success message instead of errors
    await expect(formPage.successMessage).toBeVisible();
    const successText = await formPage.getSuccessMessageText();
    expect(successText).toContain('Form submitted successfully');
  });

  test('should require firstName field', async () => {
    await formPage.fillLastName('Doe');
    await formPage.fillEmail('john@example.com');
    await formPage.checkAgree();
    await formPage.submit();

    await expect(formPage.firstNameError).toBeVisible();
  });

  test('should require lastName field', async () => {
    await formPage.fillFirstName('John');
    await formPage.fillEmail('john@example.com');
    await formPage.checkAgree();
    await formPage.submit();

    await expect(formPage.lastNameError).toBeVisible();
  });

  test('should require email field', async () => {
    await formPage.fillFirstName('John');
    await formPage.fillLastName('Doe');
    await formPage.checkAgree();
    await formPage.submit();

    await expect(formPage.emailError).toBeVisible();
  });

  test('should require agree checkbox', async () => {
    await formPage.fillFirstName('John');
    await formPage.fillLastName('Doe');
    await formPage.fillEmail('john@example.com');
    await formPage.submit();

    await expect(formPage.agreeError).toBeVisible();
  });

  test('should allow phone field to be optional', async () => {
    // Don't fill phone field
    await formPage.fillFirstName('John');
    await formPage.fillLastName('Doe');
    await formPage.fillEmail('john@example.com');
    await formPage.checkAgree();
    await formPage.submit();

    // Phone error should not be visible
    await expect(formPage.phoneError).not.toBeVisible();
    // Success message should be visible
    await expect(formPage.successMessage).toBeVisible();
  });

  test('should allow message field to be optional', async () => {
    // Don't fill message field
    await formPage.fillFirstName('John');
    await formPage.fillLastName('Doe');
    await formPage.fillEmail('john@example.com');
    await formPage.checkAgree();
    await formPage.submit();

    // Message error should not be visible
    await expect(formPage.messageError).not.toBeVisible();
    // Success message should be visible
    await expect(formPage.successMessage).toBeVisible();
  });

  test('should persist required field values on error', async () => {
    // Fill some fields
    await formPage.fillFirstName('John');
    await formPage.fillLastName('Doe');
    await formPage.fillEmail('john@example.com');

    // Submit without checking agree
    await formPage.submit();

    // Verify the filled values are still there
    expect(await formPage.getFirstNameValue()).toBe('John');
    expect(await formPage.getLastNameValue()).toBe('Doe');
    expect(await formPage.getEmailValue()).toBe('john@example.com');
  });

  test('should show multiple errors at once', async () => {
    await formPage.submit();

    const allErrors = await formPage.getAllErrorMessages();
    expect(allErrors.length).toBeGreaterThan(1);
  });
});
