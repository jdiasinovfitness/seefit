export const availableLangs = ['en', 'pt'];

export const loader = (importer: any, root = 'i18n') => {
  return availableLangs.reduce((acc: any, lang) => {
    acc[lang] = () => importer(lang, root);
    return acc;
  }, {});
};
