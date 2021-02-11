import { MERKLE_ABI } from "./constants";
var json = require("./merkle.json");

require('dotenv').config();

export const merkle = {
  contractAddress: process.env.MERKLE_ADDRESS,
  contractABI: MERKLE_ABI,
  merkleRoot: process.env.MERKLE_ROOT,
  tokenTotal: json.tokenTotal,
  claims: json.claims
};
