import React from 'react'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import { RootState } from '../../redux_store/rootReducer';

const AuthIsLoaded = ({ children }) => {
  // const auth = useSelector<RootState>(state => {console.log("authisloaded state", state)})
  // if (!isLoaded(auth)) return <div>Loading...</div>;
  return children
};

export default AuthIsLoaded;