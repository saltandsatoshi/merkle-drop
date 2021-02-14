import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-web3";

require("dotenv").config();

module.exports = {
    solidity: {
        compilers: [
            {version: "0.6.2"}
        ]
    },
    networks: {
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
            accounts: [`${process.env.PRIVATE_KEY}`,]
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
            accounts: [`${process.env.PRIVATE_KEY}`,]
        }
    }
}