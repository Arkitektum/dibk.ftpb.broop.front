// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, DragAndDropFileInput, Header, InputField } from 'dibk-design';

// Actions
import { updateSelectedForm, saveSelectedForm } from 'actions/FormActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';


class Vedlegg extends Component {

    render() {
        const formData = this.props.selectedForm?.formData;
        return formData
            ? (
                <React.Fragment>
                    <div className={formsStyle.headerSection}>
                        <Header content="Last opp vedlegg"></Header>
                    </div>
                    <DragAndDropFileInput id="vedlegg" label="Legg til vedlegg" buttonContent="Velg fil" onSelectChange={() => console.log('Select change')} onDragAndDropChange={() => console.log('Drag and drop change')} />
                    <div className={formsStyle.buttonRow}>
                        <Link to={{ pathname: 'erklaeringenGjelder', search: window.location.search }}>
                            <Button color="primary" content="Forrige" arrow='left' />
                        </Link>
                        <Link to={{ pathname: 'sluttrapport', search: window.location.search }}>
                            <Button color="primary" content="Neste" arrow='right' />
                        </Link>
                    </div>
                </React.Fragment>
            )
            : (
                <p>Ingen data om ansvarlig søker</p>
            )
    }
}

const mapStateToProps = state => ({
    selectedSubmission: state.selectedSubmission,
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    updateSelectedForm,
    saveSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Vedlegg);
