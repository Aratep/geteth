import React from 'react';
import Game from '../components/Games/Game2';
import Meta from "../components/Meta";


const trustLink = 'https://links.trustwalletapp.com/ydpAJn6dfU';
const onValueClickHandler = function(value) {
  const values = this.state.bet.values;
  if (value !== values[0]) {
    this.setState({
      bet: {
        ...this.state.bet,
        values: [value]
      }
    });
  }
};

export default () => (
    <div>
        <Game
          trustLink={trustLink}
          gameName="coin"
          onValueClickHandler={onValueClickHandler}
        />
        <Meta page='getcoin' />
    </div>
);
