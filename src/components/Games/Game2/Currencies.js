import React from 'react';
import _ from 'lodash';
import currencies from './currensienslist';

const Currency = ({text, img, active, changeCurrency, disabled}) => (
  <div
    onClick={() => {
      if (!disabled) changeCurrency(text);
    }}
    className={`currency ${disabled ? 'disabled' : ''} ${
      active ? 'active' : ''
    }`}
  >
    <img src={img} className="currency-img" alt={text} />
    <div className="currency-text d-none d-sm-block">{text}</div>
  </div>
);

export default props => (
  <div className="currencies">
    {_.map(currencies,
        (currency, idx) => (
        <Currency
          {...props}
          {...currency}
          active={currency.text === props.active}
          key={`currency-${idx}`}
        />
      )
    )}
  </div>
);
