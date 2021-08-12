// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// DIBK Design
import { Button, Header, InputField } from 'dibk-design';

// Actions
import { updateSelectedForm } from 'actions/FormActions';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';


class KontrollErklaeringer extends Component {

    render() {
        const formData = this.props.selectedForm?.formData;
        return formData
            ? (
                <React.Fragment>
                    <div className={formsStyle.headerSection}>
                        <Header content="Kontrollerklæring med sluttrapport"></Header>
                        <span className={formsStyle.subtitle}>etter plan- og bygningsloven(pbl) § 24-2, jf. SAK 10 § 12-5 og § 14-8</span>
                        <p>Etter signering blir erklæringen sendt til søker.</p>
                    </div>
                    <dl className={`${formsStyle.fieldList} ${formsStyle.inlineFieldList}`}>
                        <div className={formsStyle.flex50}>
                            <dt>Kommunens saksnummer (år/sekvensnummer):</dt>
                            <dd>{formData.kommunensSaksnummer?.saksaar}/{formData.kommunensSaksnummer?.sakssekvensnummer}</dd>
                        </div>
                    </dl>
                    <div className={formsStyle.inputGroup}>
                        <div className={formsStyle.flex50}>
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
                                label="Prosjektnavn"
                                value={formData.prosjektnavn} />
                        </div>
                    </div>
                    <div className={`${formsStyle.buttonRow} ${formsStyle.reverse}`}>
                        <div></div>
                        <Link to={{ pathname: 'erklaeringenGjelder', search: window.location.search }}>
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
    updateSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(KontrollErklaeringer);
