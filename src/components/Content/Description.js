import React from 'react';
import { connect } from 'react-redux';
import { textPage } from './texts';

const Description = ({lang, contract}) => (
  <div className="description-container circled">
    <div className="row">
      <div className="col-12">
        <h1 dangerouslySetInnerHTML={{__html: textPage[lang].textTitle(contract ? contract.address : '')}} />
        <ul>{textPage[lang].textPreview.map((_, idx) => <li key={`itm-${idx}`} dangerouslySetInnerHTML={{__html: _}} />)}</ul>
      </div>
    </div>
  </div>
);

export default connect(state => ({
    lang: state.lang,
    contract: state.contract,
}))(Description);
