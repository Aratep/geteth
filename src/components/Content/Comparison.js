import React from 'react';
import { connect } from 'react-redux';
import { comparisions, textPage } from './texts';
import text from '../../assets/text/comparison.json';

const Row = ({ className, advantage, geteth, ect, pantheon, cmt, powh }) => (
    <div className={`row ${className}`}>
        <div className="col-xl-5 col-4">
            <div className="cell not-centered">
                {advantage !== text.eng.advantages.instruction && advantage !== text.rus.advantages.instruction && advantage}
                {advantage === text.eng.advantages.instruction && (
                    <a
                        href="https://drive.google.com/file/d/1L2q8h21gdVDiIFAGEMxHK21gDzH6zthM/view"
                        target="_blank"
                        className="instruction"
                        rel="noopener noreferrer"
                    >
                        {advantage}
                    </a>
                )}
                {advantage === text.rus.advantages.instruction && (
                    <a
                        href="https://drive.google.com/file/d/13te9EZN4QjMlMfRnc6XrPpqcooTUvQ79/view"
                        target="_blank"
                        className="instruction"
                        rel="noopener noreferrer"
                    >
                        {advantage}
                    </a>
                )}
            </div>
        </div>
        <div className="col">
            <div className={`cell geteth ${geteth.advantage ? 'advantage' : 'disadvantage'}`}>{geteth.value}</div>
        </div>
        <div className="col">
            <div className={`cell ${ect.advantage ? 'advantage' : 'disadvantage'}`}>{ect.value}</div>
        </div>
        <div className="col">
            <div className={`cell ${pantheon.advantage ? 'advantage' : 'disadvantage'}`}>{pantheon.value}</div>
        </div>
        <div className="col">
            <div className={`cell ${cmt.advantage ? 'advantage' : 'disadvantage'}`}>{cmt.value}</div>
        </div>
        <div className="col">
            <div className={`cell ${powh.advantage ? 'advantage' : 'disadvantage'}`}>{powh.value}</div>
        </div>
    </div>
);

const Comparison = ({ lang }) => (
    <div className="comparision-container circled">
        <div className="scrollable">
            <Row
                className="header"
                advantage={textPage[lang].adv}
                geteth={{ value: 'GetETH' }}
                ect={{ value: 'ETC' }}
                pantheon={{ value: 'Pantheon' }}
                cmt={{ value: 'CMT' }}
                powh={{ value: 'PoWh 3D' }}
            />
            <div className="values-wrap">
                {comparisions(lang).map((comparision, idx) => (
                    <Row className="values" {...comparision} key={`comparison-${idx}`} />
                ))}
            </div>
        </div>
    </div>
);

export default connect(state => ({
    lang: state.lang,
}))(Comparison);
