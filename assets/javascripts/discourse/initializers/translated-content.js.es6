import { withPluginApi } from "discourse/lib/plugin-api";

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
  event.stopPropagation();
  document.cookie = `custom_translation_locale=${lang}`;

  // Bypass the cache to avoid bugs for anonymous users
  document.cookie = '_bypass_cache=true';
  location.reload(true);
  return false;
}

const languages = { 'English': 'en', 'Chinese': 'zh_TW' };

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function initializeTranslatedContent(api) {
  const cookieLang = getCookie('custom_translation_locale');

  // Don't bypass the cache unless the language is updated
  document.cookie = '_bypass_cache=';
  if (cookieLang) {
    setLanguageToLocale(cookieLang);
  } else if (I18n.currentLocale()) {
    setLanguageToLocale(I18n.currentLocale());
  } else {
    setLanguageToLocale('en');
  }
  api.onPageChange(() => {
    const widgetLinks = document.querySelectorAll(`.widget-link`);
    widgetLinks.forEach((node) => {
      Object.keys(languages).forEach(language => {
        const child = node.querySelector(`svg.d-icon-${language}`);
        if (child) {
          node.onclick = onClickFunction(languages[language]);
        }
      });
    });
  });
}

export default {
  name: "translated-content",
  initialize() {
    withPluginApi("0.8.29", initializeTranslatedContent);
  }
};
