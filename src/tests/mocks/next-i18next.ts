export const t = jest.fn(key => key);

export const useTranslation = jest.fn(() => ({
  t,
}));

export const nextI18Next = {
  useTranslation,
};
