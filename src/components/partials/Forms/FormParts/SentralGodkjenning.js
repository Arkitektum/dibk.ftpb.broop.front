// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Button, Label } from 'dibk-design';

// Stylesheets
import formsStyle from 'components/partials/Forms/Forms.module.scss';

class SentralGodkjenning extends Component {
    constructor(props) {
        super(props);
        this.state = { // TODO use data from API
            harForetaketSentralGodkjenning: null,
            dekkerSentralGodkjenningAnsvarsomraadene: null
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Label>Har foretaket sentral gokjenning?</Label>
                    Forhåndsvalget er hentet fra register for sentral godkjenning. Du må endre svaret dersom det er feil.
                    <div className={formsStyle.inputGroup}>
                        <div>
                            <Button content="Ja" size="small" onClick={() => this.setState({ harForetaketSentralGodkjenning: 'ja' })} noHover color={this.state.harForetaketSentralGodkjenning === 'ja' ? 'primary' : 'default'} />
                        </div>
                        <div>
                            <Button content="Nei" size="small" onClick={() => this.setState({ harForetaketSentralGodkjenning: 'nei' })} noHover color={this.state.harForetaketSentralGodkjenning === 'nei' ? 'primary' : 'default'} />
                        </div>
                    </div>
                </div>
                <div>
                    <Label>Dekker den sentrale godkjenningen ansvarsområdene over?</Label>
                    <div className={formsStyle.inputGroup}>
                        <div>
                            <Button content="Ja" size="small" onClick={() => this.setState({ dekkerSentralGodkjenningAnsvarsomraadene: 'ja' })} noHover color={this.state.dekkerSentralGodkjenningAnsvarsomraadene === 'ja' ? 'primary' : 'default'} />
                        </div>
                        <div>
                            <Button content="Delvis" size="small" onClick={() => this.setState({ dekkerSentralGodkjenningAnsvarsomraadene: 'delvis' })} noHover color={this.state.dekkerSentralGodkjenningAnsvarsomraadene === 'delvis' ? 'primary' : 'default'} />
                        </div>
                        <div>
                            <Button content="Nei" size="small" onClick={() => this.setState({ dekkerSentralGodkjenningAnsvarsomraadene: 'nei' })} noHover color={this.state.dekkerSentralGodkjenningAnsvarsomraadene === 'nei' ? 'primary' : 'default'} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )

    }
}

export default connect(null, null)(SentralGodkjenning);
