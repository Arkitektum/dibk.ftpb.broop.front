// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { NavigationBar } from 'dibk-design';


class MainNavigationBar extends Component {

  render() {
    return (<NavigationBar logoLink="/" />)
  }
}

export default connect(null, null)(MainNavigationBar);
