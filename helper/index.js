const Web3 = require("web3");
const express = require("express");
const abi = require("../src/assets/abi");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./models");
const get = require("../src/assets/get");
const _ = require("lodash");
const axios = require("axios");
const sendpulse = require("sendpulse-api");
const dateFormat = require("dateformat");
const utils = require("../src/utils");


const API_USER_ID = "f89d8f889fe0942756c1dea9d7906460";
const API_SECRET = "7a3fd27c4f4e8709a8b6d5b9e53e40c5";
const TOKEN_STORAGE = "/tmp/";

let currency = 0;
const updateCurrency = () => {
  axios
    .get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=fbb908152bcb47373b7f19f750777f8c074c5dfe0c8b048d1aa85331d1654ed4"
    )
    .then(res => {
      currency = res.data.USD;
    });
};

updateCurrency();
setInterval(updateCurrency, 3600000);

const app = express();

// const web3 = new Web3(
//   new Web3.providers.HttpProvider(
//     'https://ropsten.infura.io/v3/97ede1ba03884efca826feaf1bdba5d1'
//   )
// // );

// const options = {
//   timeout: 30000,
//   headers: {authorization: 'Basic username:password'}
// }; // set a custom timeout at 30 seconds, and credentials (you can also add the credentials to the URL: ws://username:password@localhost:8546)
// const ws = new Web3WsProvider('ws://localhost:8546', options);

const provider = new Web3.providers.HttpProvider(utils.infuraEndpoint);
// provider.on('error', e => console.error('WS Error', e));
// provider.on('end', e => console.error('WS End', e));

const web3 = new Web3(provider);

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const contract = new web3.eth.Contract(abi, utils.gameContractAddress);
const getContract = new web3.eth.Contract(get, utils.tokenContractAddress);

let historyItem = {};

let betsTotal = 0;

const updateBetsTotal = async () => {
  const betEvents = await contract.getPastEvents("Bet", {
    fromBlock: 0,
    toBlock: "latest"
  });
  betsTotal =
    betEvents.reduce((acc, bet) => acc + +bet.returnValues.amount, 0) /
    1000000000000000000;
};
updateBetsTotal();
setInterval(updateBetsTotal, 10000);

const updateHistoryItem = async () => {
  let results = await contract.getPastEvents("Bet", {
    fromBlock: (await web3.eth.getBlockNumber()) - 6000,
    toBlock: "latest"
  });
  if (!results.length) {
    historyItem = {
      totalBets: 0,
      numberOfBets: 0,
      lastLotery: null,
      max: [
        { winner: "0x0", win: 0 },
        { winner: "0x0", win: 0 },
        { winner: "0x0", win: 0 }
      ]
    };
    return;
  }

  results.sort((a, b) =>
    +a.returnValues.prize < +b.returnValues.prize ? 1 : -1
  );
  const numberOfBets = results.length;
  const totalBets =
    results.reduce((acc, result) => acc + +result.returnValues.amount, 0) /
    1000000000000000000;
  const max = [
    {
      winner: results[0] ? results[0].returnValues.gamer : "0x0",
      win: results[0] ? results[0].returnValues.prize / 1000000000000000000 : 0
    },
    {
      winner: results[1] ? results[1].returnValues.gamer : "0x0",
      win: results[1] ? results[1].returnValues.prize / 1000000000000000000 : 0
    },
    {
      winner: results[2] ? results[2].returnValues.gamer : "0x0",
      win: results[2] ? results[2].returnValues.prize / 1000000000000000000 : 0
    }
  ];
  const lastRoundNumber = +(await contract.methods.ethLotteryRound().call());
  let lastLotery;
  if (lastRoundNumber === 0) lastLotery = null;
  else {
    const lastLoteryWinners = await getLoteryRoundHistory(lastRoundNumber);
    if (lastLoteryWinners === null) lastLotery = null;
    else
      lastLotery = {
        winner: lastLoteryWinners[0].user,
        win: lastLoteryWinners[0].prize
      };
  }
  historyItem = { totalBets, numberOfBets, lastLotery, max };
  console.log(historyItem);
};

updateHistoryItem();
setInterval(updateHistoryItem, 20000);

