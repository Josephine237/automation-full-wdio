import { username, password } from "./fixtures.js";

describe("Login Page", () => {

  beforeEach(() => {
    browser.reloadSession();
    browser.url("/prihlaseni");

    // const windowSize = browser.getWindowSize();
    // console.log(windowSize);

    // const allCookies = browser.getCookies();
    // console.log(allCookies);
    // browser.saveScreenshot("login_page.png");

    // // toto se nikdy nepoužívá používá se waitForExist - toto totiž čeká jen do té doby, než něco vznikne nebo se objeví => skracuje dobu čekání
    // browser.pause(5000);
  })

  // kliknout pouze na tlačítko button a check, že se nepřihlásil
  it("should not login with no credentials", () => {

    const emailField = $("#email");
    const passwordField = $("#password");
    const loginButton = $(".btn-primary");
  
    emailField.setValue();
    passwordField.setValue();
    loginButton.click();

    // tady bych měla ověřit, že buď vyskočila hláška nebo, že jsem stále na stránce přihlášení
    // tady teda použiju speciální webdriver selector
    $("=Přihlásit").click();
    // const errorMessage = $(".invalid-feedback");
    // console.log(errorMessage.getText());    
  });

  // správný email a nesprávné heslo + uživatel se nepřihlásil error message
  it("should not login with invalid credentials", () => {
    const emailField = $("#email");
    const passwordField = $("#password");
    const loginButton = $(".btn-primary");

    emailField.setValue(username);
    passwordField.setValue("1234");
    loginButton.click();

    const errorMessage = $(".invalid-feedback").getText();
    console.log(errorMessage);

  });

  // správné přihlášení
  it("should not login with invalid credentials", () => {

    const emailField = $("#email");
    console.log("Email field is displayed: " + emailField.isDisplayed());
    console.log("Email field is enable: " + emailField.isEnabled());

    const passwordField = $("#password");
    console.log("Password field is displayed: " + passwordField.isDisplayed());
    console.log("Password field is enable: " + passwordField.isEnabled());

    // vypsat text který je na tlačítku přihlášení
    const loginButton = $(".btn-primary");
    console.log("Login button has text: " + loginButton.getText());

    // odkaz na "Zapomněli jste svoje heslo" a vypsat hodnotu jeho atributu href
    const odkaz = $("form").$("a").getAttribute("href");
    console.log("Odkaz na zapomenuté heslo je: " + odkaz);

    // přihlášení do aplikace
    emailField.setValue(username);
    passwordField.setValue(password);
    loginButton.click();

    // vypiš jméno přihlášeného uživatele
    const user = $(".navbar-right").$("strong").getText();
    console.log(user);

  });

  // odhlášení
  it("should logout", () => {

    const emailField = $("#email")
    const passwordField = $("#password")
    const loginButton = $(".btn-primary")
    const navbarRight = $(".navbar-right")
    const odhlasit = $("#logout-link");

    emailField.setValue(username);
    passwordField.setValue(password);
    loginButton.click();
    navbarRight.click();
    odhlasit.click();

  });

});

describe("Application page", () => {
  beforeEach(() => {

    browser.reloadSession();
    browser.url("/prihlaseni");

    $("#email").setValue(username);
    $("#password").setValue(password);
    $(".btn-primary").click();

     //  todle je webdriverIo selektor, pomocí = je to vyhledávání podle textu
    $("=Přihlášky").click();
  })

   // vypiš všechny řádky tabulky bez hlavičky a zápatí + počet řádků tabulky + text každého řádku zvlášt
  it("should list all application", () => {
    const rows = $(".dataTable").$("tbody").$$("tr");
    console.log("There are: " + rows.length + "rows in the table.");
    rows.forEach((row) => {
      console.log(row.getText());
    });

  });

  // vyplnit něco do políčka hledat a opět vypsat všechny řádky tabulky
  it("should filter in applications", () => {
    $("input[type=search]").setValue("lee");
    $("=Hledám").waitForExist({ reverse: true });

    const filteredRows = $(".dataTable").$("tbody").$$("tr");
    console.log(
      "There are " + filteredRows.length + "filtered rows in the table."
    );
    filteredRows.forEach((row) => {
      console.log(row.getText());
    });
  });
})
