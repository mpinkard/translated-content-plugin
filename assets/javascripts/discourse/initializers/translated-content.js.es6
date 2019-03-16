import { withPluginApi } from "discourse/lib/plugin-api";

const titleTranslations = {
  '8': '歡迎來到舊金山無乙型肝炎的免費網上支挼小組',
}

function getNavigatorLanguage() {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    // Fallback to English
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
  }
}

function setLanguageToLocale(locale) {
  // We want to use traditional characters, so let's use Taiwanese Chinese
  const chineseLanguageCode = 'zh-tw';
  const englishLanguageCode = 'en';
  if (locale.startsWith('zh')) {
    document.getElementsByTagName('html')[0].setAttribute('lang', chineseLanguageCode);
  } else {
    // If anyone comes in with any other language codes, fallback to English
    document.getElementsByTagName('html')[0].setAttribute('lang', englishLanguageCode);
  }
}

// Hopefully this won't be slow, even with lots of translations. We will try to keep them to a minimum though
function translateTitles() {
  const keys = Object.keys(titleTranslations);
  for (const key of keys) {
    const titles = document.getElementsByClassName('title-wrapper');
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const h1 = title.getElementsByTagName('h1')[0];
      if (h1.getAttribute('data-topic-id') && h1.getAttribute('data-topic-id') === key) {
        const a = h1.getElementsByClassName('fancy-title')[0];
        a.innerHTML = titleTranslations[key];
      }
    }
  }
}

function initializeTranslatedContent(api) {
  const currentUser = api.getCurrentUser();
  if (currentUser) {
    setLanguageToLocale(I18n.currentLocale());
  } else {
    setLanguageFromHtml(getNavigatorLanguage());
  }
  window.onload = translateTitles;
}

export default {
  name: "translated-content",
  initialize() {
    withPluginApi("0.8.29", initializeTranslatedContent);
  } 
};
