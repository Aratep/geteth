import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

class Form extends React.Component {
  state = {
    fields: {},
    everythingValid: false
  };

  componentDidMount() {
    this.init(this.props.fields);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.fields !== this.props.fields) this.init(newProps.fields);
  }

  init = fields => {
    const state = {fields: {}, everythingValid: false};
    _.forEach(fields, field => {
      state.fields[field.name] = {
        value: '',
        valid: false,
        touched: false,
        placeholder: field.placeholder,
        name: field.name
      };
    });
    this.setState({...state});
    setTimeout(this.validateAll, 0);
  };

  validateAll = () => {
    let everythingValid = true;
    _.forEach(this.state.fields, field => {
      everythingValid = everythingValid && field.valid;
    });
    this.setState({everythingValid});
  };

  touch = fieldName => {
    this.setState({
      fields: {
        ...this.state.fields,
        [fieldName]: {
          ...this.state.fields[fieldName],
          touched: true
        }
      }
    });
  };
  change = (value, fieldName) => {
    const valid = _.find(this.props.fields, {name: fieldName}).validate(value);
    this.setState({
      fields: {
        ...this.state.fields,
        [fieldName]: {...this.state.fields[fieldName], valid, value}
      }
    });
    setTimeout(this.validateAll, 0);
  };

  submit = () => {
    if (this.state.everythingValid) {
      const values = _.mapValues(this.state.fields, field => field.value);
      this.props.action(this.props.contract, values, this.props.closeForm);
    }
  };

  render() {
    return (
      <div className="flying-form withdrawal">
        <div className="close" onClick={this.props.closeForm}>
          <i className="fa fa-times" />
        </div>
        {_.map(this.state.fields, (field, idx) => (
          <input
            type="text"
            className={!field.valid && field.touched ? 'invalid' : ''}
            placeholder={field.placeholder}
            onChange={e => this.change(e.target.value, field.name)}
            onBlur={() => this.touch(field.name)}
            key={`field-${idx}`}
          />
        ))}
        <div
          className={`button ${!this.state.everythingValid ? 'disabled' : ''}`}
          onClick={this.submit}
        >
          {this.props.submitButtonText}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  contract: state.contract
}))(Form);
