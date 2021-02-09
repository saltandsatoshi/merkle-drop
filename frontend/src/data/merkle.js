import { SALTY_Address, SALTY_ABI } from "./constants";
var json = require("./merkle.json");

export const merkle = {
  contractAddress: SALTY_Address,
  contractABI: SALTY_ABI,
  merkleRoot: json.merkleRoot,
  tokenTotal: json.tokenTotal,
  claims: json.claims
};
