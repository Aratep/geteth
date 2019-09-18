function shortAddr(address, num) {
    if (address) {
        return `${address.substring(0, num)}...${address.substr(-num)}`;
    } else {
        return 0;
    }
}

const metamaskNetwork = '1';  // 4 - rinkeby; 1 - mainnet
const infuraEndpoint = 'https://mainnet.infura.io/v3/581ac5ee379c41e88b28e2cafe87421b';
const tokenContractAddress = '0x1b08e098c33e0b2f51997cf95a32bc52dd5059cc';
const gameContractAddress = '0x75eee2b5ffea02f1e14e6a1c40bd30ca94cff975';
const helperServer = 'https://helper.geteth.io';

const exchangeLightThemeRoutes = ['/', '/guarantees', '/risks'];


module.exports = {
    shortAddr,
    metamaskNetwork,
    infuraEndpoint,
    tokenContractAddress,
    gameContractAddress,
    helperServer,
    exchangeLightThemeRoutes,
};
