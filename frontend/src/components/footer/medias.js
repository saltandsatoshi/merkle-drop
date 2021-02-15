// import Coingecko from "../../assets/logos/coingecko.webp";
import Etherscan from "../../assets/logos/etherscan.webp";
// TODO: create new image for airdrop
import Airdrop from "../../assets/logos/salty-bg.webp";

require("dotenv").config();

export const medias = [
  [ Etherscan, "$SALTY (Etherscan)", `https://etherscan.io/token/${process.env.SALTY_ADDRESS}`],
  [ Airdrop, "Community $SALTY Airdrop", "https://claim.saltandsatoshi.com"]
];
