import React from "react";
import { connect } from "react-redux";
import questions from "./questions";

class FAQItem extends React.Component {
  state = {
    active: false
  };
  toggleActive = () => {
    this.setState({
      active: !this.state.active
    });
  };
  render() {
    return (
      <div className={`faq ${this.state.active ? "active" : ""}`}>
        <div onClick={this.toggleActive} className="faq-toggle">
          <i className="fas fa-chevron-down" />
          <div
            className="question"
            dangerouslySetInnerHTML={{ __html: this.props.question }}
          />
        </div>
        <div
          className="answer"
          dangerouslySetInnerHTML={{ __html: this.props.answer }}
        />
      </div>
    );
  }
}

class FAQ extends React.Component {
  render() {
    return (
      <div id='exchange-faq' className="faq-container circled">
        <div className="faq-container-title">F.A.Q.</div>
        {questions[this.props.lang].map((obj, idx) => (
          <FAQItem question={obj[0]} answer={obj[1]} key={`faq-${idx}`} />
        ))}
      </div>
    );
  }
}

export default connect(state => ({
  lang: state.lang
}))(FAQ);
