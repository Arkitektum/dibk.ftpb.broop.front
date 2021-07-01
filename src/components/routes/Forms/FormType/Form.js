// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Template
import Container from 'components/template/Container';

// Actions
import { fetchForm } from 'actions/FormActions';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: null
        }
    }

    componentDidMount() {
        const formId = this.props.match.params.formId;
        const formType = this.props.match.params.formType;
        this.props.fetchForm(formType, formId).then((response) => {
            const form = response?.payload || null;
            this.setState({ form });
        });
    }


    render() {
        const formId = this.props.match.params.formId;
        const formType = this.props.match.params.formType;
        const form = this.state.form;
        return form 
        ? (
        <Container>
            <h1>{formType}</h1>
            Skjema med id: {formId}
        </Container>)
        : (
        <Container>
            <p>Henter skjema</p>
        </Container>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
    fetchForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);