app.get("/parameters", async (req, res) => {
  Promise.all([
    contract.methods.MIN_ETH_BET().call(),
    contract.methods.BENEFICIAR_FEE_PERCENT().call(),
    contract.methods.lastEthLotteryTime().call()
  ]).then(result => {
    res.json({
      minBet: result[0] / 1000000000000000000,
      coefficient: (100 - result[1]) / 100,
      lotteryTime: +result[2] ? result[2] * 1000 + 24 * 3600000 : null,
      ethDollarCourse: currency,
      casinoStatistics: {
        ...historyItem,
        totalEth: (betsTotal + 3487.83).toFixed(2),
        totalDollars: (currency * (betsTotal + 3487.83)).toFixed(0)
      }
    });
  });
});

app.get("/casinoStatistics", async (req, res) => {
  res.json({
    casinoStatistics: {
      ...historyItem,
      totalEth: (betsTotal + 3487.83).toFixed(2),
      totalDollars: (currency * (betsTotal + 3487.83)).toFixed(0)
    }
  });
});

app.get("/betsTotal", (req, res) => {
  res.json({ res: betsTotal });
});

app.get("/peopleCount", async (req, res) => {
  let count = await User.count();
  count += parseInt((Date.now() - 1549426094993) / 3600000);
  res.json({ count: count + 319 });
});

app.get("/ticketsOf", async (req, res) => {
  const { userAddress } = req.query;
  let yourTickets = await getContract.methods
    .lotteryBalanceOf(userAddress)
    .call();
  res.json({
    tickets: yourTickets
  });
});

const getLoteryRoundHistory = async round => {
  const coefficients = [0.5, 0.25, 0.12, 0.08, 0.05];
  const winners = await contract.getPastEvents("WinLottery", {
    filter: { round },
    fromBlock: 0,
    toBlock: "latest"
  });
  if (!winners.length) return null;
  return winners
    .map(winner => ({
      user: winner.returnValues.gamer,
      prize: (winner.returnValues.prize / 1000000000000000000).toFixed(3),
      ticketsNumber: (
        winner.returnValues.ticketsAmount / 1000000000000000000
      ).toFixed(0)
    }))
    .sort((a, b) => (+a.prize < +b.prize ? 1 : -1))
    .map((winner, index) => ({
      ...winner,
      ownedRatio: coefficients[index] * 100
    }));
};

app.get("/loteryInfo", async (req, res) => {
  const { userAddress } = req.query;
  let yourTickets = 0;
  let yourTokens = 0;
  if (userAddress && web3.utils.isAddress(userAddress)) {
    yourTokens = +(
      (await getContract.methods.balanceOf(userAddress).call()) /
      1000000000000000000
    ).toFixed(0);
    yourTickets = +(
      (await getContract.methods.ethLotteryBalances(userAddress).call()) /
      1000000000000000000
    ).toFixed(0);
  }

  const loteryBank = +(
    (await contract.methods.lotterySize().call()) / 1000000000000000000
  );
  const lastRoundNumber = +(await contract.methods.ethLotteryRound().call()) + 1;

  const data = {
    yourTickets,
    yourTokens,
    totalTickets: +(
      (await getContract.methods.ethLotteryBank().call()) / 1000000000000000000
    ),
    loteryBank,
    lastRoundNumber: lastRoundNumber,
    history: {
      currentRoundNumber: lastRoundNumber - 1,
      [lastRoundNumber - 1]: {
        ready: true,
        winners: await getLoteryRoundHistory(lastRoundNumber - 1)
      }
    }
  };
  res.json({
    data
  });
});

app.get("/loteryHistory", async (req, res) => {
  const { round } = req.query;
  res.json({ winners: await getLoteryRoundHistory(round) });
});

// app.get('/tickets', (req, res) => {
// 	getContract.methods.
// });

app.get("/history", async (req, res) => {
  res.json({ ...historyItem });
});

const rollUnder = (game, winResults) => {
  switch (game) {
    case "coin":
      return "50%";
    case "etheroll":
      return +winResults[0] + 1 + "%";
    case "dice":
      return parseInt(winResults.length * (1 / 6) * 100) + "%";
    case "two-dice":
      const chancesForNumbers = {
        0: 1 / 36,
        1: 2 / 36,
        2: 3 / 36,
        3: 4 / 36,
        4: 5 / 36,
        5: 6 / 36,
        6: 5 / 36,
        7: 4 / 36,
        8: 3 / 36,
        9: 2 / 36,
        10: 1 / 36
      };
      return (
        parseInt(
          winResults.reduce((acc, val) => acc + chancesForNumbers[val], 0) * 100
        ) + "%"
      );
  }
};

