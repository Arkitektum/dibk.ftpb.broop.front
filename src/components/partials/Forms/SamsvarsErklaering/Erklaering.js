// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Header, Paper, CheckBoxListItem } from 'dibk-design';

// Actions
import { updateSelectedForm, saveSelectedForm } from 'actions/FormActions';

class Erklaering extends Component {

    render() {
        const formData = this.props.selectedForm?.formData;

        return formData ? (
            <React.Fragment>
                <Paper>
                    <Header content="Erklæring" size={2}></Header>
                    <CheckBoxListItem
                        id={`erklaering-erTEK10`}
                        onChange={event =>
                            this.props.updateSelectedForm({
                                ...this.props.selectedForm,
                                formData: {
                                    ...formData,
                                    erTEK10: event.target.checked
                                }
                            }).then(selectedForm => {
                                this.props.saveSelectedForm(selectedForm);
                            })
                        }
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
            </React.Fragment>
        ) : ''
    }
}

const mapStateToProps = state => ({
    selectedForm: state.selectedForm
});

const mapDispatchToProps = {
    updateSelectedForm,
    saveSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Erklaering);
