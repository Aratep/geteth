import React from 'react';
import strings from '../../assets/text/lotery.json';

const navs = [
  {
    value: 'pot'
  },
  {
    value: 'prizes'
  },
  {
    value: 'buy'
  },
  {
    value: 'history'
  }
];

const NavItem = ({onClick, text, active}) => {
  return (
    <div className="col-sm-3 col-6 col-md-12">
      <div
        className={`nav-item  square ${active ? 'active' : ''}`}
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

export default ({onNavItemClick, filter, lang}) => {
  navs.forEach(nav => {
    nav.text = strings[lang].navigation[nav.value];
  });
  return (
    <div className="order-2 order-md-1 row no-gutters nav-items-container ">
      {navs.map((nav, idx) => (
        <NavItem
          onClick={() => onNavItemClick(nav.value)}
          active={filter === nav.value}
          text={nav.text}
          key={`nav-${idx}`}
        />
      ))}
    </div>
  );
};
