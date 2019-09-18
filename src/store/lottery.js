const initState = {
  fetched: false,
  filter: 'pot',
  yourTickets: 0,
  yourTokens: 0,
  loteryBank: 0,
  totalTickets: 0,
  lastRoundNumber: 0,
  history: {
    currentRoundNumber: 0
  }
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'LOTERY_INFO_FETCHED':
      return {
        ...state,
        ...action.data,
        fetched: true
      };
    case 'CREATE_EMPTY_HISTORY':
      return {
        ...state,
        history: {
          ...state.history,
          [action.roundNumber]: {
            ready: false
          }
        }
      };
    case 'LOTTERY_BANK_UPDATED':
      return {...state, loteryBank: action.loteryBank};
    case 'CHANGE_LOTTERY_FILTER':
      return {...state, filter: action.filter};
    case 'HISTORY_ITEM_FETCHED':
      return {
        ...state,
        history: {
          ...state.history,
          [action.roundNumber]: {
            ...action.historyItem,
            ready: true
          }
        }
      };
    case 'BOUGHT_TICKETS':
      return {
        ...state,
        yourTickets: +(state.yourTickets + action.tickets),
        totalTickets: +(state.totalTickets + action.tickets),
        yourTokens: +(state.yourTokens - action.tickets)
      };
    case 'CHANGE_LOTERY_HISTORY_CURRENT_ROUND':
      return {
        ...state,
        history: {...state.history, currentRoundNumber: action.roundNumber}
      };
    default:
      return state;
  }
};
