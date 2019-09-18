import React from 'react';
import {connect} from 'react-redux';
import {changeLanguage} from '../../store/language';
import rus from '../../assets/icons/languages/rus.png';
import eng from '../../assets/icons/languages/eng.png';
import _ from 'lodash';

const languages = {
  rus: {
    img: rus,
    text: 'rus'
  },
  eng: {
    img: eng,
    text: 'eng'
  }
};

const LanguageListItem = ({img, text, onClick}) => (
  <div className="language-list-item" onClick={onClick}>
    <img className="language-list-item-img" src={img} alt={text} />
    <div className="language-list-item-text">{text}</div>
  </div>
);

class Language extends React.Component {
  state = {
    listVisible: false
  };
  toggleVisibility = () => {
    this.setState({listVisible: !this.state.listVisible});
  };
  render() {
    return (
      <div className="language-wrap">
        <LanguageListItem
          onClick={this.toggleVisibility}
          {...languages[this.props.lang]}
        />
        <div
          className={`language-list ${this.state.listVisible ? 'active' : ''}`}
        >
          {_.map(languages, language => (
            <LanguageListItem
              onClick={() => {
                this.props.changeLanguage(language.text);
                this.toggleVisibility();
              }}
              key={`lng-${language.text}`}
              {...language}
            />
          ))}
        </div>
      </div>
    );
  }
}

// const Language = ({lang, toggleLanguage}) => (
//   <div onClick={() => toggleLanguage(lang)} className="language-trigger">
//     <div className={lang === 'rus' ? 'language active' : 'language'}>ru</div>/
//     <div className={lang === 'eng' ? 'language active' : 'language'}>en</div>
//   </div>
// );

export default connect(
  state => ({
    lang: state.lang
  }),
  dispatch => ({
    changeLanguage: language => dispatch(changeLanguage(language))
  })
)(Language);

/*
<div className="circle-container">
    <div className={`circle ${lang}`} />
</div>
 */
