export default class Language {
  constructor(abbr, languageSet, typerSet, keyboardId) {
    this.abbr = abbr;
    this.languageSet = languageSet;
    this.typerSet = typerSet;
    this.keyboardId = keyboardId;

    Language.languages.push(this);
  }

  static languages = [];

  static changeLang(abbr) {
    let pickedLang = Language.languages.find((lang) => lang.abbr === abbr);
    if (!pickedLang) {
      pickedLang = Language.languages.find((lang) => lang.abbr === "EN");
    }
    localStorage.setItem("lang", pickedLang.abbr);

    Language._langSet(pickedLang.languageSet);
    Language._setKeyboard();
  }

  static getCurrentLang() {
    return Language.languages.find(
      (lang) => lang.abbr === localStorage.getItem("lang")
    );
  }

  static _langSet(langSet) {
    for (let [key, value] of langSet) {
      for (let el of document.getElementsByClassName(key)) {
        if (el.tagName === "TEXTAREA") el.placeholder = value;
        else el.innerHTML = value;
      }
    }
  }

  static _setKeyboard() {
    for (let keyboard of document.getElementsByClassName("keyboard")) {
      if (keyboard.id === Language.getCurrentLang().keyboardId)
        keyboard.style.display = "";
      else keyboard.style.display = "none";
    }
  }
}
