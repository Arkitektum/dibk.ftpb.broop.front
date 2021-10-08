// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Template
import Container from 'components/template/Container';

// Stylesheets
import style from 'components/partials/Footer.module.scss';
import commonStyle from 'components/routes/common.module.scss';


class Footer extends Component {



    render() {
        return (
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
                        <a href="#">Personvernerklæring</a>
                    </p>
                    <p>
                        <a href="#">Tilgjengelighetserklæring</a>
                    </p>
                </Container>
            </div>
        )
    }
}


export default connect(null, null)(Footer);
