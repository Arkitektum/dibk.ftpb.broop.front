// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { DragAndDropFileInput, Header, Paper } from 'dibk-design';

// Actions
import { updateSelectedForm, saveSelectedForm } from 'actions/FormActions';


class Vedlegg extends Component {

    render() {
        const formData = this.props.selectedForm?.formData;
        return formData
            ? (
                <div className="hide-on-print">
                    <Paper>
                        <div className="step-heading-on-print">
                            <Header content="Last opp vedlegg" size={2}></Header>
                        </div>
                        <p>Ved innsending av kontrollerklæring må vedlegget “Plan for uavhengig kontroll” legges ved erklæringen. </p>
                        <DragAndDropFileInput id="vedlegg" label="" buttonContent="Velg fil" onSelectChange={() => console.log('Select change')} onDragAndDropChange={() => console.log('Drag and drop change')} />
                    </Paper>
                </div>
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
    updateSelectedForm,
    saveSelectedForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Vedlegg);
