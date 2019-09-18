import React from 'react';

export default ({close, text}) => (
  <div className="flying-form">
    <div className="content" dangerouslySetInnerHTML={{__html: text}} />
    <button onClick={close} className="button">
      close
    </button>
  </div>
);
