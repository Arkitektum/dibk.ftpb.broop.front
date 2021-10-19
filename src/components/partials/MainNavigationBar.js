// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Button, NavigationBar } from 'dibk-design';

// Stylesheets
import style from 'components/partials/MainNavigationBar.module.scss';

class MainNavigationBar extends Component {

  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(event) {
    event.preventDefault();
    this.props.userManager.signoutRedirect({ 'id_token_hint': this.props.user.id_token });
    this.props.userManager.removeUser();
  }

  render() {
    return (
      <NavigationBar logoLink="https://dibk.no/" openLogoLinkInNewTab>
        {
          this.props.user
            ? (
              <div className={style.buttonContainer}>
                <Button content="Logg ut" size="small" onClick={this.handleLogoutClick} />
              </div>
            )
            : ''
        }
      </NavigationBar>
    )
  }
}

const mapStateToProps = state => ({
  user: state.oidc.user,
  selectedForm: state.selectedForm
});

export default connect(mapStateToProps, null)(MainNavigationBar);
