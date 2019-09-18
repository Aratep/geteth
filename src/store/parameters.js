const initState = {
  isLoaded: false,
  minBet: 0,
  maxBet: 3,
  coefficient: 0,
  oraclizeFee: 0,
  time: 0
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'PARAMETERS_FETCHED':
      return {
        ...state,
        ...action.parameters,
        isLoaded: true
      };
    case 'CASINO_STATISTICS_UPDATED':
      return {...state, casinoStatistics: action.casinoStatistics};
    default:
      return state;
  }
};
