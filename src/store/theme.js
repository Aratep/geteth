export const toggleTheme = prevTheme => {
  if (prevTheme === 'dark') window.localStorage.setItem('theme', 'light');
  else window.localStorage.setItem('theme', 'dark');
  return {
    type: 'TOGGLE_THEME'
  };
};

const defaultValue = (window.localStorage && window.localStorage.getItem('theme')) || 'dark';

export default (
  state = defaultValue,
  action
) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      if (state === 'dark') return 'light';
      return 'dark';
    default:
      return state;
  }
};
