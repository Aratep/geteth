import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import {connect} from 'react-redux';
import './style.sass';
import questions from './questions';

class FAQItem extends React.Component {
  state = {
    active: false
  };
  render() {
    return (
      <div
        className="faq-item button"
        onClick={() => this.setState({active: !this.state.active})}
      >
        <div className="question-wrap">
          <div
            className="question"
            dangerouslySetInnerHTML={{__html: this.props.question}}
          />
          <div className={`toggle ${this.state.active ? 'active' : ''}`}>
            <i className="fa fa-chevron-down" />
          </div>
        </div>
        {this.state.active && (
          <div
            className="answer"
            dangerouslySetInnerHTML={{__html: this.props.answer}}
          />
        )}
      </div>
    );
  }
}

const FAQ = ({lang}) => (
  <div>
    <Header />
    <div className="faq-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 offset-md-1 offset-lg-2">
            {questions[lang].map(item => (
              <FAQItem {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default connect(state => ({
  lang: state.lang
}))(FAQ);
