const path = require('path');

module.exports = {
  i18n: {
    locales: ['pt-BR', 'en', 'es'],
    defaultLocale: 'pt-BR',
    localePath: path.resolve('./public/locales'),
  },
};
