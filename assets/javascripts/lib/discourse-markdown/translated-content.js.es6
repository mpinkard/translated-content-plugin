import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['translated-content'] = !!siteSettings.translated-content-enabled;
});

export function setup(helper) {
  helper.whiteList([
    'p[id=custom-translated-content]',
    'p[lang=en]',
    'p[lang=zh-tw]',
  ]);
}