const parseResults = (game, results) => {
  console.log(results.length);
  return results
    .sort((a, b) =>
      +a.returnValues.timestamp < +b.returnValues.timestamp ? 1 : -1
    )
    .map(result => ({
      time: result.returnValues.timestamp,
      player: result.returnValues.gamer,
      bet: (result.returnValues.amount / 1000000000000000000).toFixed(2),
      rollUnder: rollUnder(game, result.returnValues.winResult),
      payout: (result.returnValues.prize / 1000000000000000000).toFixed(3)
    }));
};

app.get("/loteryBank", async (req, res) => {
  const loteryBank = +(
    (await contract.methods.lotterySize().call()) / 1000000000000000000
  );
  res.json({
    loteryBank
  });
});

app.get("/lastLotteryTime", async (req, res) => {
  const time = await contract.methods.lastEthLotteryTime().call();
  res.json({
    time
  });
});

app.get("/historyChances/:gameName", async (req, res) => {
  const { gameName } = req.params;
  const games = {
    coin: 0,
    dice: 1,
    "two-dice": 2,
    etheroll: 3
  };
  let allResults = await contract.getPastEvents("Bet", {
    filter: { game: games[gameName] + "" },
    fromBlock: (await web3.eth.getBlockNumber()) - 6000,
    toBlock: "latest"
  });
  allResults = allResults
    .map(result => ({ ...result.returnValues }))
    .sort((a, b) => (+a.timestamp < +b.timestamp ? 1 : -1));
  let valuesLength;
  switch (gameName) {
    case "coin":
      valuesLength = 2;
      break;
    case "two-dice":
      valuesLength = 11;
      break;
    case "dice":
      valuesLength = 6;
      break;
    case "etheroll":
      break;
    default:
      res.send(400);
      return;
  }
  if (gameName === "etheroll") {
    const response = {};
    [5, 10, 25, 50, 100].forEach(count => {
      const results = allResults.filter((result, index) => index < count);
      const values = [[0, 24], [25, 49], [50, 74], [74, 96]];
      const resValues = [];
      values.forEach(([a, b]) => {
        const value = {};
        let maxBet = 0;
        let maxLength = 0;
        let tempMaxLength = 0;
        let winningChance =
          results.filter(
            result =>
              +result.winResult[0] >= a &&
              +result.winResult[0] <= b &&
              result.prize !== "0"
          ).length /
            results.filter(
              result => +result.winResult[0] >= a && +result.winResult[0] <= b
            ).length || 0;
        for (let i = 0; i < Math.min(allResults.length, count); i++) {
          if (+results[i].winResult[0] >= a && +results[i].winResult[0] <= b)
            maxBet = Math.max(maxBet, results[i].amount / 1000000000000000000);
        }
        for (let i = 0; i < Math.min(allResults.length, count); i++) {
          if (!(+results[i].result >= a && +results[i].result <= b)) {
            maxLength = Math.max(maxLength, tempMaxLength);
            tempMaxLength = 0;
          } else {
            tempMaxLength++;
          }
        }
        maxLength = Math.max(maxLength, tempMaxLength);
        value.result = results.filter(
          result => +result.winResult[0] >= a && +result.winResult[0] <= b
        ).length;
        value.maxSequence = maxLength;
        value.maxBet = maxBet;
        value.winningChance = (winningChance * 100).toFixed(0);
        resValues.push(value);
      });
      response[count] = resValues;
    });
    res.json({ response });
    return;
  }
  const response = {};
  [5, 10, 25, 50, 100].forEach(count => {
    const results = allResults.filter((result, index) => index < count);
    const values = [];
    for (let index = 0; index < valuesLength; index++) {
      const value = {};
      let maxBet = 0;
      let maxLength = 0;
      let tempMaxLength = 0;
      let winningChance =
        results.filter(
          result =>
            result.winResult.includes(index + "") && result.prize !== "0"
        ).length /
          results.filter(result => result.winResult.includes(index + ""))
            .length || 0;

      for (let i = 0; i < Math.min(allResults.length, count); i++) {
        if (results[i].winResult.includes(index + ""))
          maxBet = Math.max(maxBet, results[i].amount / 1000000000000000000);
      }
      for (let i = 0; i < Math.min(allResults.length, count); i++) {
        if (results[i].result !== index + "") {
          maxLength = Math.max(maxLength, tempMaxLength);
          tempMaxLength = 0;
        } else {
          tempMaxLength++;
        }
      }
      maxLength = Math.max(maxLength, tempMaxLength);
      value.result = results.filter(
        result => result.result === index + ""
      ).length;
      value.maxBet = maxBet;
      value.maxSequence = maxLength;
      value.winningChance = (winningChance * 100).toFixed(0);
      values.push(value);
    }
    response[count] = values;
  });
  res.json({ response });
});

