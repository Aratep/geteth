const { Schema, model } = require('mongoose');


module.exports = {
  User: model('User', new Schema({
    agree: {
      type: Boolean,
      required: true
    },
    email: {
      type: String,
      required: false
    },
    tel: {
      type: String,
      required: false
    },
    time: {
      type: 'string',
      required: true
    }
  }))
};
