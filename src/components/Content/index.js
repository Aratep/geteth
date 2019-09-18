import React from 'react';
import Description from './Description';
import Statisctics from './Statistics';
import Graphs from './Graphs';
import BuyAndSell from './BuyAndSell/index';
import Referral from './Referral';
import Details from './Details';
import Comparision from './Comparison';
import FAQ from './FAQ';
import './style.sass';

export default () => (
  <div className="container index-page">
    <Description />
    <Statisctics />
    <Graphs />
    <BuyAndSell />
    <Referral />
    <Details />
    <Comparision />
    <FAQ />
  </div>
);
