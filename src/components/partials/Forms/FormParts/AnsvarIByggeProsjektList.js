// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import AnsvarIByggeProsjekt from 'components/partials/Forms/FormParts/AnsvarIByggeProsjektList/AnsvarIByggeProsjekt';


class AnsvarIByggeProsjektList extends Component {

    handleUpdate(value, property, index) {
        let updatedAnsvarsomraader = this.props.ansvarsomraader;
        updatedAnsvarsomraader[index][property] = value;
        return this.props.updateHandler(updatedAnsvarsomraader);
    }

    handleSave() {
        this.props.saveHandler();
    }

    validateBeskrivelseAvAnsvarsomraade(beskrivelseAvAnsvarsomraade) {
        let message;
        if (beskrivelseAvAnsvarsomraade?.length >= 2000) {
            message = 'Beskrivelsen kan ikke være lenger enn 2000 tegn.';
        } else if (beskrivelseAvAnsvarsomraade?.length === 0) {
            message = 'Du må fylle ut en beskrivelse av ansvarsområdet.'
        }

        if (this.state.errors.beskrivelseAvAnsvarsomraade.message !== message) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    beskrivelseAvAnsvarsomraade: {
                        hasErrors: message?.length > 0,
                        message
                    }
                }
            })
        }
    }

    handleUpdateAndSaveIfChanged(newValue, property, index) {
        const oldValue = this.props.ansvarsomraader[index][property];
        this.handleUpdate(newValue, property, index);
        if (newValue !== oldValue) {
            this.handleSave()
        }
    }


    render() {
        const ansvarsomraader = this.props.ansvarsomraader;
        return ansvarsomraader?.length
            ? ansvarsomraader.map((ansvarsomraade, index) => {
                return (
                    <AnsvarIByggeProsjekt
                        ansvarsomraade={ansvarsomraade}
                        index={index}
                        key={index}
                        updateHandler={(value, property, index) => this.handleUpdate(value, property, index)}
                        saveHandler={() => this.handleSave()}
                    />
                )
            })
            : (
                <p>Ingen data for Eiendom/Byggested</p>
            )
    }
}

AnsvarIByggeProsjektList.propTypes = {
    ansvarsomraader: PropTypes.array.isRequired,
    updateHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired
};

export default connect(null, null)(AnsvarIByggeProsjektList);
