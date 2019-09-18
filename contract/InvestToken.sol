pragma solidity ^0.4.24;

import './modIERC20.sol';
import './modERC20Detailed.sol';
import './SafeMath.sol';
import './Ownable.sol';
import {BonusToken} from './BonusToken.sol';

/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 * Originally based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 *
 * This implementation emits additional Approval events, allowing applications to reconstruct the allowance status for
 * all accounts just by listening to said events. Note that this isn't required by the specification, and other
 * compliant implementations may not do it.
 */
contract ERC20 is IERC20 {
    using SafeMath for uint256;

    uint256 constant public MIN_HOLDERS_BALANCE = 20 ether;

    address public gameAddress;

    mapping (address => uint256) private _balances;
    uint256 private _totalSupply;

    address[] internal holders;
    mapping(address => bool) internal isUser;

    function getHolders() public view returns (address[]) {
        return holders;
    }

    /**
    * @dev Total number of tokens in existence
    */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
    * @dev Gets the balance of the specified address.
    * @param owner The address to query the balance of.
    * @return An uint256 representing the amount owned by the passed address.
    */
    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    /**
    * @dev Transfer token for a specified addresses
    * @param from The address to transfer from.
    * @param to The address to transfer to.
    * @param value The amount to be transferred.
    */
    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0));

        if (to != gameAddress && from != gameAddress) {
            uint256 transferFee = value.div(100);
            _burn(from, transferFee);
            value = value.sub(transferFee);
        }
        _balances[from] = _balances[from].sub(value);
        if (to != gameAddress && _balances[to] < MIN_HOLDERS_BALANCE && _balances[to].add(value) >= MIN_HOLDERS_BALANCE) {
            holders.push(to);
        }
        _balances[to] = _balances[to].add(value);
        emit Transfer(from, to, value);
    }

    /**
     * @dev Internal function that mints an amount of the token and assigns it to
     * an account. This encapsulates the modification of balances such that the
     * proper events are emitted.
     * @param account The account that will receive the created tokens.
     * @param value The amount that will be created.
     */
    function _mint(address account, uint256 value) internal {
        require(account != address(0));

        _totalSupply = _totalSupply.add(value);
        _balances[account] = _balances[account].add(value);
        emit Transfer(address(0), account, value);
    }

    /**
     * @dev Internal function that burns an amount of the token of a given
     * account.
     * @param account The account whose tokens will be burnt.
     * @param value The amount that will be burnt.
     */
    function _burn(address account, uint256 value) internal {
        require(account != address(0));

        _totalSupply = _totalSupply.sub(value);
        _balances[account] = _balances[account].sub(value);
        emit Transfer(account, address(0), value);
    }
}

