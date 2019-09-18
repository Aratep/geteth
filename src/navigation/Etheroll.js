import React from 'react';
import Game from '../components/Games/Game2';
import Meta from "../components/Meta";


const trustLink = 'https://links.trustwalletapp.com/acnbnHhefU';
const onValueClickHandler = function(value) {
    this.setState({
        bet: {
            ...this.state.bet,
            values: [value]
        },
        chances: {
            ...this.state.chances,
            chance: value / 100
        }
    });
};

export default () => (
    <div>
        <Game
            trustLink={trustLink}
            gameName="etheroll"
            onValueClickHandler={onValueClickHandler}
        />
        <Meta page='getroll' />
    </div>
);
