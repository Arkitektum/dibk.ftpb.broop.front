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

    handleOnAnsvarsrettKontrollerendeChange(property) {
        const formData = this.props.selectedForm?.formData;
        const value = formData.ansvarsrett?.kontrollerende?.[property];
        this.props.updateSelectedForm({
            ...this.props.selectedForm,
            formData: {
                ...formData,
                ansvarsrett: {
                    ...formData.ansvarsrett,
                    kontrollerende: {
                        ...formData.ansvarsrett.kontrollerende,
                        [property]: !value
                    }
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
                    <Link to={{ pathname: 'erklaeringenGjelder', search: window.location.search }}>
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
