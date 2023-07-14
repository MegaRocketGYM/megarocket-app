/* eslint-disable no-undef */
class LoginPage {
  get logoMegarocket() {
    return $('logo-megarocket-login');
  }

  get titleLogin() {
    return $('h2');
  }

  get inputEmail() {
    return $('#login-input-email');
  }

  get inputPassword() {
    return $('login-input-password');
  }

  get inputRecoveryEmail() {
    return $('#recovery-password-input-email');
  }

  get inputRepeatEmail() {
    return $('#recovery-password-input-repeat-email');
  }

  get errorMessageEmail() {
    return $('#login-input-email-error');
  }

  get errorMessagePassword() {
    return $('#login-input-password-error');
  }

  get btnSignIn() {
    return $('#login-button-submit');
  }

  get eyeBtnPassword() {
    return $('#login-eye-button');
  }

  get linkForgotPassword() {
    return $('#login-button-forgot-password');
  }

  get linkCreateAnAccount() {
    return $('#login-button-create-account');
  }

  get modalRecoveryPasswordLogin() {
    return $('');
  }

  async clickOnIconLogin() {
    await this.iconLogin.click();
  }

  async login(email, password) {
    await browser.pause(2000);
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
  }

  async clickOnBtnSubmit() {
    await this.btnSubmit.click();
  }
}

module.exports = new LoginPage();
