(this["webpackJsonpdibk-ftb-broop-front"]=this["webpackJsonpdibk-ftb-broop-front"]||[]).push([[0],{124:function(t,e,n){t.exports={container:"Container_container__dTOM0"}},131:function(t,e,n){},175:function(t,e,n){"use strict";n.r(e);var r=n(14),c=n(15),a=n(18),o=n(17),i=n(2),s=n(44),u=n.n(s),j=(n(131),n(112)),b=n(20),l=n(7),h=n(80),p=n(70),d=n(109),f=n.n(d),O=n(21),m=n(113),v=n(55),y=n(119),x=n(120),k="UPDATE_NAME",g="FETCH_FORM",w=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1?arguments[1]:void 0;switch(e.type){case k:return e.payload;default:return t}},C={},I=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case g:return e.payload;default:return t}},T=function(t){return Object(v.combineReducers)({router:Object(p.b)(t),name:w,selectedForm:I})},M=Object(O.a)(),S=Object(y.composeWithDevTools)({});var E=n(74),F=n(75),_=n(124),B=n.n(_),D=n(6),L=function(t){Object(a.a)(n,t);var e=Object(o.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(D.jsx)("div",{className:B.a.container,children:this.props.children})}}]),n}(i.Component),N=Object(b.c)(null,null)(L),A=function(t){Object(a.a)(n,t);var e=Object(o.a)(n);function n(t){var c;return Object(r.a)(this,n),(c=e.call(this,t)).handleInputChange=c.handleInputChange.bind(Object(E.a)(c)),c}return Object(c.a)(n,[{key:"handleInputChange",value:function(t){this.props.updateName(t)}},{key:"render",value:function(){return Object(D.jsxs)(N,{children:[Object(D.jsx)("h1",{children:"Home"}),Object(D.jsx)(h.b,{to:"/Skjema/Ansvarsrett/3/",children:Object(D.jsx)(F.Button,{content:"Eksempelskjema"})})]})}}]),n}(i.Component),H=Object(b.c)((function(t){return{}}),{})(A),R=function(t){Object(a.a)(n,t);var e=Object(o.a)(n);function n(t){var c;return Object(r.a)(this,n),(c=e.call(this,t)).state={form:null},c}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var t=this,e=this.props.match.params.formId,n=this.props.match.params.formType;this.props.fetchForm(n,e).then((function(e){var n=(null===e||void 0===e?void 0:e.payload)||null;t.setState({form:n})}))}},{key:"render",value:function(){var t=this.props.match.params.formId,e=this.props.match.params.formType;return this.state.form?Object(D.jsxs)(N,{children:[Object(D.jsx)("h1",{children:e}),"Skjema med id: ",t]}):Object(D.jsx)(N,{children:Object(D.jsx)("p",{children:"Henter skjema"})})}}]),n}(i.Component),W={fetchForm:function(t,e){return function(n){var r="https://dibk-ftpb-broop-api.azurewebsites.net/api/".concat(t,"?formId=").concat(e);return fetch(r).then((function(t){return t.json()})).then((function(t){return n({type:g,payload:t})}))}}},J=Object(b.c)((function(t){return{}}),W)(R),z=function(t){Object(a.a)(n,t);var e=Object(o.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(D.jsxs)(N,{children:[Object(D.jsx)("h1",{children:"404"}),Object(D.jsx)("p",{children:"Siden finnes ikke"})]})}}]),n}(i.Component),P=Object(b.c)(null,null)(z),U=function(t){Object(a.a)(n,t);var e=Object(o.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(D.jsx)(F.NavigationBar,{logoLink:"/"})}}]),n}(i.Component),$=Object(b.c)(null,null)(U);f.a.load({google:{families:["Roboto:400,700&display=swap"]}});var q=function(t){var e=[x.a],n=Object(O.a)();return Object(v.createStore)(T(n),t,S(v.applyMiddleware.apply(void 0,e.concat([Object(m.a)(n)]))))}({}),G=function(t){Object(a.a)(n,t);var e=Object(o.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(D.jsx)(b.a,{store:q,children:Object(D.jsx)(p.a,{history:M,children:Object(D.jsxs)(h.a,{basename:"/dibk.ftpb.broop.front",children:[Object(D.jsx)($,{}),Object(D.jsxs)(l.c,{children:[Object(D.jsx)(l.a,{exact:!0,path:"/skjema/:formType/:formId",render:function(t){return Object(D.jsx)(J,Object(j.a)({},t))}}),Object(D.jsx)(l.a,{exact:!0,path:"/",render:function(t){return Object(D.jsx)(H,Object(j.a)({},t))}}),Object(D.jsx)(l.a,{render:function(){return Object(D.jsx)(P,{})}})]})]})})})}}]),n}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var K={};var Q=function(t){Object(a.a)(n,t);var e=Object(o.a)(n);function n(t){var c;return Object(r.a)(this,n),(c=e.call(this,t)).state={isLoaded:!1},c}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var t=this;fetch("".concat("/dibk.ftpb.broop.front","/config.json")).then((function(t){return t.json()})).then((function(t){for(var e in K)delete K[e];for(var n in t)K[n]=t[n];return K})).then((function(e){return t.setState({isLoaded:!0,config:e})}))}},{key:"render",value:function(){return this.state.isLoaded?this.props.ready(this.state.config):this.props.loading?this.props.loading():null}}]),n}(i.Component),V=function(t){Object(a.a)(n,t);var e=Object(o.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(D.jsx)(Q,{ready:function(){return Object(D.jsx)(G,{})}})}}]),n}(i.Component);u.a.render(Object(D.jsx)(V,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[175,1,2]]]);
//# sourceMappingURL=main.941d91eb.chunk.js.map