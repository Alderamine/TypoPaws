import Language from "../languages/language.js";

const select = document.getElementById("language");
select.addEventListener("change", () => {
  Language.changeLang(select.value);
});
