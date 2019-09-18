import React from 'react';

import coin from '../../assets/icons/coin-flip/coin-flip.png';
import dice from '../../assets/icons/dice/dice.png';
import twoDice from '../../assets/icons/two-dice/two-dice.png';
import etheroll from '../../assets/icons/etheroll/etheroll.png';
import { connect } from 'react-redux';
import games from '../../assets/text/games.json';

const GameName = ({ gameName, lang }) => {
  let title;
  let image;
  // let text;
  switch (gameName) {
    case 'coin':
      title = games[lang].coin.name;
      // text = games[lang].coin.description;
      image = coin;
      break;
    case 'dice':
      title = games[lang].dice.name;
      // text = games[lang].dice.description;
      image = dice;
      break;
    case 'two-dice':
      title = games[lang]['two-dice'].name;
      // text = games[lang]['two-dice'].description;
      image = twoDice;
      break;
    case 'etheroll':
      title = games[lang].etheroll.name;
      // text = games[lang].etheroll.description;
      image = etheroll;
      break;
    default:
      break;
  }
  return (
    <div className="game-name">
      <img src={image} alt={title} /> <h1 className="game-name-text">{title}</h1>
      <div
        className="question"
        onClick={() =>
          alert('Проекта ждет все больше и больше людей с каждым часом!')
        }
      />
    </div>
  );
};

export default connect(state => ({
  lang: state.lang
}))(GameName);
