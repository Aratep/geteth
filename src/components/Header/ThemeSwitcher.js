import React from 'react';
import {toggleTheme} from '../../store/theme';
import {connect} from 'react-redux';

const Switcher = ({toggleTheme, theme, lang}) => (
  <div
    style={{marginTop: 20}}
    className="d-flex flex-column justify-content-center align-items-center"
  >
    <div className="theme-toggler-description" style={{fontSize: 12}}>
      {lang === 'eng' ? 'site color' : 'цвет сайта'}
    </div>
    <div className={`theme-toggler ${theme}`}>
      <div onClick={() => toggleTheme(theme)} className="theme-toggler-pipe">
        <div className="theme-toggler-circle" />
      </div>
    </div>
  </div>
);

export default connect(
  state => ({
    theme: state.theme,
    lang: state.lang
  }),
  dispatch => ({
    toggleTheme: prevTheme => dispatch(toggleTheme(prevTheme))
  })
)(Switcher);
