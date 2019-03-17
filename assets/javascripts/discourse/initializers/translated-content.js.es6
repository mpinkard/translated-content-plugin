import { withPluginApi } from "discourse/lib/plugin-api";

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

function initializeTranslatedContent(api) {
  const currentUser = api.getCurrentUser();
  if (currentUser) {
    setLanguageToLocale(I18n.currentLocale());
  } else {
    setLanguageToLocale(getNavigatorLanguage());
  }
}

export default {
  name: "translated-content",
  initialize() {
    withPluginApi("0.8.29", initializeTranslatedContent);
  } 
};
