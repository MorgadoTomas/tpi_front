import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { children } = this.props;

    const isAuthenticated = localStorage.getItem('token'); 

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  }
}

export default PrivateRoute;