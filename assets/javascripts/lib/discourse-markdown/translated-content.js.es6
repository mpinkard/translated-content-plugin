import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['translated-content'] = !!siteSettings.translated-content-enabled;
});

export function setup(helper) {
  helper.whiteList([
    'div[id=custom-translated-content]',
    'div[lang=en]',
    'div[lang=zh-tw]',
  ]);
}