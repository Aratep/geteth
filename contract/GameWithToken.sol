pragma solidity ^0.4.24;

import './SafeMath.sol';
import 'https://github.com/oraclize/ethereum-api/oraclizeAPI_0.4.25.sol';
import './Ownable.sol';
import {BonusToken} from './BonusToken.sol';
import {InvestToken} from './InvestToken.sol';

contract Game is usingOraclize, Ownable {
    using SafeMath for uint;

    uint private constant GAME_COIN_FlIP = 0;
    uint private constant GAME_DICE = 1;
    uint private constant GAME_TWO_DICE = 2;
    uint private constant GAME_ETHEROLL = 3;
    uint private constant LOTTERY_FEE = 0.002 ether;
    uint private constant BENEFICIAR_FEE_PERCENT = 5;
    uint private constant TOKEN_HOLDERS_FEE_PERCENT = 45;
    uint private constant MIN_ETH_BET = 0.01 ether;
    uint private constant MIN_TOKENS_BET = 0.01 ether;

    struct Query {
        uint amount;
        address gamer;
        uint[] values;
        uint prize;
        uint range;
        uint game;
        bool tokens;
        uint time;
        bool ended;
    }
    mapping(bytes32 => Query) public queries;
    mapping(address => uint) public waitingEthPrizes;
    mapping(address => uint) public waitingTokensPrizes;
    mapping(address => bool) public isBet;
    mapping(address => uint) public betsBalances;
    mapping(address => uint) public minEthRanges;
    mapping(address => uint) public maxEthRanges;
    mapping(address => uint) public minTokensRanges;
    mapping(address => uint) public maxTokensRanges;
    address[] public holdersInEthLottery;
    address[] public holdersInTokensLottery;
    address[] public players;
    bytes32 public ethLotteryQueryId;
    uint public ethLotterySize;
    uint public ethLotteryStage;
    uint public ethLotteryRound;
    uint public lastEthLotteryTime;
    bytes32 public tokensLotteryQueryId;
    uint public tokensLotterySize;
    uint public tokensLotteryStage;
    uint public tokensLotteryRound;
    uint public lastTokensLotteryTime;
    uint public lastSendBonusTokensTime;
    uint public callbackGas; // Gas for user __callback function by Oraclize
    uint public beneficiarFund;
    address public beneficiar;
    BonusToken public bonusToken;
    InvestToken public investToken;

    uint private playersIndex;

    event PlaceBet(address indexed gamer, bytes32 queryId, bool tokens);
    event Bet(address indexed gamer, uint indexed game, bool tokens, uint amount, uint result, uint[] winResult, uint prize, uint timestamp);
    event WinLottery(address indexed gamer, uint prize, uint ticketsAmount, uint indexed round, bool tokens);

    modifier valideAddress(address addr) {
        require(addr != address(0));
        _;
    }

    constructor(address startBeneficiarAddress) public valideAddress(startBeneficiarAddress) {
        oraclize_setCustomGasPrice(5000000000); // 5 gwei
        callbackGas = 300000;
        beneficiar = startBeneficiarAddress;
    }

    /*
    * @param game Game mode (0, 1, 2, 3), watch constants
    * @param values User selected numbers, length = 1 for coin flip game
    * @param referrer Referrer address (default is 0x0)
    *
    * NOTE: ALL USER NUMBERS START WITH 0
    * NOTE: ALL USER NUMBERS MUST GO ASCENDING
    *
    * call this function for place bet to coin flip game with number 0 (eagle)
    * placeBet(0, [0]);
    *
    * call this function for place bet to dice game with numbers 1, 2, 3, 4
    * placeBet(1, [0, 1, 2, 3]);
    *
    * call this function for place bet to two dice game with numbers 2, 3, 4, 7, 8, 11, 12
    * placeBet(2, [0, 1, 2, 5, 6, 9, 10]);
    *
    * call this function for place bet to etheroll game with numbers 1-38
    * placeBet(3, [37]);
    */
    function placeBet(uint game, uint[] values, uint tokensAmount, uint index) payable external {
        uint payAmount;
        if (tokensAmount == 0) {
            require(msg.value >= MIN_ETH_BET);
            payAmount = fee(msg.value, false);
        } else {
            require(tokensAmount >= MIN_TOKENS_BET);
            investToken.sendToGame(msg.sender, tokensAmount, index);
            payAmount = fee(tokensAmount, true);
        }
        require(game == GAME_COIN_FlIP || game == GAME_DICE || game == GAME_TWO_DICE || game == GAME_ETHEROLL);
        require(valideBet(game, values));
        uint range;
        uint winChance;
        if (game == GAME_COIN_FlIP) {
            require(values.length == 1);
            range = 2;
            winChance = 5000;
        } else if (game == GAME_DICE) {
            require(values.length <= 5);
            range = 6;
            winChance = 1667;
            winChance = winChance.mul(values.length);
        } else if (game == GAME_TWO_DICE) {
            require(values.length <= 10);
            range = 11;
            for (uint i = 0; i < values.length; i++) {
                if (values[i] == 0 || values[i] == 10) winChance = winChance.add(278);
                else if (values[i] == 1 || values[i] == 9) winChance = winChance.add(556);
                else if (values[i] == 2 || values[i] == 8) winChance = winChance.add(833);
                else if (values[i] == 3 || values[i] == 7) winChance = winChance.add(1111);
                else if (values[i] == 4 || values[i] == 6) winChance = winChance.add(1389);
                else if (values[i] == 5) winChance = winChance.add(1667);
            }
        } else if (game == GAME_ETHEROLL) {
            require(values.length <= 1);
            range = 100;
            winChance = uint(100).mul(values[0] + 1);
        }
        address sender = msg.sender;
        if (!isBet[sender]) {
            players.push(sender);
            isBet[sender] = true;
        }
        bytes32 queryId = random();
        uint prize = payAmount.mul(10000).div(winChance);
        if (tokensAmount == 0) {
            betsBalances[sender] = betsBalances[sender].add(payAmount);
            newQuery(queryId, msg.value, sender, values, prize, range);
            queries[queryId].tokens = false;
        } else {
            newQuery(queryId, tokensAmount, sender, values, prize, range);
            queries[queryId].tokens = true;
        }
        queries[queryId].game = game; // stack
        emit PlaceBet(sender, queryId, queries[queryId].tokens);
    }

    function ethLottery() external onlyOwner {
        require(now - lastEthLotteryTime >= 1 weeks);
        require(bonusToken.ethLotteryBank() > 0);
        require(ethLotterySize > 0);
        if (!bonusToken.isEthLottery()) {
            address[] memory lotteryParticipants = bonusToken.ethLotteryParticipants();
            for (uint i = 0; i < lotteryParticipants.length; i++) {
                address participant = lotteryParticipants[i];
                uint participantBalance = bonusToken.ethLotteryBalances(participant);
                if (participantBalance > 0) {
                    holdersInEthLottery.push(participant);
                }
            }
            updateEthLotteryRanges();
            ethLotteryRound++;
        }
        bonusToken.startEthLottery();
        ethLotteryQueryId = random();
    }

    function tokensLottery() external onlyOwner {
        require(now - lastTokensLotteryTime >= 1 weeks);
        require(bonusToken.tokensLotteryBank() > 0);
        require(tokensLotterySize > 0);
        if (!bonusToken.isEthLottery()) {
            address[] memory lotteryParticipants = bonusToken.tokensLotteryParticipants();
            for (uint i = 0; i < lotteryParticipants.length; i++) {
                address participant = lotteryParticipants[i];
                uint participantBalance = bonusToken.tokensLotteryBalances(participant);
                if (participantBalance > 0) {
                    holdersInTokensLottery.push(participant);
                }
            }
            updateTokensLotteryRanges();
            tokensLotteryRound++;
        }
        bonusToken.startTokensLottery();
        tokensLotteryQueryId = random();
    }

    function sendBonusTokens(uint playersIterations) external onlyOwner {
        require(now - lastSendBonusTokensTime >= 24 hours);
        uint playersIterationsNumber;
        if (players.length.sub(playersIndex) < playersIterations) {
            playersIterationsNumber = players.length.sub(playersIndex);
        } else {
            playersIterationsNumber = playersIterations;
        }
        uint tokensAmount;
        uint betsBalance;
        for (uint i; i < playersIterationsNumber; i++) {
            address player = players[playersIndex];
            tokensAmount = 0;
            betsBalance = betsBalances[player];
            if (betsBalance >= 1 ether) {
                tokensAmount = betsBalance.div(1 ether).mul(100);
                betsBalance = betsBalance.sub(betsBalance.div(1 ether).mul(1 ether));
                if (tokensAmount > 0) {
                    betsBalances[player] = betsBalance;
                    bonusToken.buyTokens(player, tokensAmount);
                }
            }
            playersIndex++;
        }
        if (playersIndex == players.length) {
            playersIndex = 0;
            lastSendBonusTokensTime = now;
        }
    }

    function refundEthPrize() external {
        require(waitingEthPrizes[msg.sender] > 0);
        require(address(this).balance >= waitingEthPrizes[msg.sender]);
        uint weiAmountToSend = waitingEthPrizes[msg.sender];
        waitingEthPrizes[msg.sender] = 0;
        msg.sender.transfer(weiAmountToSend);
    }

    function refundTokensPrize() external {
        require(waitingTokensPrizes[msg.sender] > 0);
        require(investToken.balanceOf(address(this)) >= waitingTokensPrizes[msg.sender]);
        uint tokensAmountToSend = waitingTokensPrizes[msg.sender];
        waitingTokensPrizes[msg.sender] = 0;
        investToken.transfer(msg.sender, tokensAmountToSend);
    }

    function setOraclizeGasPrice(uint gasPrice) external onlyOwner {
        oraclize_setCustomGasPrice(gasPrice);
    }

    function setOraclizeGasLimit(uint gasLimit) external onlyOwner {
        callbackGas = gasLimit;
    }

    function setBeneficiar(address newBeneficiar) external onlyOwner valideAddress(newBeneficiar) {
        beneficiar = newBeneficiar;
    }

    function setInvestToken(address investTokenAddress) external onlyOwner valideAddress(investTokenAddress) {
        investToken = InvestToken(investTokenAddress);
    }

    function setBonusToken(address bonusTokenAddress) external onlyOwner valideAddress(bonusTokenAddress) {
        bonusToken = BonusToken(bonusTokenAddress);
    }

    function getFund(uint weiAmount) external onlyOwner {
        msg.sender.transfer(weiAmount);
    }

    function getBeneficiarFund() external {
        require(msg.sender == beneficiar);
        uint weiAmountToSend = beneficiarFund;
        beneficiarFund = 0;
        msg.sender.transfer(weiAmountToSend);
    }

    function __callback(bytes32 myId, string result, bytes proof) public {
        require((msg.sender == oraclize_cbAddress()));
        Query storage query = queries[myId];
        require(!query.ended);
        uint randomNumber;
        uint i;
        uint prize;
        address tokensHolder;
        if (query.gamer != address(0)) {
            if (oraclize_randomDS_proofVerify__returnCode(myId, result, proof) != 0) {
                if (!query.tokens) {
                    sendEthWin(query.gamer, query.amount);
                } else {
                    sendTokensWin(query.gamer, query.amount);
                }
            } else {
                randomNumber = uint(keccak256(result)) % query.range;
                bool isWin;
                if (query.game == GAME_ETHEROLL) {
                    if (randomNumber <= query.values[0]) {
                        if (query.tokens) {
                            sendTokensWin(query.gamer, query.prize);
                        } else {
                            sendEthWin(query.gamer, query.prize);
                        }
                        isWin = true;
                    }
                } else {
                    for (i = 0; i < query.values.length; i++) {
                        if (randomNumber == query.values[i]) {
                            if (query.tokens) {
                                sendTokensWin(query.gamer, query.prize);
                            } else {
                                sendEthWin(query.gamer, query.prize);
                            }
                            isWin = true;
                            break;
                        }
                    }
                }
                uint prizeAmount = 0;
                if (isWin) {
                    prizeAmount = query.prize;
                }
                emit Bet(query.gamer, query.game, query.tokens, query.amount, randomNumber, query.values, prizeAmount, now);
            }
            query.ended = true;
        } else if (myId == ethLotteryQueryId) {
            require(oraclize_randomDS_proofVerify__returnCode(myId, result, proof) == 0);
            randomNumber = uint(keccak256(result)) % bonusToken.ethLotteryBank();
            if (ethLotteryStage == 0) {
                prize = ethLotterySize.div(2);
            } else if (ethLotteryStage == 1) {
                prize = ethLotterySize.div(4);
            } else if (ethLotteryStage == 2) {
                prize = ethLotterySize.mul(12).div(100);
            } else if (ethLotteryStage == 3) {
                prize = ethLotterySize.mul(8).div(100);
            } else {
                prize = ethLotterySize.div(20);
            }
            for (i = 0; i < holdersInEthLottery.length; i++) {
                tokensHolder = holdersInEthLottery[i];
                if (randomNumber >= minEthRanges[tokensHolder] && randomNumber < maxEthRanges[tokensHolder]) {
                    deleteEthLotteryParticipant(i);
                    sendEthWin(tokensHolder, prize);
                    emit WinLottery(tokensHolder, prize, bonusToken.ethLotteryBalances(tokensHolder), ethLotteryRound, false);
                    ethLotteryStage++;
                    updateEthLotteryRanges();
                    bonusToken.updateEthLotteryBank(bonusToken.ethLotteryBalances(tokensHolder));
                    break;
                }
            }
            if (ethLotteryStage == 5 || holdersInEthLottery.length == 0) {
                holdersInEthLottery = new address[](0);
                ethLotterySize = 0;
                ethLotteryStage = 0;
                lastEthLotteryTime = now;
                bonusToken.restartEthLottery();
            } else {
                ethLotteryQueryId = random();
            }
        } else if (myId == tokensLotteryQueryId) {
            require(oraclize_randomDS_proofVerify__returnCode(myId, result, proof) == 0);
            randomNumber = uint(keccak256(result)) % bonusToken.tokensLotteryBank();
            if (tokensLotteryStage == 0) {
                prize = tokensLotterySize.div(2);
            } else if (tokensLotteryStage == 1) {
                prize = tokensLotterySize.div(4);
            } else if (tokensLotteryStage == 2) {
                prize = tokensLotterySize.mul(12).div(100);
            } else if (tokensLotteryStage == 3) {
                prize = tokensLotterySize.mul(8).div(100);
            } else {
                prize = tokensLotterySize.div(20);
            }
            for (i = 0; i < holdersInTokensLottery.length; i++) {
                tokensHolder = holdersInTokensLottery[i];
                if (randomNumber >= minTokensRanges[tokensHolder] && randomNumber < maxTokensRanges[tokensHolder]) {
                    deleteTokensLotteryParticipant(i);
                    sendTokensWin(tokensHolder, prize);
                    emit WinLottery(tokensHolder, prize, bonusToken.tokensLotteryBalances(tokensHolder), tokensLotteryRound, true);
                    tokensLotteryStage++;
                    updateTokensLotteryRanges();
                    bonusToken.updateTokensLotteryBank(bonusToken.tokensLotteryBalances(tokensHolder));
                    break;
                }
            }
            if (tokensLotteryStage == 5 || holdersInTokensLottery.length == 0) {
                holdersInTokensLottery = new address[](0);
                tokensLotterySize = 0;
                tokensLotteryStage = 0;
                lastTokensLotteryTime = now;
                bonusToken.restartTokensLottery();
            } else {
                tokensLotteryQueryId = random();
            }
        }
    }

    function updateEthLotteryRanges() private {
        uint range = 0;
        for (uint i = 0; i < holdersInEthLottery.length; i++) {
            address participant = holdersInEthLottery[i];
            uint participantBalance = bonusToken.ethLotteryBalances(participant);
            minEthRanges[participant] = range;
            range = range.add(participantBalance);
            maxEthRanges[participant] = range;
        }
    }

    function updateTokensLotteryRanges() private {
        uint range = 0;
        for (uint i = 0; i < holdersInTokensLottery.length; i++) {
            address participant = holdersInTokensLottery[i];
            uint participantBalance = bonusToken.tokensLotteryBalances(participant);
            minTokensRanges[participant] = range;
            range = range.add(participantBalance);
            maxTokensRanges[participant] = range;
        }
    }

    function valideBet(uint game, uint[] values) private pure returns(bool) {
        require(values.length > 0);
        for (uint i = 0; i < values.length; i++) {
            if (i == 0) {
                if (game == GAME_ETHEROLL && values[i] > 96) {
                    return false;
                }
            }
            if (i != values.length - 1) {
                if (values[i + 1] <= values[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    function fee(uint amount, bool tokens) private returns(uint) {
        uint beneficiarFee = amount.mul(BENEFICIAR_FEE_PERCENT).div(1000);
        uint tokenHoldersFee = amount.mul(TOKEN_HOLDERS_FEE_PERCENT).div(1000);
        if (tokens) {
            tokensLotterySize = tokensLotterySize.add(LOTTERY_FEE);
            investToken.transfer(beneficiar, beneficiarFee);
        } else {
            ethLotterySize = ethLotterySize.add(LOTTERY_FEE);
            beneficiarFund = beneficiarFund.add(beneficiarFee);
            address(investToken).transfer(tokenHoldersFee);
            investToken.gameDividends(tokenHoldersFee);
            amount = amount.sub(tokenHoldersFee);
        }
        amount = amount.sub(beneficiarFee).sub(LOTTERY_FEE);
        return amount;
    }

    function newQuery(bytes32 queryId, uint amount, address gamer, uint[] values, uint prize, uint range) private {
        queries[queryId].gamer = gamer;
        queries[queryId].amount = amount;
        queries[queryId].values = values;
        queries[queryId].prize = prize;
        queries[queryId].range = range;
        queries[queryId].time = now;
    }

    function random() private returns(bytes32 queryId) {
        require(address(this).balance >= oraclize_getPrice('random', callbackGas));
        queryId = oraclize_newRandomDSQuery(0, 4, callbackGas);
        require(queryId != 0, 'Oraclize error');
    }

    function sendEthWin(address winner, uint weiAmount) private {
        if (address(this).balance >= weiAmount) {
            winner.transfer(weiAmount);
        } else {
            waitingEthPrizes[winner] = waitingEthPrizes[winner].add(weiAmount);
        }
    }

    function sendTokensWin(address winner, uint tokensAmount) private {
        if (investToken.balanceOf(address(this)) >= tokensAmount) {
            investToken.transfer(winner, tokensAmount);
        } else {
            waitingTokensPrizes[winner] = waitingTokensPrizes[winner].add(tokensAmount);
        }
    }

    function deleteEthLotteryParticipant(uint index) private {
        holdersInEthLottery[index] = holdersInEthLottery[holdersInEthLottery.length - 1];
        delete holdersInEthLottery[holdersInEthLottery.length - 1];
        holdersInEthLottery.length--;
    }

    function deleteTokensLotteryParticipant(uint index) private {
        holdersInTokensLottery[index] = holdersInTokensLottery[holdersInTokensLottery.length - 1];
        delete holdersInTokensLottery[holdersInTokensLottery.length - 1];
        holdersInTokensLottery.length--;
    }
}
