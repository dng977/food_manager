import React from 'react';
import Header from './Header';
import { Redirect } from 'react-router-dom';

export default () => {
  return (
    <>
      <Redirect from="/" to="/signin"/>
      <h3>Welcome! </h3>
    </>
  );
};
