import Language from "./language.js";
import { uaTyperSet } from "../typerSets/typerSet_ua.js";

const languageSet = new Map();

languageSet.set("lang__word_count", "Кількість слів");
languageSet.set("lang__punct_percent", "Процент пунктуації");
languageSet.set("lang__about", "О програмі");
languageSet.set(
  "lang__about_par",
  `Typopaws - це вебдодаток, який допоможе вам покращити або просто перевірити
                    навички набору тексту. Мета програми - полегшити навчання Вас на початку
                    знайомства зі швидким друком та відстежувати свій прогрес. На сайті відсутня 
                    реклама, що дозволяє краще зосередитись на друці.`
);
languageSet.set("lang__type_faster", "Бажаєте друкувати швидше?");
languageSet.set(
  "lang__type_fater_par",
  `
                    Тренуйтеся якомога більше. Вдосконалюйте свої результати (кількість помилок, 
                    кількість слів за хвилину). Пам'ятайте, що швидкість друку здебільшого 
                    залежить від на мускульної пам’яті.
                    Ось чому практика - є необхідною складовою.`
);
languageSet.set("lang__res", "Useful resources");
languageSet.set(
  "lang__res_par",
  `Є багато корисних ресурсів та інструментів для всіх
                    зацікавлених у швидкому друці. Наступні сайти - це моя особиста
                     рекомендація`
);
languageSet.set("lang__general", "Загальні");
languageSet.set("lang__select_lang", "Оберіть мову");
languageSet.set("lang__skip_mistakes", "Пропуск помилок");
languageSet.set("lang__apperance", "Вигляд");
languageSet.set("lang__font", "Шрифт");
languageSet.set("lang__bold", "Зробити текст жирним");
languageSet.set("lang__focus", "Фокус");
languageSet.set("lang__points", "Показувати бали");
languageSet.set("lang__custom_text", "Власний текст");
languageSet.set("lang__custom_text_placeholder", "Вставте свій текст...");

languageSet.set("lang__my_website", "Мій сайт");
languageSet.set("lang__contact_me", "Зв'язатися зі мною");
languageSet.set("lang__mail", "Пошта");

languageSet.set("lang__result", "Результат");
languageSet.set("lang__speed", "Швидкість");
languageSet.set("lang__accuracy", "Точність");
languageSet.set("lang__points", "Бали");
languageSet.set("lang__restart", "Почати заново");
languageSet.set("lang__progress", "Прогрес");
languageSet.set("lang__typing_speed", "Швидкість друку");
languageSet.set("lang__typing_ac", "Точність друку");

export const ua = new Language("UA", languageSet, uaTyperSet, "ua_keyboard");
