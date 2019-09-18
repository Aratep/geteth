import abi from "../assets/get";
import { tokenContractAddress } from "../utils";

let contract = null;
if (window.web3) {
  contract = window.web3.eth.contract(abi).at(tokenContractAddress);
  window.contract = contract;
}
if(window.webb3) {
  contract = window.webb3.eth.contract(abi).at(tokenContractAddress);
  window.contract = contract;
}

export default (state = contract, action) => state;
