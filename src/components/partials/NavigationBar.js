// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

// Stylesheets
import style from 'components/partials/NavigationBar.module.scss';

class NavigationBar extends Component {

  render() {
    return (<nav className={style.navigationBar}>
      <span className={style.appName}>React Redux Boilerplate</span>
      <ul className={style.links}>
        <li className={style.link}>
          <NavLink to='/' exact={true} activeClassName={style.activeLink}>Home</NavLink>
        </li>
        <li className={style.link}>
          <NavLink to='/commits' activeClassName={style.activeLink}>Commits</NavLink>
        </li>
      </ul>
    </nav>)
  }
}

export default connect(null, null)(NavigationBar);
