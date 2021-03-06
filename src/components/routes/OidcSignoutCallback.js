// Dependencies
import React from "react";
import { connect } from "react-redux";
import { SignoutCallbackComponent } from "redux-oidc";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


class SignoutCallbackPage extends React.Component {
    successCallback = () => {
        const pathname = this.props.oidc?.user?.state?.signoutRedirectPath || '';
        this.props.history.push(pathname);
    };

    render() {
        return (
            <SignoutCallbackComponent
                userManager={this.props.userManager}
                successCallback={this.successCallback}
                errorCallback={error => {
                    this.props.history.push("/");
                    console.error(error);
                }}
            >
                <div>Logger ut...</div>
            </SignoutCallbackComponent>
        );
    }
}

SignoutCallbackPage.propTypes = {
    userManager: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ oidc: state.oidc });

export default withRouter(connect(mapStateToProps, null)(SignoutCallbackPage));
