// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


// DIBK Design
import { Button } from 'dibk-design';

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
      <Link to="/Skjema/Ansvarsrett/3/">
        <Button content="Eksempelskjema"></Button>
      </Link>
    </Container>)
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
