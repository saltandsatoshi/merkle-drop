// import Coingecko from "../../assets/logos/coingecko.webp";
import Etherscan from "../../assets/logos/etherscan.webp";

require("dotenv").config();

export const medias = [
  [ Etherscan, "Etherscan", `https://etherscan.io/token/${process.env.SALTY_ADDRESS}`]
  // [ Coingecko, "coingecko", "https://www.coingecko.com/en/coins/TODO" ],
];
