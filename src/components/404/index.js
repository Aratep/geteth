import React from 'react';
import {NavLink} from 'react-router-dom';
import Meta from "../Meta";
import Language from "../Header/Language";
import {connect} from "react-redux";

const Error404 = ({ lang }) => (
    <div style={{height: '100vh'}} className="d-flex justify-content-center align-items-center flex-column language-ontop">
        <h1>404. { lang === 'eng' ? 'Page not found' : 'Страница не найдена' }</h1>
        <NavLink className="button" to="/">{ lang === 'eng' ? 'Home' : 'На главную' }</NavLink>
        <Language />
        <Meta page='404' />
    </div>
);

export default connect(state => ({
    lang: state.lang,
}))(Error404)
