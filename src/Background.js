import React from 'react';
import _ from 'lodash';
import { exchangeLightThemeRoutes } from "./utils";

import dice1 from './assets/background-icons/dice1.png';
import dice2 from './assets/background-icons/dice2.png';
import dice3 from './assets/background-icons/dice3.png';
import dice4 from './assets/background-icons/dice4.png';
import dice5 from './assets/background-icons/dice5.png';
import dice6 from './assets/background-icons/dice6.png';
import clubs from './assets/background-icons/clubs.png';
import spades from './assets/background-icons/spades.png';
import diamonds from './assets/background-icons/diamonds.png';


const icons = [
    dice1,
    dice2,
    dice3,
    dice4,
    dice5,
    dice6,
    clubs,
    spades,
    diamonds,
];

export default ({location: {pathname}}) => {
    const isOnExchange = exchangeLightThemeRoutes.includes(pathname);
    if (isOnExchange)
        return <div className='background exchange' />;
    else
        return (
            <div className='background'>
                <div className="back-shapes">
                    {_.range(32).map(idx => (
                        <img
                            key={`bgicon-${idx}`}
                            className='floating'
                            style={{
                                top: `${_.random(100)}%`,
                                left: `${_.random(100)}%`,
                                animationDelay: `-${_.random(0, 5, true)}s`
                            }}
                            src={_.sample(icons)}
                            alt=''
                        />
                    ))}
                </div>
            </div>
        );
};
