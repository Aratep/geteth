import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default () => (
  <div>
    <Header isOnExchange={true} />
    <div
      className="d-flex justify-content-center align-items-center"
      style={{height: '100vh', width: '100%'}}
    >
      <h1>See you soon</h1>
    </div>
    <Footer />
  </div>
);
