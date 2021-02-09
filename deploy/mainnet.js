const MerkleDistributor = artifacts.require("MerkleDistributor");
// TODO: import ethers
const HDWalletProvider = require("@truffle/hdwallet-provider");
const BigNumber = require("bignumber.js");
import { ContractFactory } from 'ethers';

import { SALTY_ABI } from "../frontend/src/data/constants";
// TODO
// import { SALTY_Bytecode } 

const factory = new ContractFactory(SALTY_ABI, contractByteCode);

// If your contract requires constructor args, you can specify them here
const contract = await factory.deploy(deployArgs);

console.log(contract.address);
console.log(contract.deployTransaction);





require("dotenv").config();

const main = async function () {
    
    const config = require("../deploy-configs/v2/get-config");
    const provider = new HDWalletProvider(process.env.PRIVATE_KEY, `${config.http}/${process.env.HTTP_KEY}`);
    const w = new Web3(provider);
    const accounts = await w.eth.getAccounts();

    m = await MerkleDistributor.new(

    );
    console.log(`MerkleDistributor address: ${m.address}`);
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });