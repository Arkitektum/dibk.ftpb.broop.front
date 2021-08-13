// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, CheckBoxListItem, Header, Paper } from 'dibk-design';

// Actions
import { updateSelectedForm } from 'actions/FormActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';


class Erklaeringer extends Component {

    render() {
        const formData = this.props.selectedForm?.formData;
        return (
            <React.Fragment>
                <Header content="Erklæring"></Header>
                <Paper>
                    <CheckBoxListItem
                        id={`erklaering-gjennomfoertKontroll`}
                        onChange={event => this.props.updateSelectedForm({
                            ...this.props.selectedForm,
                            formData: {
                                ...formData,
                                erklaeringKontroll: event.target.checked
                            }
                        })}
                        checked={formData.erklaeringKontroll}>
                        Kontroll er gjennomført på en forskriftsmessig måte. Kontrollforetaket er uavhengig av foretakene som er kontrollert.
                    </CheckBoxListItem>
                    <p>
                        Ansvarlig kontrollerende foretak er kjent med reglene om straff og sanksjoner i plan- og bygningsloven kap.32, og at det kan medføre reaksjoner dersom vi har gitt uriktige opplysninger.
                    </p>
                </Paper>
                <div className={formsStyle.buttonRow}>
                    <Link to={{ pathname: 'sluttrapport', search: window.location.search }}>
                        <Button color="primary" content="Forrige" arrow='left' />
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
    updateSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Erklaeringer);


