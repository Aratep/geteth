import React from 'react';
import Form from './Form';
import { getCurrentHolderIndex } from "../../../store/action";

const reinvest = function(contract, values, callback) {
  window.contract = contract;
  contract.reinvest.sendTransaction(
    window.web3.toWei(values.eth),
    {from: window.web3.eth.defaultAccount},
    (err, txhash) => {
      if (!err) callback();
    }
  );
};
const withdrawal = function(contract, values, callback) {
  contract.withdraw.sendTransaction(
    window.web3.toWei(values.eth),
    {from: window.web3.eth.defaultAccount},
    (err, txhash) => {
      if (!err) callback();
    }
  );
};
const transfer = function(contract, values, callback) {
  getCurrentHolderIndex(contract).then(
      idx => {
        console.log(values.address,
          window.web3.toWei(values.amount),
          idx,
          {
            from: window.web3.eth.defaultAccount
          });
        contract.transfer.sendTransaction(
            values.address,
            window.web3.toWei(values.amount),
            idx,
            {
              from: window.web3.eth.defaultAccount
            },
            (err, txhash) => {
              if (!err) callback();
            }
        )
      }
  );
};

const forms = {
  withdrawal: {
    submitButtonText: 'withdrawal',
    fields: [
      {
        name: 'eth',
        validate: value => !isNaN(+value) && value > 0,
        placeholder: 'number of eth you want to withdrawal'
      }
    ],
    action: withdrawal
  },
  reinvest: {
    submitButtonText: 'reinvest',
    fields: [
      {
        name: 'eth',
        validate: value => !isNaN(+value) && value > 0,
        placeholder: 'number of eth you want to reinvest'
      }
    ],
    action: reinvest
  },
  transfer: {
    submitButtonText: 'transfer tokens',
    fields: [
      {
        name: 'address',
        validate: value => window.web3 && window.web3.isAddress(value),
        placeholder: 'address'
      },
      {
        name: 'amount',
        validate: value => !isNaN(+value) && value > 0 && Number.isInteger(+value),
        placeholder: 'amount of tokens you want to transfer (integer)'
      }
    ],
    action: transfer
  }
};

export default ({form, closeForm}) =>
  form ? <Form {...forms[form]} closeForm={closeForm} /> : null;
