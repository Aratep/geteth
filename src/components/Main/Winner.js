import React from 'react';
import styled from 'styled-components';

export default ({address, win}) => (
  <div className="winner">
    <div className="row">
      <div className="col d-flex justify-content-center align-items-center">
        <a href="#" className="link">
          {address}
        </a>
        <div className="win">
          {win}
          <span>ETH</span>
        </div>
      </div>
    </div>
  </div>
);
