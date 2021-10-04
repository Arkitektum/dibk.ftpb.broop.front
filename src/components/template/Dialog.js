// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import style from 'components/template/Dialog.module.scss';

class Dialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setHiddenInputWrapperRef = this.setHiddenInputWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.keyDownFunction = this.keyDownFunction.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener("keydown", this.keyDownFunction, false);
    this.hiddenInputWrapperRef.tabIndex = -1;
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener("keydown", this.keyDownFunction, false);
  }

  keyDownFunction(event) {
    switch (event.keyCode) {
      case 27: // Escape
        if (this.props.onClickOutside) this.props.onClickOutside();
        break;
      default:
        return null;
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setHiddenInputWrapperRef(node) {
    this.hiddenInputWrapperRef = node;
  }



  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClickOutside();
    }
  }


  render() {
    return (<div className={style.dialogOverlay}>
      <div ref={this.setWrapperRef} className={style.dialogContent} style={{ maxWidth: this.props.maxWidth }}>
        <input type="button" ref={this.setHiddenInputWrapperRef} className={style.hidden} autoFocus />
        {this.props.children}
      </div>
    </div>)
  }
};

Dialog.propTypes = {
  maxWidth: PropTypes.string,
  onClickOutside: PropTypes.func.isRequired
};

Dialog.defaultProps = {
  maxWidth: 'none'
};

export default Dialog;