app.get("/somePath", async (req, res) => {
  const results = contract.getPastEvents(
    {
      fromBlock: 4936770,
      toBlock: "latest"
    },
    (err, results) => {
      console.log(err, results);
      res.json({
        results: results.length
      });
    }
  );
});

app.get("/betHistory/:gameName", async (req, res) => {
  const gameName = req.params.gameName;
  const games = {
    coin: 0,
    dice: 1,
    "two-dice": 2,
    etheroll: 3
  };
  const { account } = req.query;
  let results;
  if (account)
    results = await contract.getPastEvents("Bet", {
      filter: { game: games[gameName] + "", gamer: account + "" },
      fromBlock: 0,
      toBlock: "latest"
    });
  else {
    let fromBlock = (await web3.eth.getBlockNumber()) - 6000;
    results = await contract.getPastEvents("Bet", {
      filter: { game: games[gameName] + "" },
      fromBlock: fromBlock,
      toBlock: "latest"
    });
  }
  console.log(results.length);
  if (!results.length) {
    if (account)
      results = await contract.getPastEvents("Bet", {
        filter: { game: games[gameName] + "", gamer: account + "" },
        fromBlock: 0,
        toBlock: "latest"
      });
    else {
      let fromBlock = (await web3.eth.getBlockNumber()) - 6000;
      results = await contract.getPastEvents("Bet", {
        filter: { game: games[gameName] + "" },
        fromBlock: fromBlock,
        toBlock: "latest"
      });
    }
  }
  if (!results.length) {
    if (account)
      results = await contract.getPastEvents("Bet", {
        filter: { game: games[gameName] + "", gamer: account + "" },
        fromBlock: 0,
        toBlock: "latest"
      });
    else {
      let fromBlock = (await web3.eth.getBlockNumber()) - 6000;
      results = await contract.getPastEvents("Bet", {
        filter: { game: games[gameName] + "" },
        fromBlock: fromBlock,
        toBlock: "latest"
      });
    }
  }
  res.send(parseResults(gameName, results));
});

app.get("/balanceOf", async (req, res) => {
  const { userAddress } = req.query;
  if (userAddress && web3.utils.isAddress(userAddress)) {
    res.json({
      balance: +parseInt(
        (await getContract.methods.balanceOf(userAddress).call()) /
          1000000000000000000
      )
      // Math.floor(
      //   (await contract.methods.betsBalances(userAddress).call()) /
      //     1000000000000000000
      // ) * 100
    });
  }
});

app.get("/dollarCourse", (req, res) => {
  res.json({
    course: currency
  });
});

app.get("/", (req, res) => {
  // contract.getPastEvents(
  //   'WinLottery',
  //   {fromBlock: 0, toBlock: 'latest'},
  //   (err, events) => {
  //     res.json({
  //       err,
  //       events
  //     });
  //   }
  // );

  contract.getPastEvents(
    "WinLottery",
    { fromBlock: 0, toBlock: "latest" },
    (err, events) => {
      res.json({
        err,
        events
      });
    }
  );
});

app.post("/addUserToWhiteList", async (req, res) => {
  const { email, tel, agree } = req.body;
  try {
    const user = new User({
      email,
      tel,
      agree,
      time: dateFormat(new Date(), "dd-mm-yyyy HH:mm:ss")
    });
    const savedUser = await user.save();
    res.send({ ...savedUser._doc });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// app.get('/balance', (req, res) => {
// 	const {address} = req.params;

//});

const port = process.env.PORT || 8082;

sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, () => {
  mongoose
    .connect("mongodb://admin:getethpassword321@ds253284.mlab.com:53284/geteth")
    .then(() => {
      app.post("/sendEmail", (req, res) => {
        const { email, lang } = req.body;
        sendpulse.addEmails(
          () => {
            res.json({ status: "success" });
          },
          lang === "rus" ? 2273912 : 2273914,
          [email]
        );
      });
      app.listen(port, () => {
        console.log("server is working on port: " + port);
      });
    })
    .catch(err => {
      throw err;
    });
});
// app.listen(port, () => console.log('working on ' + port));
