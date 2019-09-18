import {helperServer} from "../utils";

const initState = {
  getEth: 0,
  ethDollar: 0
};

export const fetchPrice = () => (dispatch, getState) => {
  if (typeof __SSR__ !== 'undefined') return;
  getState().contract.price((err, res) => {
    dispatch({
      type: "CHANGE_GET/ETH_COURSE",
      course: window.webb3.fromWei(res.toNumber(), 'ether'),
    });
  });
  fetch(`${helperServer}/dollarCourse`)
      .then(res => res.json())
      .then(({ course }) => {
        dispatch({
          type: "CHAGE_ETH/DOLLAR_COURSE",
          course
        });
      });
}

export const fetchCourses = () => (dispatch, getState) => {
  if (typeof __SSR__ !== 'undefined') return;
  getState().contract.price((err, res) => {
    dispatch({
      type: "CHANGE_GET/ETH_COURSE",
      course: window.web3.fromWei(res.toNumber(), 'ether'),
    });
  });
  fetch(`${helperServer}/dollarCourse`)
    .then(res => res.json())
    .then(({ course }) => {
      dispatch({
        type: "CHAGE_ETH/DOLLAR_COURSE",
        course
      });
    });
};

export default (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_GET/ETH_COURSE":
      return { ...state, getEth: action.course };
    case "CHAGE_ETH/DOLLAR_COURSE":
      return { ...state, ethDollar: action.course };
    default:
      return state;
  }
};
