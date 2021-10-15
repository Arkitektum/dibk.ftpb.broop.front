// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// DIBK Design
import { Button, NavigationBar } from 'dibk-design';

// Actions
import { signOut } from 'actions/IsSignedInActions';

// Stylesheets
import style from 'components/partials/MainNavigationBar.module.scss';

class MainNavigationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    }
    this.handleOnLogOut = this.handleOnLogOut.bind(this);
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      this.setState({ redirect: null });
    }
  }

  handleOnLogOut() {
    this.props.signOut();
    this.setState({
      redirect: `/skjema/${this.props.selectedForm.referanseId}`
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <NavigationBar logoLink="https://dibk.no/" openLogoLinkInNewTab>
          <div className={style.buttonContainer}>
            <Button content="Logg ut" size="small" onClick={() => this.handleOnLogOut()} />
          </div>
        </NavigationBar>
      )
    }
  }
}

const mapStateToProps = state => ({
  selectedForm: state.selectedForm
});

const mapDispatchToProps = {
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigationBar);
