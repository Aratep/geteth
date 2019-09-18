import React from 'react';
import {NavLink} from 'react-router-dom';
import {Element} from 'react-scroll';
import coinFlip from '../../assets/icons/coin-flip/coin-flip.png';
import dice from '../../assets/icons/dice/dice.png';
import twoDice from '../../assets/icons/two-dice/two-dice.png';
import etheroll from '../../assets/icons/etheroll/etheroll.png';
import text from '../../assets/text/games.json';
import {connect} from 'react-redux';

const Game = ({
  icon,
  introText,
  betText,
  coefficient,
  link,
  name,
  playButtonText
}) => (
  <div className="col-lg-3 col-sm-6">
    <div className="game">
      <div className="game-icon">
        <img src={icon} alt={name} />
      </div>
      <div className="game-name">{name}</div>
      <div className="game-text">
        {introText}
        <br />
        {betText + ' ' + coefficient}x
      </div>
      <NavLink to={`/${link}`} className="game-link button">
        {playButtonText}
      </NavLink>
    </div>
  </div>
);

class Games extends React.Component {
  render() {
    const {lang, coefficient, isLoaded} = this.props;
    if (isLoaded) {
      const coinCoefficient = (coefficient * 2).toFixed(2);
      const diceCoefficient = (coefficient * 6).toFixed(2);
      const twoDiceCoefficient = (coefficient * 36).toFixed(2);
      const etherollCoefficient = coefficient * 100;
      const games = [
        {
          icon: coinFlip,
          name: text[lang].coin.name,
          introText: text[lang].coin.introText,
          betText: text[lang].coin.betText,
          link: 'getcoin',
          coefficient: coinCoefficient
        },
        {
          icon: dice,
          name: text[lang].dice.name,
          introText: text[lang].dice.introText,
          betText: text[lang].dice.betText,
          link: 'getdice',
          coefficient: diceCoefficient
        },
        {
          icon: twoDice,
          name: text[lang]['two-dice'].name,
          introText: text[lang]['two-dice'].introText,
          betText: text[lang]['two-dice'].betText,
          link: 'get2dice',
          coefficient: twoDiceCoefficient
        },
        {
          icon: etheroll,
          name: text[lang].etheroll.name,
          introText: text[lang].etheroll.introText,
          betText: text[lang].etheroll.betText,
          link: 'getroll',
          coefficient: etherollCoefficient
        }
      ];
      return (
        <Element name="games">
          <div className="games-container">
            <div className="container">
              <div className="row no-gutters">
                {games.map((game, idx) => (
                  <Game {...game} playButtonText={text[lang].playButton} key={`game-${idx}`} />
                ))}
              </div>
            </div>
          </div>
        </Element>
      );
    } else {
      return null;
    }
  }
}

export default connect(state => ({
  lang: state.lang,
  coefficient: state.parameters.coefficient,
  isLoaded: state.parameters.isLoaded
}))(Games);
