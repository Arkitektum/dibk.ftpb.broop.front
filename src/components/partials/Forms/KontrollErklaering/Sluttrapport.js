// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, CheckBoxListItem, Header, Paper } from 'dibk-design';

// Actions
import { updateSelectedForm, saveSelectedForm } from 'actions/FormActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class Sluttrapport extends Component {

    toggleAnsvarsrettKontrollerendeValue(property, kontrollerende) {
        const newValue = !kontrollerende?.[property];

        switch (property) {
            case 'ingenAvvik':
                return newValue
                    ? {
                        ingenAvvik: true,
                        observerteAvvik: false,
                        aapneAvvik: false
                    }
                    : {
                        ...kontrollerende,
                        ingenAvvik: false,
                    }
            case 'observerteAvvik':
                return newValue
                    ? {
                        ...kontrollerende,
                        ingenAvvik: false,
                        observerteAvvik: true
                    }
                    : {
                        ...kontrollerende,
                        observerteAvvik: false,
                    }
            case 'aapneAvvik':
                return newValue
                    ? {
                        ...kontrollerende,
                        ingenAvvik: false,
                        aapneAvvik: true
                    }
                    : {
                        ...kontrollerende,
                        aapneAvvik: false,
                    }
            default:
                return kontrollerende;
        }
    }

    handleOnAnsvarsrettKontrollerendeChange(property) {
        const formData = this.props.selectedForm?.formData;
        const oldKontrollerende = formData.ansvarsrett?.kontrollerende;
        const kontrollerende = this.toggleAnsvarsrettKontrollerendeValue(property, oldKontrollerende);

        this.props.updateSelectedForm({
            ...this.props.selectedForm,
            formData: {
                ...formData,
                ansvarsrett: {
                    ...formData.ansvarsrett,
                    kontrollerende
                }
            }
        }).then(selectedForm => {
            this.props.saveSelectedForm(selectedForm);
        });
    }

    render() {
        const formData = this.props.selectedForm?.formData;
        return (
            <React.Fragment>
                <Header content="Sluttrapport for kontroll"></Header>
                <Paper>
                    <p>
                        Kryss av for om det er funnet avvik og om disse er lukket. Plan for uavhengig kontroll kan legges ved dette skjemaet ved å trykke på 'Oversikt - skjema og vedlegg' øverst til venstre.
                    </p>
                    <CheckBoxListItem
                        id={`ansvarsomraade-avvik-ingen`}
                        onChange={() => this.handleOnAnsvarsrettKontrollerendeChange('ingenAvvik')}
                        checked={formData.ansvarsrett?.kontrollerende?.ingenAvvik}>
                        Ingen avvik er funnet, se vedlagte plan for uavhengig kontroll
                    </CheckBoxListItem>
                    <CheckBoxListItem
                        id={`ansvarsomraade-avvik-observert`}
                        onChange={() => this.handleOnAnsvarsrettKontrollerendeChange('observerteAvvik')}
                        checked={formData.ansvarsrett?.kontrollerende?.observerteAvvik}>
                        Observerte avvik er lukket, se vedlagte plan for uavhengig kontroll
                    </CheckBoxListItem>
                    <CheckBoxListItem
                        id={`ansvarsomraade-avvik-aapne`}
                        onChange={() => this.handleOnAnsvarsrettKontrollerendeChange('aapneAvvik')}
                        checked={formData.ansvarsrett?.kontrollerende?.aapneAvvik}>
                        Åpne avvik er rapportert til kommunen, se vedlagte plan for uavhengig kontroll
                    </CheckBoxListItem>
                </Paper>
                <div className={formsStyle.buttonRow}>
                    <Link to={{ pathname: 'vedlegg', search: window.location.search }}>
                        <Button color="primary" content="Forrige" arrow='left' />
                    </Link>
                    <Link to={{ pathname: 'erklaering', search: window.location.search }}>
                        <Button color="primary" content="Neste" arrow='right' />
                    </Link>
                </div>
            </React.Fragment>
        )

    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    updateSelectedForm,
    saveSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Sluttrapport);
