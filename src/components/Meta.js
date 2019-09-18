import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import meta from '../assets/text/meta.json';


const Meta = ({ lang, page, router }) => {
    const title = meta.titles[lang][page],
        description = meta.descriptions[lang][page],
        canonical = window.location.origin + window.location.pathname,
        ogTitle = meta.ogTitle[lang],
        ogDescription = meta.ogDescription[lang],
        ogUrl = router.location.pathname;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            <meta name="og:title" content={ogTitle} />
            <meta name="og:description" content={ogDescription} />
            <meta name="og:url" content={ogUrl} />
        </Helmet>
    );
};


export default connect(state => ({
    lang: state.lang,
    router: state.router,
}))(Meta);
