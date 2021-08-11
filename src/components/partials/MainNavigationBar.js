// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { NavigationBar } from 'dibk-design';


class MainNavigationBar extends Component {

  render() {
    return (<NavigationBar logoLink="/dibk.ftpb.broop.front/" />)
  }
}

export default connect(null, null)(MainNavigationBar);
