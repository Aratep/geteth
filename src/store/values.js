const Web3 = require('web3-old');
const _web3 = new Web3(
    new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/581ac5ee379c41e88b28e2cafe87421b')
);

if (!window.web3) {
    window.webb3 = _web3
}

const initState = {
    balance: {
        get: 0,
        eth: 0,
    },
    savings: {
        casino: 0,
        invest: 0,
        ref: 0,
        currentBalance: 0,
    },
    statistics: {
        day: 0,
        week: 0,
        month: 0,
        allTime: 0,
    },
    referralsIncome: [],
    other: {
        totalSupply: 0,
        contractBalance: 0,
    }
};

const fetchReferalIncomes = () => (dispatch, getState) => {
    if (typeof __SSR__ !== 'undefined') return;
    window.web3.eth.getAccounts((err, [userAddress]) => {
        getState()
            .contract.ReferalsIncome({recipient: userAddress}, {fromBlock: 0})
            .get((err, data) => {
                const transactionList = data.map(item => ({hash: item.transactionHash, ...item.args}))
                    .map(({amount, timestamp, ...props}) => ({
                        amount: window.web3.fromWei(amount, 'ether').toNumber(),
                        timestamp: timestamp.toNumber(),
                        ...props,
                    }));

                dispatch({
                    type: "TXS",
                    referralsIncome: transactionList,
                });
            });
    });
};

const fetchBalance = () => (dispatch, getState) => {
    if (typeof __SSR__ !== 'undefined') return;
    window.web3.eth.getAccounts((err, [userAddress]) => {
        Promise.all([
            new Promise((res, rej) => {
                getState().contract.balanceOf(userAddress, (err, response) => {
                    res(window.web3.fromWei(response, 'ether').toNumber());
                });
            }),
            new Promise((res, rej) => {
                window.web3.eth.getBalance(userAddress, (err, response) => {
                    res(window.web3.fromWei(response, 'ether').toNumber());
                });
            })
        ]).then(res => {
            dispatch({
                type: "BALANCE_FETCHED",
                balance: {
                    get: res[0],
                    eth: res[1],
                }
            });
        });
    });
};

const fetchTransactions = () => (dispatch, getState) => {
    if (typeof __SSR__ !== 'undefined') return;
    window.web3.eth.getAccounts((err, [userAddress]) => {
        Promise.all([
            new Promise((res, rej) => {
                getState().contract.Buy({buyer: userAddress}, {fromBlock: 0}).get((err, evts) => err ? rej(err) : res(evts.length))
            }),
            new Promise((res, rej) => {
                getState().contract.Sell({seller: userAddress}, {fromBlock: 0}).get((err, evts) => err ? rej(err) : res(evts.length))
            }),
        ]).then(res => dispatch({
            type: "OTHER_FETCHED",
            other: {
                transactions: res.reduce((a, b) => a + b)
            }
        }));
    });
};

export const fetchOthers = () => (dispatch, getState) => {
    if (typeof __SSR__ !== 'undefined') return;

    Promise.all([
        new Promise((res, rej) => {
            getState().contract.totalSupply((err, result) => {
                res(window.webb3.fromWei(result, 'ether'));
            });
        }),
        new Promise((res, rej) => {
            window.webb3.eth.getBalance(getState().contract.address, (err, result) => {
                res(window.webb3.fromWei(result, 'ether').toNumber());
            });
        })
    ]).then(res => {
        // console.log(res[0].c[0])
        // console.log(res[1])
        dispatch({
            type: "OTHER_FETCHED",
            other: {
                totalSupply: res[0].c[0],
                contractBalance: res[1]
            }
        });
    });
};

