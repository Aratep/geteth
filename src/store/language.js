export const toggleLanguage = prevLang => {
  if (prevLang === 'eng') window.localStorage.setItem('language', 'rus');
  else window.localStorage.setItem('language', 'eng');

  return {
    type: 'TOGGLE_LANGUAGE'
  };
};

export const changeLanguage = language => {
  window.localStorage.setItem('language', language);
  return {
    type: 'CHANGE_LANGUAGE',
    language
  };
};

const defaultValue = (window.localStorage && window.localStorage.getItem('language')) || 'eng';

export default (
  state = defaultValue,
  action
) => {
  switch (action.type) {
    case 'TOGGLE_LANGUAGE':
      if (state === 'eng') return 'rus';
      return 'eng';
    case 'CHANGE_LANGUAGE':
      return action.language;
    default:
      return state;
  }
};
