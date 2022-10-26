import { username, password } from "./fixtures.js";

describe("Login Page", () => {

  beforeEach(() => {
    browser.reloadSession();
    browser.url("/prihlaseni");
  });

  it("should show login form", () => {

    const emailField = $('#email');
    expect(emailField).toBeDisplayed();
    expect(emailField).toBeEnabled();

    const passwordField = $('#password');
    expect(passwordField).toBeDisplayed();
    expect(passwordField).toBeEnabled();

    const loginButton = $(".btn-primary");
    expect(loginButton).toBeDisplayed();
    expect(loginButton).toBeEnabled();   
  });

    // správné přihlášení   
  it("should login with valid credentials", () => {
    const emailField = $("#email");
    const passwordField = $("#password");
    const loginButton = $(".btn-primary");

    emailField.setValue(username);
    passwordField.setValue(password);
    loginButton.click();

    const userNameDropdown = $('.navbar-right').$('[data-toggle="dropdown"]');
    expect(userNameDropdown).toHaveText(/.*\s.+/);
  });

  // přihlášení s nesprávnými údaji
  it("should not login with invalid credentials", () => {
    const emailField = $("#email");
    const passwordField = $("#password");
    const loginButton = $(".btn-primary");
  
    emailField.setValue(username);
    passwordField.setValue('invalid');
    loginButton.click();

    // vypsat text který je na tlačítku přihlášení
    expect(loginButton).toHaveText('Přihlásit');

    // na stránce je jednak tosast message
    const toastMessage = $('.toast-message');
    expect(toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');

    // ale také validační message ve formuláři
    const errorMessage = $(".invalid-feedback");
    expect(errorMessage).toHaveText('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

    // odkaz na "Zapomněli jste svoje heslo" a vypsat hodnotu jeho atributu href
    const odkaz = $("form").$("a").getAttribute("href");
    console.log("Odkaz na zapomenuté heslo je: " + odkaz);

    expect(emailField).toBeDisplayed();
    expect(passwordField).toBeDisplayed();
    expect(loginButton).toBeDisplayed();
  });

  // odhlášení
  it("should logout", () => {
    const emailField = $("#email");
    const passwordField = $("#password");
    const loginButton = $(".btn-primary");
    const navbarRight = $(".navbar-right");
    const userNameDropdown = navbarRight.$('[data-toggle="dropdown"]');
    const odhlasit = $("#logout-link");

    emailField.setValue(username);
    passwordField.setValue(password);
    loginButton.click();

    expect(userNameDropdown).toHaveText(/.*\s.+/)

    navbarRight.click();
    odhlasit.click();

    expect(userNameDropdown).not.toBeDisplayed();
    expect(navbarRight).toHaveText('Přihlásit')
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
      const columns = row.$$('td')
    // první sloupec (=> to je ta [0] ) je jméno, jména jsou špatně validovaná, může tam být cokoliv (třeba japonská)
    expect(columns[0]).toHaveText(/.*\s.+/);
    expect(columns[1]).toHaveText(/\d{1,2}\.\d{1,2}.\s-\s\d{1,2}\.\d{1,2}.\d{4}/);
    expect(columns[2]).toHaveText(/Složenka|Bankovní převod|FKSP|Hotově/);
    // expect(columns[3]).toHaveText();
 
    });

  });

  // vyplnit něco do políčka hledat a opět vypsat všechny řádky tabulky
  it("should filter in applications", () => {
    $("input[type=search]").setValue("lee");
    $("=Hledám").waitForExist({ reverse: true });

    const filteredRows = $(".dataTable").$("tbody").$$("tr");
    expect(rows).toHaveLength(2);
    filteredRows.forEach((row) => {
      console.log(row.getText());
    });
  });
})

describe("Orders page", () => {
  beforeEach(() => {
    browser.reloadSession();
    browser.url("/prihlaseni");

    $("#email").setValue(username);
    $("#password").setValue(password);
    $(".btn-primary").click();

    $("=Objednávky").click();
  })

  it("should list all orders", () => {
    const orderRows = $(".dataTable").$("tbody").$$("tr")
    console.log("There are " + orderRows.length + "rows in the table")
    orderRows.forEach((orderRow) => {
      console.log(orderRow.getText());
    })
  })
})