contract InvestToken is ERC20, ERC20Detailed, Ownable {

    uint8 constant public REFERRER_PERCENT = 3;
    uint8 constant public CASHBACK_PERCENT = 2;
    uint8 constant public HOLDERS_BUY_PERCENT_WITH_REFERRER = 7;
    uint8 constant public HOLDERS_BUY_PERCENT_WITH_REFERRER_AND_CASHBACK = 5;
    uint8 constant public HOLDERS_BUY_PERCENT = 10;
    uint8 constant public HOLDERS_SELL_PERCENT = 5;
    uint8 constant public TOKENS_DIVIDER = 10;
    uint256 constant public PRICE_INTERVAL = 10000000000;

    uint256 public swapTokensLimit;
    uint256 public investDividends;
    uint256 public casinoDividends;
    mapping(address => uint256) public ethStorage;
    mapping(address => address) public referrers;
    mapping(address => uint256) public investSize24h;
    mapping(address => uint256) public lastInvestTime;
    BonusToken public bonusToken;

    uint256 private holdersIndex;
    uint256 private totalInvestDividends;
    uint256 private totalCasinoDividends;
    uint256 private priceCoeff = 105e9;
    uint256 private constant a = 5e9;

    event Buy(address indexed buyer, uint256 weiAmount, uint256 tokensAmount, uint256 timestamp);
    event Sell(address indexed seller, uint256 weiAmount, uint256 tokensAmount, uint256 timestamp);
    event Reinvest(address indexed investor, uint256 weiAmount, uint256 tokensAmount, uint256 timestamp);
    event Withdraw(address indexed investor, uint256 weiAmount, uint256 timestamp);
    event ReferalsIncome(address indexed recipient, uint256 amount, uint256 timestamp);
    event InvestIncome(address indexed recipient, uint256 amount, uint256 timestamp);
    event CasinoIncome(address indexed recipient, uint256 amount, uint256 timestamp);

    constructor (address _bonusToken) public ERC20Detailed("Get Token", "GET", 18) {
        require(_bonusToken != address (0));
        bonusToken = BonusToken(_bonusToken);
        swapTokensLimit = 10000;
        swapTokensLimit = swapTokensLimit.mul(10 ** uint256(decimals()));
    }

    modifier onlyGame() {
        require(msg.sender == gameAddress, 'The sender must be a game contract.');
        _;
    }

    function () public payable {
        if (msg.sender != gameAddress) {
            address referrer;
            if (msg.data.length == 20) {
                referrer = bytesToAddress(bytes(msg.data));
            }
            buyTokens(referrer);
        }
    }

    function buyTokens(address referrer) public payable {
        uint256 weiAmount = msg.value;
        address buyer = msg.sender;
        uint256 tokensAmount;
        (weiAmount, tokensAmount) = mint(buyer, weiAmount);
        uint256 correctWeiAmount = msg.value.sub(weiAmount);
        checkInvestTimeAndSize(buyer, correctWeiAmount);
        if (!isUser[buyer]) {
            if (referrer != address(0) && referrer != buyer) {
                referrers[buyer] = referrer;
            }
            buyFee(buyer, correctWeiAmount, true);
            isUser[buyer] = true;
        } else {
            buyFee(buyer, correctWeiAmount, false);
        }
        if (weiAmount > 0) {
            buyer.transfer(weiAmount);
        }
        emit Buy(buyer, correctWeiAmount, tokensAmount, now);
    }

    function sellTokens(uint256 tokensAmount, uint index) public {
        address seller = msg.sender;
        tokensAmount = tokensAmount.div(1 ether);
        burn(seller, tokensAmount, index);
        uint256 weiAmount = tokensToEthereum(tokensAmount.div(uint256(10) ** decimals()));
        weiAmount = sellFee(weiAmount);
        seller.transfer(weiAmount);
        emit Sell(seller, weiAmount, tokensAmount, now);
    }

    function swapTokens(uint256 tokensAmountToBurn) public {
        uint256 tokensAmountToMint = tokensAmountToBurn.div(TOKENS_DIVIDER);
        require(tokensAmountToMint <= swapTokensLimit.sub(tokensAmountToMint));
        require(bonusToken.balanceOf(msg.sender) >= tokensAmountToBurn, 'Not enough bonus tokens.');
        bonusToken.swapTokens(msg.sender, tokensAmountToBurn);
        swapTokensLimit = swapTokensLimit.sub(tokensAmountToMint);
        priceCoeff = priceCoeff.add(tokensAmountToMint.mul(1e10));
        correctBalanceByMint(msg.sender, tokensAmountToMint);
        _mint(msg.sender, tokensAmountToMint);
    }

    function reinvest(uint256 weiAmount) public {
        ethStorage[msg.sender] = ethStorage[msg.sender].sub(weiAmount);
        uint256 tokensAmount;
        (weiAmount, tokensAmount) = mint(msg.sender, weiAmount);
        if (weiAmount > 0) {
            ethStorage[msg.sender] = ethStorage[msg.sender].add(weiAmount);
        }
        emit Reinvest(msg.sender, weiAmount, tokensAmount, now);
    }

    function withdraw(uint256 weiAmount) public {
        require(weiAmount > 0);
        ethStorage[msg.sender] = ethStorage[msg.sender].sub(weiAmount);
        msg.sender.transfer(weiAmount);
        emit Withdraw(msg.sender, weiAmount, now);
    }

    function transfer(address to, uint256 value, uint256 index) public returns (bool) {
        if (msg.sender != gameAddress) {
            correctBalanceByBurn(msg.sender, value, index);
        }
        _transfer(msg.sender, to, value);
        return true;
    }

    function sendDividendsToHolders(uint holdersIterations) public onlyOwner {
        if (holdersIndex == 0) {
            totalInvestDividends = investDividends;
            totalCasinoDividends = casinoDividends;
        }
        uint holdersIterationsNumber;
        if (holders.length.sub(holdersIndex) < holdersIterations) {
            holdersIterationsNumber = holders.length.sub(holdersIndex);
        } else {
            holdersIterationsNumber = holdersIterations;
        }
        uint256 holdersBalance = 0;
        uint256 weiAmount = 0;
        for (uint256 i = 0; i < holdersIterationsNumber; i++) {
            holdersBalance = balanceOf(holders[holdersIndex]);
            if (holdersBalance >= MIN_HOLDERS_BALANCE) {
                if (totalInvestDividends > 0) {
                    weiAmount = holdersBalance.mul(totalInvestDividends).div(totalSupply());
                    investDividends = investDividends.sub(weiAmount);
                    emit InvestIncome(holders[holdersIndex], weiAmount, now);
                    ethStorage[holders[holdersIndex]] = ethStorage[holders[holdersIndex]].add(weiAmount);
                }
                if (totalCasinoDividends > 0) {
                    weiAmount = holdersBalance.mul(totalCasinoDividends).div(totalSupply());
                    casinoDividends = casinoDividends.sub(weiAmount);
                    emit CasinoIncome(holders[holdersIndex], weiAmount, now);
                    ethStorage[holders[holdersIndex]] = ethStorage[holders[holdersIndex]].add(weiAmount);
                }
            }
            holdersIndex++;
        }
        if (holdersIndex == holders.length) {
            holdersIndex = 0;
        }
    }

    function setGameAddress(address newGameAddress) public onlyOwner {
        gameAddress = newGameAddress;
    }

    function sendToGame(address player, uint256 tokensAmount, uint256 index) public onlyGame returns(bool) {
        correctBalanceByBurn(player, tokensAmount, index);
        _transfer(player, gameAddress, tokensAmount);
        return true;
    }

    function gameDividends(uint256 weiAmount) public onlyGame {
        casinoDividends = casinoDividends.add(weiAmount);
    }

    function price() public view returns(uint256) {
        return priceCoeff.add(a);
    }

    function mint(address account, uint256 weiAmount) private returns(uint256, uint256) {
        (uint256 tokensToMint, uint256 backPayWeiAmount) = ethereumToTokens(weiAmount);
        correctBalanceByMint(account, tokensToMint);
        _mint(account, tokensToMint);
        return (backPayWeiAmount, tokensToMint);
    }

    function burn(address account, uint256 tokensAmount, uint256 index) private returns(uint256, uint256) {
        correctBalanceByBurn(account, tokensAmount, index);
        _burn(account, tokensAmount);
    }

    function checkInvestTimeAndSize(address account, uint256 weiAmount) private {
        if (now - lastInvestTime[account] > 24 hours) {
            investSize24h[account] = 0;
        }
        require(investSize24h[account].add(weiAmount) <= 5 ether, 'Investment limit exceeded for 24 hours.');
        investSize24h[account] = investSize24h[account].add(weiAmount);
        lastInvestTime[account] = now;
    }

    function buyFee(address sender, uint256 weiAmount, bool isFirstInvest) private {
        address referrer = referrers[sender];
        uint256 holdersWeiAmount;
        if (referrer != address(0)) {
            uint256 referrerWeiAmount = weiAmount.mul(REFERRER_PERCENT).div(100);
            emit ReferalsIncome(referrer, referrerWeiAmount, now);
            ethStorage[referrer] = ethStorage[referrer].add(referrerWeiAmount);
            if (isFirstInvest) {
                uint256 cashbackWeiAmount = weiAmount.mul(CASHBACK_PERCENT).div(100);
                emit ReferalsIncome(sender, cashbackWeiAmount, now);
                ethStorage[sender] = ethStorage[sender].add(cashbackWeiAmount);
                holdersWeiAmount = weiAmount.mul(HOLDERS_BUY_PERCENT_WITH_REFERRER_AND_CASHBACK).div(100);
            } else {
                holdersWeiAmount = weiAmount.mul(HOLDERS_BUY_PERCENT_WITH_REFERRER).div(100);
            }
        } else {
            holdersWeiAmount = weiAmount.mul(HOLDERS_BUY_PERCENT).div(100);
        }
        addDividends(holdersWeiAmount);
    }

    function sellFee(uint256 weiAmount) private returns(uint256) {
        uint256 holdersWeiAmount = weiAmount.mul(HOLDERS_SELL_PERCENT).div(100);
        addDividends(holdersWeiAmount);
        weiAmount = weiAmount.sub(holdersWeiAmount);
        return weiAmount;
    }

    function addDividends(uint256 weiAmount) private {
        investDividends = investDividends.add(weiAmount);
    }

    function correctBalanceByMint(address account, uint256 value) private {
        if (balanceOf(account) < MIN_HOLDERS_BALANCE && balanceOf(account).add(value) >= MIN_HOLDERS_BALANCE) {
            holders.push(msg.sender);
        }
    }

    function correctBalanceByBurn(address account, uint256 value, uint256 index) private {
        if (balanceOf(account) >= MIN_HOLDERS_BALANCE && balanceOf(account).sub(value) < MIN_HOLDERS_BALANCE) {
            require(holders[index] == account);
            deleteTokensHolder(index);
        }
    }

    function ethereumToTokens(uint256 weiAmount) private returns(uint256, uint256) {
        uint256 b = priceCoeff;
        uint256 c = weiAmount;
        uint256 D = (b ** 2).add(a.mul(4).mul(c));
        uint256 tokensAmount = (sqrt(D).sub(b)).div((a).mul(2));
        require(tokensAmount > 0);
        uint256 backPayWeiAmount = weiAmount.sub(a.mul(tokensAmount ** 2).add(priceCoeff.mul(tokensAmount)));
        priceCoeff = priceCoeff.add(tokensAmount.mul(1e10));
        tokensAmount = tokensAmount.mul(10 ** uint256(decimals()));
        return (tokensAmount, backPayWeiAmount);
    }

    function tokensToEthereum(uint256 tokensAmount) private returns(uint256) {
        require(tokensAmount > 0);
        uint256 weiAmount = priceCoeff.mul(tokensAmount).sub((tokensAmount ** 2).mul(5).mul(1e9));
        priceCoeff = priceCoeff.sub(tokensAmount.mul(1e10));
        return weiAmount;
    }

    function bytesToAddress(bytes source) private pure returns(address parsedAddress)
    {
        assembly {
            parsedAddress := mload(add(source,0x14))
        }
        return parsedAddress;
    }

    function sqrt(uint256 x) private pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function deleteTokensHolder(uint index) private {
        holders[index] = holders[holders.length - 1];
        delete holders[holders.length - 1];
        holders.length--;
    }
}
