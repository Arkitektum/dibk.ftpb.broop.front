(this["webpackJsonpdibk-ftb-broop-front"]=this["webpackJsonpdibk-ftb-broop-front"]||[]).push([[0],{125:function(e,n,t){e.exports={container:"Container_container__dTOM0"}},132:function(e,n,t){},176:function(e,n,t){"use strict";t.r(n);var s=t(10),r=t(11),a=t(13),i=t(12),o=t(2),l=t.n(o),c=t(47),d=t.n(c),j=(t(132),t(25)),u=t(15),h=t(8),b=t(82),v=t(74),k=t(111),O=t.n(k),p=t(23),m=t(114),f=t(59),g=t(120),x=t(121),y="FETCH_CODELIST_FUNSKJON",C="FETCH_CODELIST_TILTAKSKLASSE",F="FETCH_SUBMISSION",S="UPDATE_SELECTED_FORM",_={},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case y:return n.payload;default:return e}},N={},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case C:return n.payload;default:return e}},I={},B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case S:return n.payload;default:return e}},L={},K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case F:return n.payload;default:return e}},E=function(e){return Object(f.combineReducers)({router:Object(v.b)(e),codelistFunksjon:A,codelistTiltaksklasse:T,selectedForm:B,selectedSubmission:K})},V=Object(p.a)(),D=Object(g.composeWithDevTools)({});var w=t(9),M=t(125),H=t.n(M),G=t(3),P=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){return Object(G.jsx)("div",{className:H.a.container,children:this.props.children})}}]),t}(o.Component),R=Object(u.c)(null,null)(P),U=function(e){return function(n){var t="https://dibk-ftpb-broop-api.azurewebsites.net/api/v1/Innsending?referanseId=".concat(e);return fetch(t).then((function(e){return e.json()})).then((function(e){return n({type:F,payload:e})}))}},z=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(e){var r;return Object(s.a)(this,t),(r=n.call(this,e)).state={submission:null},r}return Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.fetchSubmission("24E4920B-DEA0-462E-A481-6F061D3EB2EA").then((function(n){var t=(null===n||void 0===n?void 0:n.payload)||null;e.setState({submission:t})}))}},{key:"render",value:function(){var e=this.state.submission;return e&&Object.keys(e).length?Object(G.jsxs)(R,{children:[Object(G.jsx)("h1",{children:"Home"}),Object(G.jsx)(b.b,{to:"/Skjema/".concat(e.innsendingsType,"/").concat(e.referanseId,"/"),children:Object(G.jsx)(w.Button,{content:e.innsendingsType})})]}):""}}]),t}(o.Component),J={fetchSubmission:U},W=Object(u.c)((function(e){return{}}),J)(z),q=t(57),X=t(7),$=t.n(X),Q=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.codelistFunksjon&&Object.keys(this.props.codelistFunksjon).length,n=this.props.codelistTiltaksklasse&&Object.keys(this.props.codelistTiltaksklasse).length;e||this.props.fetchCodelistFunksjon(),n||this.props.fetchCodelistTiltaksklasse()}},{key:"handleOnChange",value:function(e,n,t){var s=this.props.ansvarsomraader;s[t][n]=e,this.props.onChange(s)}},{key:"handleFunksjonOnChange",value:function(e,n,t){var s,r=null===(s=this.props.codelistFunksjon)||void 0===s?void 0:s.containeditems.find((function(n){return n.codevalue===e}));if(r){var a={kodeverdi:r.codevalue,kodebeskrivelse:r.label};this.handleOnChange(a,n,t)}}},{key:"handleTiltaksklasseOnChange",value:function(e,n,t){var s,r=null===(s=this.props.codelistTiltaksklasse)||void 0===s?void 0:s.containeditems.find((function(n){return n.codevalue===e}));if(r){var a={kodeverdi:r.codevalue,kodebeskrivelse:r.label};this.handleOnChange(a,n,t)}}},{key:"convertCodelistFunksjonToOptionValues",value:function(e){var n;return(null===e||void 0===e||null===(n=e.containeditems)||void 0===n?void 0:n.length)?null===e||void 0===e?void 0:e.containeditems.map((function(e){return{key:e.label,value:e.codevalue}})):[]}},{key:"convertCodelistTiltaksklasseToOptionValues",value:function(e){var n;return(null===e||void 0===e||null===(n=e.containeditems)||void 0===n?void 0:n.length)?null===e||void 0===e?void 0:e.containeditems.map((function(e){return{key:e.label,value:e.codevalue}})):[]}},{key:"render",value:function(){var e=this,n=this.props.ansvarsomraader;return(null===n||void 0===n?void 0:n.length)?n.map((function(n,t){var s,r;return Object(G.jsxs)("div",{children:[Object(G.jsxs)("div",{className:$.a.inputGroup,children:[Object(G.jsx)("div",{className:$.a.flex50,children:Object(G.jsx)(w.Select,{id:"ansvarsomraade-".concat(t,"-funksjon"),onChange:function(n){e.handleFunksjonOnChange(n.target.value,"funksjon",t)},label:"Funksjon",value:null===(s=n.funksjon)||void 0===s?void 0:s.kodeverdi,options:e.convertCodelistFunksjonToOptionValues(e.props.codelistFunksjon)})}),Object(G.jsx)("div",{className:$.a.flex50,children:Object(G.jsx)(w.InputField,{id:"ansvarsomraade-".concat(t,"-beskrivelseAvAnsvarsomraade"),onChange:function(n){e.handleOnChange(n.target.value,"beskrivelseAvAnsvarsomraade",t)},label:"Beskrivelse av ansvarsomr\xe5det",value:n.beskrivelseAvAnsvarsomraade||""})}),Object(G.jsx)("div",{className:$.a.flexAuto,children:Object(G.jsx)(w.Select,{id:"ansvarsomraade-".concat(t,"-tiltaksklasse"),onChange:function(n){e.handleTiltaksklasseOnChange(n.target.value,"tiltaksklasse",t)},label:"Tiltaksklasse",value:null===(r=n.tiltaksklasse)||void 0===r?void 0:r.kodeverdi,options:e.convertCodelistTiltaksklasseToOptionValues(e.props.codelistTiltaksklasse)})})]}),Object(G.jsxs)("fieldset",{className:$.a.fieldset,children:[Object(G.jsx)("legend",{children:"V\xe5re samsvarserkl\xe6ringer/kontrollerkl\xe6ringer vil foreligge ved (gjelder ikke for S\xd8K)"}),Object(G.jsx)(w.CheckBoxListItem,{id:"ansvarsomraade-".concat(t,"-samsvarKontrollVedRammetillatelse"),onChange:function(n){e.handleOnChange(n.target.checked,"samsvarKontrollVedRammetillatelse",t)},checked:!!n.samsvarKontrollVedRammetillatelse,children:"Rammetillatelse"}),Object(G.jsx)(w.CheckBoxListItem,{id:"ansvarsomraade-".concat(t,"-samsvarKontrollVedIgangsettingstillatelse"),onChange:function(n){e.handleOnChange(n.target.checked,"samsvarKontrollVedIgangsettingstillatelse",t)},checked:!!n.samsvarKontrollVedIgangsettingstillatelse,children:"Igangsettingstillatelse"}),Object(G.jsx)(w.CheckBoxListItem,{id:"ansvarsomraade-".concat(t,"-samsvarKontrollVedMidlertidigBrukstillatelse"),onChange:function(n){e.handleOnChange(n.target.checked,"samsvarKontrollVedMidlertidigBrukstillatelse",t)},checked:!!n.samsvarKontrollVedMidlertidigBrukstillatelse,children:"Midlertidig brukstillatelse"}),Object(G.jsx)(w.CheckBoxListItem,{id:"ansvarsomraade-".concat(t,"-samsvarKontrollVedFerdigattest"),onChange:function(n){e.handleOnChange(n.target.checked,"samsvarKontrollVedFerdigattest",t)},checked:!!n.samsvarKontrollVedFerdigattest,children:"Ferdigattest"})]}),Object(G.jsxs)("fieldset",{className:$.a.fieldset,children:[Object(G.jsx)("legend",{children:"Har foretaket sentral godkjenning som dekker ansvarsomr\xe5det?"}),Object(G.jsx)(w.RadioButtonListItem,{id:"ansvarsomraade-".concat(t,"-dekkesOmraadeAvSentralGodkjenningSpecified-true"),name:"dekkesOmraadeAvSentralGodkjenningSpecified",onChange:function(n){e.handleOnChange(!0,"dekkesOmraadeAvSentralGodkjenningSpecified",t)},inputValue:"true",checked:!!n.dekkesOmraadeAvSentralGodkjenningSpecified,children:"Ja"}),Object(G.jsx)(w.RadioButtonListItem,{id:"ansvarsomraade-".concat(t,"-dekkesOmraadeAvSentralGodkjenningSpecified-false"),name:"dekkesOmraadeAvSentralGodkjenningSpecified",onChange:function(n){e.handleOnChange(!1,"dekkesOmraadeAvSentralGodkjenningSpecified",t)},inputValue:"false",checked:!n.dekkesOmraadeAvSentralGodkjenningSpecified,children:"Nei"})]})]},t)})):Object(G.jsx)("p",{children:"Ingen data for Eiendom/Byggested"})}}]),t}(o.Component),Y={fetchCodelistFunksjon:function(e){return function(e){return fetch("https://register.dev.geonorge.no/api/kodelister/byggesoknad/funksjon.json?").then((function(e){return e.json()})).then((function(n){return e({type:y,payload:n})}))}},fetchCodelistTiltaksklasse:function(e){return function(e){return fetch("https://register.dev.geonorge.no/api/kodelister/byggesoknad/tiltaksklasse.json?").then((function(e){return e.json()})).then((function(n){return e({type:C,payload:n})}))}}},Z=Object(u.c)((function(e){return{codelistFunksjon:e.codelistFunksjon,codelistTiltaksklasse:e.codelistTiltaksklasse}}),Y)(Q),ee=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){var e,n,t,s,r=this.props.ansvarligSoeker;return r&&Object.keys(r).length?Object(G.jsxs)("dl",{className:$.a.fieldList,children:[Object(G.jsxs)("div",{className:$.a.flex50,children:[Object(G.jsx)("dt",{children:"Organisasjonsnummer"}),Object(G.jsx)("dd",{children:r.organisasjonsnummer})]}),Object(G.jsxs)("div",{className:$.a.flex50,children:[Object(G.jsx)("dt",{children:"Navn p\xe5 foretak"}),Object(G.jsx)("dd",{children:r.navn})]}),Object(G.jsxs)("div",{className:$.a.flex100,children:[Object(G.jsx)("dt",{children:"Kontaktperson"}),Object(G.jsx)("dd",{children:null===(e=r.kontaktperson)||void 0===e?void 0:e.navn})]}),Object(G.jsxs)("div",{className:$.a.flex50,children:[Object(G.jsx)("dt",{children:"Telefon"}),Object(G.jsx)("dd",{children:null===(n=r.kontaktperson)||void 0===n?void 0:n.telefonnummer})]}),Object(G.jsxs)("div",{className:$.a.flex50,children:[Object(G.jsx)("dt",{children:"Mobiltelefon"}),Object(G.jsx)("dd",{children:null===(t=r.kontaktperson)||void 0===t?void 0:t.mobilnummer})]}),Object(G.jsxs)("div",{className:$.a.flex100,children:[Object(G.jsx)("dt",{children:"E-post"}),Object(G.jsx)("dd",{children:null===(s=r.kontaktperson)||void 0===s?void 0:s.epost})]})]}):Object(G.jsx)("p",{children:"Ingen data om ansvarlig s\xf8ker"})}}]),t}(o.Component),ne=Object(u.c)(null,null)(ee),te=function(e){var n="";return e.adresselinje1&&(n+=e.adresselinje1,(e.postnr||e.poststed)&&(n+=", ")),e.postnr&&(n+=e.postnr,e.poststed&&(n+=" ")),e.poststed&&(n+=e.poststed),n},se=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){var e;return(null===(e=this.props.eiendomByggested)||void 0===e?void 0:e.length)?this.props.eiendomByggested.map((function(e,n){var t,s,r,a,i;return Object(G.jsx)("div",{children:Object(G.jsxs)("dl",{className:$.a.fieldList,children:[Object(G.jsxs)("div",{className:$.a.flex25,children:[Object(G.jsx)("dt",{children:"G\xe5rdsnr."}),Object(G.jsx)("dd",{children:null===(t=e.eiendomsidentifikasjon)||void 0===t?void 0:t.gaardsnummer})]}),Object(G.jsxs)("div",{className:$.a.flex25,children:[Object(G.jsx)("dt",{children:"Bruksnr."}),Object(G.jsx)("dd",{children:null===(s=e.eiendomsidentifikasjon)||void 0===s?void 0:s.bruksnummer})]}),Object(G.jsxs)("div",{className:$.a.flex25,children:[Object(G.jsx)("dt",{children:"Festenr."}),Object(G.jsx)("dd",{children:null===(r=e.eiendomsidentifikasjon)||void 0===r?void 0:r.festenummer})]}),Object(G.jsxs)("div",{className:$.a.flex25,children:[Object(G.jsx)("dt",{children:"Seksjonsnr."}),Object(G.jsx)("dd",{children:null===(a=e.eiendomsidentifikasjon)||void 0===a?void 0:a.seksjonsnummer})]}),Object(G.jsxs)("div",{className:$.a.flex50,children:[Object(G.jsx)("dt",{children:"Bygningsnr."}),Object(G.jsx)("dd",{children:e.bygningsnummer})]}),Object(G.jsxs)("div",{className:$.a.flex50,children:[Object(G.jsx)("dt",{children:"Bolignr."}),Object(G.jsx)("dd",{children:e.bolignummer})]}),Object(G.jsxs)("div",{className:$.a.flex100,children:[Object(G.jsx)("dt",{children:"Kommunenummer."}),Object(G.jsx)("dd",{children:null===(i=e.eiendomsidentifikasjon)||void 0===i?void 0:i.kommunenummer})]}),Object(G.jsxs)("div",{className:$.a.flex100,children:[Object(G.jsx)("dt",{children:"Adresse"}),Object(G.jsx)("dd",{children:te(e.adresse)})]})]})},n)})):Object(G.jsx)("p",{children:"Ingen data for Eiendom/Byggested"})}}]),t}(o.Component),re=Object(u.c)(null,null)(se),ae=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"handleOnChange",value:function(e,n){this.props.onChange(Object(j.a)(Object(j.a)({},this.props.ansvarsrett),{},Object(q.a)({},n,e)))}},{key:"render",value:function(){var e=this,n=this.props.ansvarsrett;return n&&Object.keys(n).length?Object(G.jsxs)(l.a.Fragment,{children:[Object(G.jsx)("p",{children:"Vi kjenner reglene om straff og sanksjoner i plan- og bygningsloven kapittel 32, og at uriktige opplysninger kan f\xf8re til reaksjoner."}),Object(G.jsx)("p",{children:"Vi forplikter oss \xe5 stille med riktig kompetanse i byggeprosjekt, jf. SAK10 kapittel 10 og 11."}),Object(G.jsx)(w.CheckBoxListItem,{id:"erklaeringAnsvarligProsjekterende",onChange:function(n){e.handleOnChange(n.target.checked,"erklaeringAnsvarligProsjekterende")},checked:!!n.erklaeringAnsvarligProsjekterende,children:"Ansvarlig prosjekterende erkl\xe6rer at prosjekteringen skal v\xe6re planlagt, gjennomf\xf8rt og kvalitetssikret i henhold til pbl jf. SAK10 \xa712-3"}),Object(G.jsx)(w.CheckBoxListItem,{id:"erklaeringAnsvarligUtfoerende",onChange:function(n){e.handleOnChange(n.target.checked,"erklaeringAnsvarligUtfoerende")},checked:!!n.erklaeringAnsvarligUtfoerende,children:"Ansvarlig utf\xf8rende erkl\xe6rer at arbeidet ikke skal starte f\xf8r produksjonsunderlaget er klart, jf. SAK 10, \xa712-4"}),Object(G.jsx)(w.CheckBoxListItem,{id:"erklaeringAnsvarligKontrollerende",onChange:function(n){e.handleOnChange(n.target.checked,"erklaeringAnsvarligKontrollerende")},checked:!!n.erklaeringAnsvarligKontrollerende,children:"Ansvarlig kontollerende erkl\xe6rer uavhengighet fra foretaket det skal kontrollere \xa714-1"})]}):Object(G.jsx)("p",{children:"Ingen data om ansvarlig s\xf8ker"})}}]),t}(o.Component),ie=Object(u.c)(null,null)(ae),oe=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){var e,n,t,s,r,a,i=this.props.foretak;return i&&Object.keys(i).length?Object(G.jsxs)(l.a.Fragment,{children:[Object(G.jsxs)("dl",{className:$.a.fieldList,children:[Object(G.jsxs)("div",{className:$.a.flex33,children:[Object(G.jsx)("dt",{children:"Organisasjonsnummer"}),Object(G.jsx)("dd",{children:i.organisasjonsnummer})]}),Object(G.jsxs)("div",{className:$.a.flex66,children:[Object(G.jsx)("dt",{children:"Navn"}),Object(G.jsx)("dd",{children:i.navn})]}),Object(G.jsxs)("div",{className:$.a.flex33,children:[Object(G.jsx)("dt",{children:"Adresse"}),Object(G.jsx)("dd",{children:null===(e=i.adresse)||void 0===e?void 0:e.adresselinje1})]}),Object(G.jsxs)("div",{className:$.a.flex33,children:[Object(G.jsx)("dt",{children:"Postnr."}),Object(G.jsx)("dd",{children:null===(n=i.adresse)||void 0===n?void 0:n.postnr})]}),Object(G.jsxs)("div",{className:$.a.flex33,children:[Object(G.jsx)("dt",{children:"Poststed"}),Object(G.jsx)("dd",{children:null===(t=i.adresse)||void 0===t?void 0:t.poststed})]}),Object(G.jsxs)("div",{className:$.a.flex33,children:[Object(G.jsx)("dt",{children:"Kontaktperson"}),Object(G.jsx)("dd",{children:null===(s=i.kontaktperson)||void 0===s?void 0:s.navn})]}),Object(G.jsxs)("div",{className:$.a.flex33,children:[Object(G.jsx)("dt",{children:"Mobiltelefon"}),Object(G.jsx)("dd",{children:null===(r=i.kontaktperson)||void 0===r?void 0:r.mobilnummer})]}),Object(G.jsxs)("div",{className:$.a.flex33,children:[Object(G.jsx)("dt",{children:"Epost"}),Object(G.jsx)("dd",{children:null===(a=i.kontaktperson)||void 0===a?void 0:a.epost})]})]}),Object(G.jsx)("p",{children:Object(G.jsx)("b",{children:i.harSentralGodkjenning?"Foretaket har sentral godkjenning":"Foretaket har ikke sentral godkjenning"})})]}):Object(G.jsx)("p",{children:"Ingen data for foretak"})}}]),t}(o.Component),le=Object(u.c)(null,null)(oe),ce=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(e){var r;return Object(s.a)(this,t),(r=n.call(this,e)).state={},r}return Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(this.props.selectedSubmission&&Object.keys(this.props.selectedSubmission).length){var n,t,s,r=null===(n=this.props.selectedSubmission)||void 0===n||null===(t=n._links)||void 0===t||null===(s=t.ansvarsrettdistribuert)||void 0===s?void 0:s.href;fetch("https://dibk-ftpb-broop-api.azurewebsites.net".concat(r)).then((function(e){return e.json()})).then((function(n){e.props.updateSelectedForm(n)}))}}},{key:"componentDidUpdate",value:function(){var e=this,n=this.props.selectedSubmission&&Object.keys(this.props.selectedSubmission).length,t=this.props.selectedForm&&Object.keys(this.props.selectedForm).length;if(n&&!t){var s,r,a,i=null===(s=this.props.selectedSubmission)||void 0===s||null===(r=s._links)||void 0===r||null===(a=r.ansvarsrettdistribuert)||void 0===a?void 0:a.href;fetch("https://dibk-ftpb-broop-api.azurewebsites.net".concat(i)).then((function(e){return e.json()})).then((function(n){e.props.updateSelectedForm(n)}))}}},{key:"updateAnsvarsomraader",value:function(e){this.updateFormDataField(Object(j.a)(Object(j.a)({},this.props.selectedForm.formData.ansvarsrett),{},{ansvarsomraader:e}),"ansvarsrett")}},{key:"updateFormDataField",value:function(e,n){this.props.updateSelectedForm(Object(j.a)(Object(j.a)({},this.props.selectedForm),{},{formData:Object(j.a)(Object(j.a)({},this.props.selectedForm.formData),{},Object(q.a)({},n,e))}))}},{key:"render",value:function(){var e,n,t,s,r=this,a=null===(e=this.props.selectedForm)||void 0===e?void 0:e.formData;return a?Object(G.jsxs)(l.a.Fragment,{children:[Object(G.jsx)("dl",{className:"".concat($.a.fieldList," ").concat($.a.inlineFieldList),children:Object(G.jsxs)("div",{className:$.a.flex50,children:[Object(G.jsx)("dt",{children:"Kommunens saksnummer (\xe5r/sekvensnummer):"}),Object(G.jsxs)("dd",{children:[null===(n=a.kommunensSaksnummer)||void 0===n?void 0:n.saksaar,"/",null===(t=a.kommunensSaksnummer)||void 0===t?void 0:t.sakssekvensnummer]})]})}),Object(G.jsxs)(w.Paper,{children:[Object(G.jsx)(w.Header,{content:"Eiendom/Byggested",size:2}),Object(G.jsx)(re,{eiendomByggested:a.eiendomByggested})]}),Object(G.jsxs)(w.Paper,{children:[Object(G.jsx)(w.Header,{content:"Foretak",size:2}),Object(G.jsx)(le,{foretak:null===(s=a.ansvarsrett)||void 0===s?void 0:s.foretak})]}),Object(G.jsxs)(w.Paper,{children:[Object(G.jsx)(w.Header,{content:"Ansvar i byggeprosjekt",size:2}),Object(G.jsx)(Z,{ansvarsomraader:a.ansvarsrett.ansvarsomraader,onChange:function(e){return r.updateAnsvarsomraader(e)}})]}),Object(G.jsxs)(w.Paper,{children:[Object(G.jsx)(w.Header,{content:"Ansvarlig s\xf8ker",size:2}),Object(G.jsx)(ne,{ansvarligSoeker:a.ansvarligSoeker})]}),Object(G.jsxs)(w.Paper,{children:[Object(G.jsx)(w.Header,{content:"Erkl\xe6ring",size:2}),Object(G.jsx)(ie,{ansvarsrett:a.ansvarsrett,onChange:function(e){return r.updateFormDataField(e,"ansvarsrett")}})]})]}):Object(G.jsx)("p",{children:"Henter skjema"})}}]),t}(o.Component),de={updateSelectedForm:function(e){return function(n){return n({type:S,payload:e})}}},je=Object(u.c)((function(e){return{selectedSubmission:e.selectedSubmission,selectedForm:e.selectedForm}}),de)(ce),ue=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(e){var r;return Object(s.a)(this,t),(r=n.call(this,e)).state={form:null},r}return Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this,n=this.props.match.params.submissionId;this.props.submission&&!Object.keys(!this.props.submission).length||this.props.fetchSubmission(n).then((function(n){var t=(null===n||void 0===n?void 0:n.payload)||null;e.setState({submission:t})}))}},{key:"renderForm",value:function(e,n){switch(e){case"DistribuertAnsvarsrett":return Object(G.jsx)(je,{selectedSubmission:n});default:return""}}},{key:"render",value:function(){var e=this.props.match.params.formType,n=this.props.selectedSubmission;return n?Object(G.jsxs)(R,{children:[Object(G.jsx)(w.Header,{content:e}),this.renderForm(e,n)]}):Object(G.jsx)(R,{children:Object(G.jsx)("p",{children:"Henter skjema"})})}}]),t}(o.Component),he={fetchSubmission:U},be=Object(u.c)((function(e){return{selectedSubmission:e.selectedSubmission,form:e.selectedForm}}),he)(ue),ve=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){return Object(G.jsxs)(R,{children:[Object(G.jsx)("h1",{children:"404"}),Object(G.jsx)("p",{children:"Siden finnes ikke"})]})}}]),t}(o.Component),ke=Object(u.c)(null,null)(ve),Oe=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){return Object(G.jsx)(w.NavigationBar,{logoLink:"/"})}}]),t}(o.Component),pe=Object(u.c)(null,null)(Oe);O.a.load({google:{families:["Roboto:400,700&display=swap"]}});var me=function(e){var n=[x.a],t=Object(p.a)();return Object(f.createStore)(E(t),e,D(f.applyMiddleware.apply(void 0,n.concat([Object(m.a)(t)]))))}({}),fe=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){return Object(G.jsx)(u.a,{store:me,children:Object(G.jsx)(v.a,{history:V,children:Object(G.jsxs)(b.a,{basename:"/dibk.ftpb.broop.front",children:[Object(G.jsx)(pe,{}),Object(G.jsxs)(h.c,{children:[Object(G.jsx)(h.a,{exact:!0,path:"/skjema/:formType/:submissionId",render:function(e){return Object(G.jsx)(be,Object(j.a)({},e))}}),Object(G.jsx)(h.a,{exact:!0,path:"/:submissionId",render:function(e){return Object(G.jsx)(W,Object(j.a)({},e))}}),Object(G.jsx)(h.a,{exact:!0,path:"/",render:function(e){return Object(G.jsx)(W,Object(j.a)({},e))}}),Object(G.jsx)(h.a,{render:function(){return Object(G.jsx)(ke,{})}})]})]})})})}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ge={};var xe=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(e){var r;return Object(s.a)(this,t),(r=n.call(this,e)).state={isLoaded:!1},r}return Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat("/dibk.ftpb.broop.front","/config.json")).then((function(e){return e.json()})).then((function(e){for(var n in ge)delete ge[n];for(var t in e)ge[t]=e[t];return ge})).then((function(n){return e.setState({isLoaded:!0,config:n})}))}},{key:"render",value:function(){return this.state.isLoaded?this.props.ready(this.state.config):this.props.loading?this.props.loading():null}}]),t}(o.Component),ye=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){return Object(s.a)(this,t),n.apply(this,arguments)}return Object(r.a)(t,[{key:"render",value:function(){return Object(G.jsx)(xe,{ready:function(){return Object(G.jsx)(fe,{})}})}}]),t}(o.Component);d.a.render(Object(G.jsx)(ye,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,n,t){e.exports={fieldList:"Forms_fieldList__kV3nu",inlineFieldList:"Forms_inlineFieldList__2qwV8",inputGroup:"Forms_inputGroup__3Di_h",fieldset:"Forms_fieldset__1SjiH",flexAuto:"Forms_flexAuto__3sXRM",flex25:"Forms_flex25__2ECxU",flex33:"Forms_flex33__1fLcw",flex50:"Forms_flex50__3MMK6",flex66:"Forms_flex66__180-r",flex75:"Forms_flex75__q5a5g",flex100:"Forms_flex100__18MUC"}}},[[176,1,2]]]);
//# sourceMappingURL=main.805d1170.chunk.js.map