export const fetchOther = () => (dispatch, getState) => {
    if (typeof __SSR__ !== 'undefined') return;

    Promise.all([
        new Promise((res, rej) => {
            getState().contract.totalSupply((err, result) => {
                res(window.web3.fromWei(result, 'ether').toNumber());
            });
        }),
        new Promise((res, rej) => {
            window.web3.eth.getBalance(getState().contract.address, (err, result) => {
                res(window.web3.fromWei(result, 'ether').toNumber());
            });
        })
    ]).then(res => {
        // console.log(res)
        dispatch({
            type: "OTHER_FETCHED",
            other: {
                totalSupply: res[0],
                contractBalance: res[1]
            }
        });
    });
};

const fetchSavings = () => (dispatch, getState) => {
    if (typeof __SSR__ !== 'undefined') return;
    window.web3.eth.getAccounts((err, [userAddress]) => {
        const contract = getState().contract;

        const accumulator = {
            day: 0,
            week: 0,
            month: 0,
            allTime: 0,
        };
        const now = Date.now() / 1000;
        const dayLength = 60 * 60 * 24;
        const dayAgo = now - dayLength;
        const weekAgo = now - dayLength * 7;
        const monthAgo = now - dayLength * 30;

        const accumulateEvent = ({args: {timestamp, amount}}) => {
            amount = window.web3.fromWei(amount, 'ether').toNumber();
            if (timestamp >= dayAgo)
                accumulator.day += amount;
            if (timestamp >= weekAgo)
                accumulator.week += amount;
            if (timestamp >= monthAgo)
                accumulator.month += amount;
            accumulator.allTime += amount;
        };

        Promise.all([
            new Promise((res, rej) => {
                contract.CasinoIncome({recipient: userAddress}, {fromBlock: 0})
                    .get((err, response) => {
                        if (err)
                            rej(err);
                        else {
                            response.forEach(accumulateEvent);
                            res(response.map(item => item.args.amount.toNumber()).reduce((a, b) => (a + b), 0));
                        }
                    });
            }),
            new Promise((res, rej) => {
                contract.InvestIncome({recipient: userAddress}, {fromBlock: 0})
                    .get((err, response) => {
                        if (err)
                            rej(err);
                        else {
                            response.forEach(accumulateEvent);
                            res(response.map(item => item.args.amount.toNumber()).reduce((a, b) => (a + b), 0));
                        }
                    });
            }),
            new Promise((res, rej) => {
                contract.ReferalsIncome({recipient: userAddress}, {fromBlock: 0})
                    .get((err, response) => {
                        if (err)
                            rej(err);
                        else {
                            response.forEach(accumulateEvent);
                            res(response.map(item => item.args.amount.toNumber()).reduce((a, b) => (a + b), 0));
                        }
                    });
            }),
            new Promise((res, rej) => {
                contract.ethStorage(userAddress, (err, response) => {
                    if (err) rej(err);
                    res(response.toNumber());
                });
            }),
        ]).then(res => {
            dispatch({
                type: "SAVINGS_FETCHED",
                savings: {
                    casino: window.web3.fromWei(res[0], 'ether'),
                    invest: window.web3.fromWei(res[1], 'ether'),
                    ref: window.web3.fromWei(res[2], 'ether'),
                    currentBalance: window.web3.fromWei(res[3], 'ether'),
                },
                statistics: accumulator,
            });
        });
    });
};

export const fetchValues = () => dispatch => {
    if (typeof __SSR__ !== 'undefined') return;
    dispatch(fetchBalance());
    dispatch(fetchSavings());
    dispatch(fetchOther());
    dispatch(fetchTransactions());
    dispatch(fetchReferalIncomes());
};

export default (state = initState, action) => {
    switch (action.type) {
        case "BALANCE_FETCHED":
            return {...state, balance: action.balance};
        case "SAVINGS_FETCHED":
            return {...state, savings: action.savings, statistics: action.statistics};
        case "OTHER_FETCHED":
            return {...state, other: {...state.other, ...action.other}};
        case "TXS":
            return {...state, referralsIncome: action.referralsIncome};
        default:
            return state;
    }
};
