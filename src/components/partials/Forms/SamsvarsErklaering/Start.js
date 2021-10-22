// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Header, InputField } from 'dibk-design';

// Actions
import { updateSelectedForm, saveSelectedForm } from 'actions/FormActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class KontrollErklaeringer extends Component {

    render() {
        const formData = this.props.selectedForm?.formData;
        const accessToken = this.props.oidc?.user?.access_token;
        return formData
            ? (
                <React.Fragment>
                    <div className={formsStyle.headerSection}>
                        <Header content="Samsvarserklæring"></Header>
                        <span className={formsStyle.subtitle}>etter plan -og bygningsloven(pbl) § 23-1, SAK10 kapittel 12</span>
                        <p>Etter signering blir erklæringen sendt til ansvarlig søker.</p>
                    </div>
                    <dl className={`${formsStyle.fieldList} ${formsStyle.inlineFieldList}`}>
                        <div className="print-flex-50">
                            <dt>Kommunens saksnummer (år/sekvensnummer):</dt>
                            <dd>{formData.kommunensSaksnummer?.saksaar}/{formData.kommunensSaksnummer?.sakssekvensnummer}</dd>
                        </div>
                    </dl>
                    <div className="print-flex-50">
                        <InputField
                            id={`prosjektnavn`}
                            onChange={event => {
                                this.props.updateSelectedForm({
                                    ...this.props.selectedForm,
                                    formData: {
                                        ...formData,
                                        prosjektnavn: event.target.value
                                    }
                                });
                            }}
                            onBlur={() => {
                                this.props.saveSelectedForm(this.props.selectedForm, accessToken);
                            }}
                            label="Prosjektnavn"
                            value={formData.prosjektnavn} />
                    </div>
                </React.Fragment>
            )
            : (
                <p>Ingen data for samsvarserklæring</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(KontrollErklaeringer);
