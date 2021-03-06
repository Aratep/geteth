import React from 'react';
import styled from 'styled-components';
import Rheostat from 'rheostat';
import 'rheostat/initialize';
import text from '../../assets/text/games.json';
import {connect} from 'react-redux';

import dice1 from '../../assets/icons/dice/dice1.png';
import dice2 from '../../assets/icons/dice/dice2.png';
import dice3 from '../../assets/icons/dice/dice3.png';
import dice4 from '../../assets/icons/dice/dice4.png';
import dice5 from '../../assets/icons/dice/dice5.png';
import dice6 from '../../assets/icons/dice/dice6.png';
import heads from '../../assets/icons/coin-flip/heads.png';
import tails from '../../assets/icons/coin-flip/tails.png';
import sum from '../../assets/icons/two-dice/sum1.png';

const diceIcons = [null, dice1, dice2, dice3, dice4, dice5, dice6];

const Values = ({gameName, values, onValueClick, recalculateMaxBet, lang}) => {
  switch (gameName) {
    case 'coin':
      return (
        <div className="values-container">
          <Active
            width={70}
            active={values[0] === 0}
            onClick={() => {
              onValueClick(0);
              setTimeout(() => recalculateMaxBet(), 0);
            }}
          >
            <img src={heads} />
          </Active>
          <Active
            width={70}
            active={values[0] === 1}
            onClick={() => {
              onValueClick(1);
              setTimeout(() => recalculateMaxBet(), 0);
            }}
          >
            <img src={tails} />
          </Active>
          <div className="description">{text[lang].coin.valuesDescription}</div>
        </div>
      );
    case 'dice':
      const dices = [];
      for (let i = 1; i < 7; i++)
        dices.push(
          <Active
            active={values.includes(i)}
            onClick={() => {
              onValueClick(i);
              setTimeout(() => recalculateMaxBet(), 0);
            }}
            width={60}
          >
            <img src={diceIcons[i]} />
          </Active>
        );
      return (
        <div className="values-container" style={{width: '70%'}}>
          {dices}
          <div className="description">{text[lang].dice.valuesDescription}</div>
        </div>
      );
    case 'two-dice':
      const sums = [];
      for (let i = 2; i < 13; i++)
        sums.push(
          <Active
            width={65}
            active={values.includes(i)}
            onClick={() => {
              onValueClick(i);
              setTimeout(() => recalculateMaxBet(), 0);
            }}
          >
            <Sum number={i}>
              <img src={sum} />
            </Sum>
          </Active>
        );
      return (
        <div className="values-container">
          {sums}
          <div className="description">
            {text[lang].twoDice.valuesDescription}
          </div>
        </div>
      );
    case 'etheroll':
      return (
        <div className="values-container">
          <div className="rheostat-container">
            <Rheostat
              min={1}
              max={97}
              values={values}
              onValuesUpdated={value => {
                onValueClick(value.values[0]);
                setTimeout(() => recalculateMaxBet(), 0);
              }}
            />
            <div className="labels">
              <div>1%</div>
              <div>25%</div>
              <div>50%</div>
              <div>75%</div>
              <div>97%</div>
            </div>
          </div>
          <div className="description">
            {text[lang].etheroll.valuesDescription}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default connect(state => ({
  lang: state.lang
}))(Values);

const Active = styled.div`
  outline: none;
  user-select: none;
  width: ${props => props.width}px;
  img {
    pointer-events: none;
    width: 100%;
  }
  transition: all 0.3s ease;
  opacity: ${props => (props.active ? 1 : 0.2)};
  margin: 7px;
  position: relative;
`;

const Sum = styled.div`
	position: relative;
  img {
    width: 100%;
  }
  :after {
    position: absolute;
    top: 50%;
		left: 45%;
		transform: translate(-50%, -50%);
		color: #fff;
		font-weight: 400;
		font-size: 22px;
		margin: auto;
		color: #000;
    content: '${props => props.number}';
  }
`;
