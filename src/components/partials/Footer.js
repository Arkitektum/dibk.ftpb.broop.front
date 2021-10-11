// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// DIBK Design
import { Button, Dialog } from 'dibk-design';

// Template
import Container from 'components/template/Container';

// Stylesheets
import style from 'components/partials/Footer.module.scss';


class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPersonvernerklaeringDialog: false,
            showTilgjengelighetserklaeringDialog: false
        };
        this.showPersonvernerklaeringDialog = this.showPersonvernerklaeringDialog.bind(this);
        this.hidePersonvernerklaeringDialog = this.hidePersonvernerklaeringDialog.bind(this);
        this.showTilgjengelighetserklaeringDialog = this.showTilgjengelighetserklaeringDialog.bind(this);
        this.hideTilgjengelighetserklaeringDialog = this.hideTilgjengelighetserklaeringDialog.bind(this);
    }

    showPersonvernerklaeringDialog() {
        this.setState({
            showPersonvernerklaeringDialog: true
        });
    }

    hidePersonvernerklaeringDialog() {
        this.setState({
            showPersonvernerklaeringDialog: false
        });
    }

    showTilgjengelighetserklaeringDialog() {
        this.setState({
            showTilgjengelighetserklaeringDialog: true
        });
    }

    hideTilgjengelighetserklaeringDialog() {
        this.setState({
            showTilgjengelighetserklaeringDialog: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className={style.footer}>
                    <Container>
                        <p>
                            Lurer du på om du kan erklære ansvar?<br />
                            <a href="https://dibk.no/verktoy-og-veivisere/veiviser_ansvar/">Prøv veiviseren vår her</a>
                        </p>
                        <p>
                            Har du spørsmål om digitale ansvarsretter?<br />
                            Kontakt Direktoratet for byggkvalitet på <a href="mailto:ftb@dibk.no">ftb@dibk.no</a>
                        </p>
                        <p>
                            <span onClick={this.showPersonvernerklaeringDialog} className={style.link}>
                                Personvernerklæring
                            </span>
                        </p>
                        <p>
                            <span onClick={this.showTilgjengelighetserklaeringDialog} className={style.link}>
                                Tilgjengelighetserklæring
                            </span>
                        </p>
                    </Container>
                </div >
                {
                    this.state.showPersonvernerklaeringDialog
                        ? (
                            <Dialog onClickOutside={this.hidePersonvernerklaeringDialog} closeButton maxWidth="960px">
                                <b>Personvernerklæring</b>
                                <p>Tekst</p>
                                <Button onClick={this.hidePersonvernerklaeringDialog} color="primary" content="Jeg skjønner!" />
                            </Dialog>
                        )
                        : ''
                }
                {
                    this.state.showTilgjengelighetserklaeringDialog
                        ? (
                            <Dialog onClickOutside={this.hideTilgjengelighetserklaeringDialog} closeButton maxWidth="960px">
                                <b>Tilgjengelighetserklæring</b>
                                <p>Tekst</p>
                                <Button onClick={this.hideTilgjengelighetserklaeringDialog} color="primary" content="Jeg skjønner!" />
                            </Dialog>
                        )
                        : ''
                }
            </React.Fragment>
        )
    }
}


export default connect(null, null)(Footer);
