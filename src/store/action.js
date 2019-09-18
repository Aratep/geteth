import abi from "../assets/get.js";
import { toast } from "react-toastify";
import {gameContractAddress, helperServer} from "../utils";

let loteryMetamaskToast = null;

export const fetchParameters = () => dispatch => {
  if (typeof __SSR__ !== 'undefined') return;
  dispatch({
    type: "PARAMETERS_FETCHED",
    parameters: {
      time: null,
      lotteryTime: null,
      minBet: 0.01,
      coefficient: 0.98,
      oraclizeFee: 0.0015,
      jackpotFee: 0.002,
      maxBet: 5
    }
  });

  fetch(`${helperServer}/parameters`)
    .then(res => res.json())
    .then(parameters => {
      dispatch({ type: "PARAMETERS_FETCHED", parameters });
    });
};

export const createEmptyHistory = roundNumber => ({
  type: "CREATE_EMPTY_HISTORY",
  roundNumber
});

export const updateLoteryBank = () => dispatch => {
  if (typeof __SSR__ !== 'undefined') return;
  fetch(`${helperServer}/loteryBank`)
    .then(res => res.json())
    .then(({ loteryBank }) => {
      dispatch({
        type: "LOTTERY_BANK_UPDATED",
        loteryBank
      });
    });
};

export const fetchLoteryInfo = () => dispatch => {
  if (typeof __SSR__ !== 'undefined') return;
  new Promise((res, rej) => {
    if (window.web3) {
      window.web3.eth.getAccounts((err, accounts) => {
        if (accounts.length)
          res(
            fetch(`${helperServer}/loteryInfo?userAddress=${accounts[0]}`)
          );
        else res(fetch(`${helperServer}/loteryInfo`));
      });
    } else res(fetch(`${helperServer}/loteryInfo`));
  })
    .then(res => res.json())
    .then(({ data }) => {
      dispatch({ type: "LOTERY_INFO_FETCHED", data });
    });
};

export const changeCurrentRoundNumber = newRoundNumber => (dispatch, getState) => {
  if (typeof __SSR__ !== 'undefined') return;
  newRoundNumber = Math.min(
    newRoundNumber,
    getState().lotery.lastRoundNumber - 1
  );
  newRoundNumber = Math.max(newRoundNumber, 1);
  if (!getState().lotery.history[newRoundNumber]) {
    dispatch(createEmptyHistory(newRoundNumber));
    dispatch(fetchHistoryItem(newRoundNumber));
  }
  dispatch({
    type: "CHANGE_LOTERY_HISTORY_CURRENT_ROUND",
    roundNumber: newRoundNumber
  });
};

export const buyTickets = tickets => (dispatch, getState) => {
  if (typeof __SSR__ !== 'undefined') return;
  if (getState().lotery.yourTokens >= tickets && tickets !== 0 && window.web3) {
    const contract = window.web3.eth.contract(abi).at(gameContractAddress);
    window.web3.eth.getAccounts((err, accs) => {
      if (!accs.length) return;
      loteryMetamaskToast = toast.success(
        "open metamask to confirm transaction",
        {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
          autoClose: false
        }
      );
      contract.sendToEthLottery.sendTransaction(
        tickets * 1000000000000000000,
        { from: accs[0] },
        (err, txhash) => {
          if (!err)
            dispatch({
              type: "BOUGHT_TICKETS",
              tickets
            });
          toast.dismiss(loteryMetamaskToast);
        }
      );
    });
  }
};

export const changeLoteryFilter = filter => {
  if (typeof __SSR__ !== 'undefined') return;
  return {
    type: "CHANGE_LOTTERY_FILTER",
    filter
  };
};

export const fetchCasinoStatistics = () => dispatch => {
  if (typeof __SSR__ !== 'undefined') return;
  fetch(`${helperServer}/casinoStatistics`)
    .then(res => res.json())
    .then(({ casinoStatistics }) => {
      dispatch({
        type: "CASINO_STATISTICS_UPDATED",
        casinoStatistics: { ...casinoStatistics }
      });
    });
};

export const fetchHistoryItem = roundNumber => dispatch => {
  if (typeof __SSR__ !== 'undefined') return;
  fetch(`${helperServer}/loteryHistory?round=${roundNumber}`)
    .then(res => res.json())
    .then(winners => {
      dispatch({
        type: "HISTORY_ITEM_FETCHED",
        roundNumber,
        historyItem: {
          winners,
          totalTickets: winners.reduce(
            (acc, winner) => acc + winner.ticketsNumber,
            0
          )
        }
      });
    });
};

export const getCurrentHolderIndex = contract => new Promise((res, rej) => {
  if (typeof __SSR__ !== 'undefined') return;
  window.web3.eth.getAccounts((err, [userAddress]) => {
    if (err) return rej(err);
    contract.getHolders((err, holders) => {
      if (err) return rej(err);
      for (let i = 0; i < holders.length; i++) {
        if (holders[i] === userAddress) return res(i);
      }
      return res(0);
    });
  });
});
