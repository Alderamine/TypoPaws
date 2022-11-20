import Language from "./language.js";
import { enTyperSet } from "../typerSets/typerSet_en.js";

const languageSet = new Map();

languageSet.set("lang__word_count", "Word count");
languageSet.set("lang__punct_percent", "Punctuation percent");
languageSet.set("lang__about", "About");
languageSet.set(
  "lang__about_par",
  `
  The blind typing method, or the ten-finger typing method, refers to typing text "blindly" or, in other words, without looking at the keys of the typewriter or the keys of the computer keyboard. At the same time, all ten fingers are used (although it is possible to use less fingers), it has existed for more than 120 years.
<br>Words/characters per minute, usually abbreviated wpm (sometimes capitalized WPM), is the number of words a person types per minute and is often used to measure typing speed.
  TypoPaws is an online tool to help you improve or just check
                    your typing skills. Its main purpose is to give you a start
                    in your typing journey with the ability to track your
                    performance after each try. TypoPaws is completely free and
                    without ads, allowing you to focus more on typing.`
);
languageSet.set("lang__type_faster", "Want to type faster?");
languageSet.set(
  "lang__type_fater_par",
  `
                    Practice typing as much as you can. Type a lot and practice
                    typing tests. Improve your words per minute typing results,
                    and test your typing speed often. Remember, that your typing
                    speed mostly relies on the muscle memory of your fingers.
                    That’s why it’s highly important to practice a lot. If you
                    are a busy person, It’s a good begginer strategy to take
                    typing breaks, meaning type at least 10 minutes every
                    30-60minutes of work.`
);
languageSet.set("lang__res", "Useful resources");
languageSet.set(
  "lang__res_par",
  `There are plenty of useful resources and tools for everyone
                    interested in fast typing. The following sites are my
                    personal recomendation`
);
languageSet.set("lang__general", "General");
languageSet.set("lang__select_lang", "Select language");
languageSet.set("lang__skip_mistakes", "Skip mistakes");
languageSet.set("lang__apperance", "Appearance");
languageSet.set("lang__font", "Select font");
languageSet.set("lang__bold", "Make text bold");
languageSet.set("lang__focus", "Focus mode");
languageSet.set("lang__points", "Display points");
languageSet.set("lang__custom_text", "Custom text");
languageSet.set("lang__custom_text_placeholder", "Start typing here...");

languageSet.set("lang__my_website", "My website");
languageSet.set("lang__contact_me", "Contact me");
languageSet.set("lang__mail", "Mail");

languageSet.set("lang__result", "Your result");
languageSet.set("lang__speed", "Speed");
languageSet.set("lang__accuracy", "Accuracy");
languageSet.set("lang__points", "Points");
languageSet.set("lang__restart", "Restart");
languageSet.set("lang__progress", "Your progress");
languageSet.set("lang__typing_speed", "Typing Speed");
languageSet.set("lang__typing_ac", "Typing Accuracy");

languageSet.set("lang__your_file", "Your file (.txt)");
languageSet.set("lang__choose", "Choose file");

export const en = new Language("EN", languageSet, enTyperSet, "en_keyboard");
