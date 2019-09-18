import React from 'react';
import {Element} from 'react-scroll';
import {connect} from 'react-redux';
import left from '../../assets/icons/home/left.png';
import right from '../../assets/icons/home/right.png';
import text from '../../assets/text/description.json';
import crypto from '../../assets/crypto1.png';
import money from '../../assets/money1.png';
import Typist from 'react-typist';

const Decoration = ({ icon }) => (
  <div className="col-xl-3 col-lg-2 d-none d-lg-flex align-items-center">
    <div className="decoration">
      <img src={icon} alt='' />
    </div>
  </div>
);

const delay = 1000;

class Typer extends React.Component {
  state = {
    render: true
  };
  onTypingDone = () => {
    this.setState({render: false});
    setTimeout(() => this.setState({render: true}), 1000);
  };
  render() {
    const {lang} = this.props;
    return (
      <div className="typer-container">
        {this.state.render && (
          <Typist
            className="typer"
            avgTypingDelay={10}
            onTypingDone={this.onTypingDone}
          >
            <span>{text[lang].p[0]}</span>
            <Typist.Backspace count={text[lang].p[0].length} delay={delay} />
            <span>{text[lang].p[1]}</span>
            <Typist.Backspace count={text[lang].p[1].length} delay={delay} />
            <span>{text[lang].p[2]}</span>
            <Typist.Backspace count={text[lang].p[2].length} delay={delay} />
            <span>{text[lang].p[3]}</span>
            <Typist.Backspace count={text[lang].p[3].length} delay={delay} />
            <span>{text[lang].p[4]}</span>
            <Typist.Backspace count={text[lang].p[4].length} delay={delay} />
          </Typist>
        )}
      </div>
    );
  }
}

const Description = ({lang}) => (
  <Element name="about-us">
    <div className="description-container">
      <div className="container">
        <div className="row no-gutters">
          <Decoration icon={left} />
          <div className="col-xl-6 col-lg-8  d-flex flex-column align-items-center">
            <h1>{text[lang].h2}</h1>
            <p>{text[lang].p[5]}</p>
            <div className="shit">
              <div className="winter-project">
                <div className="winter-project-circle">{text[lang].p[8]}</div>
              </div>
              <div className="projects">
                <div className="project">
                  <img src={crypto} alt="" />
                  <div className="project-description">{text[lang].p[6]}</div>
                </div>
                <div className="project">
                  <img src={money} alt="" />
                  <div className="project-description">{text[lang].p[7]}</div>
                </div>
              </div>
            </div>
          </div>
          <Decoration icon={right} />
        </div>
        <div className="row d-flex justify-content-center">
          <Typer lang={lang} />
        </div>
      </div>
    </div>
  </Element>
);

export default connect(state => ({lang: state.lang}))(Description);
