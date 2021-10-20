// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { CheckBoxListItem, Header, Paper } from 'dibk-design';

// Actions
import { updateSelectedForm, saveSelectedForm } from 'actions/FormActions';


class Erklaeringer extends Component {

    render() {
        const accessToken = this.props.oidc?.user?.access_token;
        const formData = this.props.selectedForm?.formData;
        return (
            <React.Fragment>
                <Paper>
                    <div className="step-heading-on-print">
                        <Header content="Erklæring" size={2}></Header>
                    </div>
                    <CheckBoxListItem
                        id={`erklaering-gjennomfoertKontroll`}
                        onChange={event =>
                            this.props.updateSelectedForm({
                                ...this.props.selectedForm,
                                formData: {
                                    ...formData,
                                    erklaeringKontroll: event.target.checked
                                }
                            }).then(selectedForm => {
                                this.props.saveSelectedForm(selectedForm, accessToken);
                            })
                        }
                        checked={formData.erklaeringKontroll}>
                        Kontroll er gjennomført på en forskriftsmessig måte. Kontrollforetaket er uavhengig av foretakene som er kontrollert.
                    </CheckBoxListItem>
                    <p>
                        Ansvarlig kontrollerende foretak er kjent med reglene om straff og sanksjoner i plan- og bygningsloven kap.32, og at det kan medføre reaksjoner dersom vi har gitt uriktige opplysninger.
                    </p>
                </Paper>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm,
    oidc: state.oidc
});

const mapDispatchToProps = {
    updateSelectedForm,
    saveSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Erklaeringer);


