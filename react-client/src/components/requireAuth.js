import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { Redirect, Link } from 'react-router-dom';

export default ChildComponent => {
  class ComposedComponent extends Component {

    render() {
      const { auth } = this.props;
      if (!auth.uid) return <Redirect to="/signin" /> 
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.firebase.auth };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
