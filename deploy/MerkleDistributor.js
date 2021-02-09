const MerkleDistributor = artifacts.require("MerkleDistributor");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config();

const main = async function () {
    
    m = await MerkleDistributor.new(
        config.SALTY_Address,          // address _token
        config.merkleRoot       // bytes32 merkleRoot
    );
    console.log(`MerkleDistributor address: ${m.address}`);
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });