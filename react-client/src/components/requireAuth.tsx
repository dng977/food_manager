import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FirebaseReducer } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { RootState } from '../redux_store/rootReducer';

export default ChildComponent => {
  interface Props {
    auth: FirebaseReducer.Reducer,
    [key: string]: any
  }
  class ComposedComponent extends Component<Props> {
    render() {
      const { auth } = this.props;
      console.log('auth', auth);
      //@ts-ignore
      if (!auth.uid) return <Redirect to="/signin" /> 
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state: RootState) {
    //@ts-ignore
    return { auth: state.firebase.auth };
  }

  //@ts-ignore
  return connect(mapStateToProps)(ComposedComponent);
};
