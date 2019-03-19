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

const onClickFunction = (lang) => (event) => {
  event.preventDefault();
  document.cookie = `custom_translation_locale=${lang}`;
  location.reload(true);
  return false;
}

const languages = { 'English': 'en', 'Chinese': 'zh_TW' };

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function initializeTranslatedContent(api) {
  const currentUser = api.getCurrentUser();
  const cookieLang = getCookie('custom_translation_locale');
  if (cookieLang) {
    setLanguageToLocale(cookieLang);
  } else if (I18n.currentLocale()) {
    setLanguageToLocale(I18n.currentLocale());
  } else {
    setLanguageToLocale('en');
  }
  window.onload = () => {
    const widgetLinks = document.querySelectorAll(`.widget-link`);
    widgetLinks.forEach((node) => {
      Object.keys(languages).forEach(language => {
        const child = node.querySelector(`svg.d-icon-${language}`);
        if (child) {
          node.onclick = onClickFunction(languages[language]);
        }
      });
    });
  }
}

export default {
  name: "translated-content",
  initialize() {
    withPluginApi("0.8.29", initializeTranslatedContent);
  }
};
