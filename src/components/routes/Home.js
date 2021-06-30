// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateName } from 'actions/NameActions';

// Template
import Container from 'components/template/Container';


class Home extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(value) {
    this.props.updateName(value);
  }
  render() {
    return (<Container>
      <h1>Home</h1>
      <label htmlFor="name-field">Your name: </label>
      <input value={this.props.name} id="name-field" onChange={(event) => this.handleInputChange(event.target.value)} />
      <p>{
        this.props.name && this.props.name.length
          ? `Hello ${this.props.name} 😃`
          : ''
      }</p>
    </Container>)
  }
}

const mapStateToProps = state => ({ name: state.name });

const mapDispatchToProps = {
  updateName
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
