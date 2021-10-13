import React from 'react';
import PropTypes from 'prop-types';
import style from './Snackbar.module.scss';

class Snackbar extends React.Component {

    render() {
        return <div className={style.snackbarContainer}>
            <div className={style.snackbarContent}>
                {this.props.message}
                <button onClick={this.props.onClickOutside} className={style.closeButton}></button>
            </div>
        </div>;
    }
};

Snackbar.propTypes = {
    /** Message content inside snackbar */
    message: PropTypes.string,
    /** Function for click on close button element */
    onCloseClick: PropTypes.func.isRequired,
};

export default Snackbar;
