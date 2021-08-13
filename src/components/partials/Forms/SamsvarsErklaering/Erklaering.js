// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, Header, Paper, CheckBoxListItem } from 'dibk-design';

// Actions
import { updateSelectedForm } from 'actions/FormActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class Erklaering extends Component {

    render() {
        const formData = this.props.selectedForm?.formData;

        return formData ? (
            <React.Fragment>
                <Header content="Erklæring"></Header>
                <Paper>
                    <CheckBoxListItem
                        id={`erklaering-erTEK10`}
                        onChange={event => {
                            this.props.updateSelectedForm({
                                ...this.props.selectedForm,
                                formData: {
                                    ...formData,
                                    erTEK10: event.target.checked
                                }
                            })
                        }}
                        checked={formData.erTEK10}>
                        Vi bekrefter at prosjektering er i samsvar med ytelser i TEK og preaksepterte ytelser (VTEK) eller ved analyse som viser at forskriftens (TEK) funksjonskrav er oppfylt
                    </CheckBoxListItem>
                    <p>
                        Vi bekrefter at kvalitetssikring er utført og dokumentert i henhold til erklæring om ansvarsrett og foretakets kvalitetssikring.
                    </p>
                    <p>
                        Foretaket er kjent med reglene om straff og sanksjoner i plan- og bygnigsloven kap. 32, og at det kan medføre reaksjoner dersom det er gitt uriktige opplysninger.
                    </p>
                </Paper>
                <div className={formsStyle.buttonRow}>
                    <Link to={{ pathname: 'gjenstaaendeArbeider', search: window.location.search }}>
                        <Button color="primary" content="Forrige" arrow='left' />
                    </Link>
                </div>
            </React.Fragment>
        ) : ''
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    updateSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Erklaering);
