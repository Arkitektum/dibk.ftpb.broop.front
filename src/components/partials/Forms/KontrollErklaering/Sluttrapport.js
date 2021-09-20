// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { CheckBoxListItem, Header, Paper } from 'dibk-design';

// Actions
import { updateSelectedForm, saveSelectedForm } from 'actions/FormActions';


class Sluttrapport extends Component {

    toggleAnsvarsrettKontrollerendeValue(property, ansvarsrettKontrollerende) {
        const newValue = !ansvarsrettKontrollerende?.[property];

        switch (property) {
            case 'ingenAvvik':
                return newValue
                    ? {
                        ingenAvvik: true,
                        observerteAvvik: false,
                        aapneAvvik: false
                    }
                    : {
                        ...ansvarsrettKontrollerende,
                        ingenAvvik: false,
                    }
            case 'observerteAvvik':
                return newValue
                    ? {
                        ...ansvarsrettKontrollerende,
                        ingenAvvik: false,
                        observerteAvvik: true
                    }
                    : {
                        ...ansvarsrettKontrollerende,
                        observerteAvvik: false,
                    }
            case 'aapneAvvik':
                return newValue
                    ? {
                        ...ansvarsrettKontrollerende,
                        ingenAvvik: false,
                        aapneAvvik: true
                    }
                    : {
                        ...ansvarsrettKontrollerende,
                        aapneAvvik: false,
                    }
            default:
                return ansvarsrettKontrollerende;
        }
    }

    handleOnAnsvarsrettKontrollerendeChange(property) {
        const formData = this.props.selectedForm?.formData;
        const oldAnsvarsrettKontrollerende = formData.ansvarsrettKontrollerende;
        const ansvarsrettKontrollerende = this.toggleAnsvarsrettKontrollerendeValue(property, oldAnsvarsrettKontrollerende);

        this.props.updateSelectedForm({
            ...this.props.selectedForm,
            formData: {
                ...formData,
                ansvarsrettKontrollerende
            }
        }).then(selectedForm => {
            this.props.saveSelectedForm(selectedForm);
        });
    }

    render() {
        const formData = this.props.selectedForm?.formData;
        return (
            <React.Fragment>
                <Paper>
                    <div className="step-heading-on-print">
                        <Header content="Sluttrapport for kontroll" size={2}></Header>
                    </div>
                    <p>
                        Kryss av for om det er funnet avvik og om disse er lukket. Plan for uavhengig kontroll kan legges ved dette skjemaet ved å trykke på 'Oversikt - skjema og vedlegg' øverst til venstre.
                    </p>
                    <CheckBoxListItem
                        id={`ansvarsomraade-avvik-ingen`}
                        onChange={() => this.handleOnAnsvarsrettKontrollerendeChange('ingenAvvik')}
                        checked={formData.ansvarsrettKontrollerende?.ingenAvvik}>
                        Ingen avvik er funnet, se vedlagte plan for uavhengig kontroll
                    </CheckBoxListItem>
                    <CheckBoxListItem
                        id={`ansvarsomraade-avvik-observert`}
                        onChange={() => this.handleOnAnsvarsrettKontrollerendeChange('observerteAvvik')}
                        checked={formData.ansvarsrettKontrollerende?.observerteAvvik}>
                        Observerte avvik er lukket, se vedlagte plan for uavhengig kontroll
                    </CheckBoxListItem>
                    <CheckBoxListItem
                        id={`ansvarsomraade-avvik-aapne`}
                        onChange={() => this.handleOnAnsvarsrettKontrollerendeChange('aapneAvvik')}
                        checked={formData.ansvarsrettKontrollerende?.aapneAvvik}>
                        Åpne avvik er rapportert til kommunen, se vedlagte plan for uavhengig kontroll
                    </CheckBoxListItem>
                </Paper>
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
