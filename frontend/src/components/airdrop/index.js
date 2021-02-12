import React, { Component } from "react";
import Web3 from "web3";
import { toast } from "react-toastify";

import { useWeb3React } from '@web3-react/core'
import Connect from '../connect'
import { INFURA_JSON_RPC_API } from '../../connectors'
import ETHEREUM from '../../services/ethereum'

import { SALTY_ADDRESS, MERKLE_ADDRESS, SALTY_ABI, MERKLE_ABI } from "../../data/constants"

import SALTY_CONTRACT from '../../services/salty_contract'
import AIRDROP_CONTRACT from '../../services/airdrop_contract'
import * as WEB3HOOKS from '../../services/web3_hooks'

import "./style.scss";

import { merkle } from "../../data/merkle";
require('dotenv').config();

function AirdropWeb3HooksWrapper() {
  const context = useWeb3React()
  const { connector, chainId, account, library, deactivate, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = WEB3HOOKS.useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  WEB3HOOKS.useInactiveListener(!triedEager || !!activatingConnector)

  return <Airdrop key={`${account}_${chainId}`} chainId={chainId} account={account} library={library} connector={connector}/>
} 

class Airdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      isDropdownOpen: false,
      account: null,
      day: 0,
      unclaimed: 0,
      reward: 0,
      claimable: 0,
      isAirdropClaimed: false,
      //unclaimedAirdrops: false,
      isEligible: false,
      countdownString: "0:0:0",
    };
    this.claims = merkle.claims;
    this.SALTY_ABI = SALTY_ABI;
    this.MERKLE_ABI = MERKLE_ABI;
    this.SALTY_ADDRESS = SALTY_ADDRESS; // process.env.SALTY_ADDRESS;
    this.MERKLE_ADDRESS = MERKLE_ADDRESS; // process.env.MERKLE_ADDRESS
    this.SALTY_Contract = null;
    this.airdropContract = null;

    this.claimAirdrop = this.claimAirdrop.bind(this)
  }

  componentDidMount() {
    this.START();

    // this.onAccountChange();
    // this.onNetworkChange();
    // this.setConnection();

  }

  START() {
    console.log(">>> START")
    const { account, chainId, library } = this.props

    if (!account) { return }

    console.log(">>> START 2")
    this.setState({ 
      account,
      isConnected: !!account
    });

    const provider = ETHEREUM.getJsonRpcProvider(INFURA_JSON_RPC_API[chainId], chainId);
    this.SALTY_Contract = SALTY_CONTRACT.getContract(this.SALTY_ADDRESS, provider)

    const signer = library.getSigner(account)
    this.airdropContract = AIRDROP_CONTRACT.getContract(signer)

    this.getAirdropStats();
    // this. = setInterval(() => {
    //   this.getAirdropStats();
    // }, 10000);
  }

  roundTo = (n, digits) => {
    var negative = false;
    if (digits === undefined) {
      digits = 0;
    }
    if (n < 0) {
      negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
      n = (n * -1).toFixed(digits);
    }
    return n;
  };

  // getWeb3 = async () => {
  //   // Modern dapp browsers...
  //   if (window.ethereum) {
  //     this.web3 = new Web3(window.ethereum);
  //     try {
  //       await window.ethereum.enable().then((accounts) => {
  //         this.connectMainnet(accounts);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   // Legacy dapp browsers...
  //   else if (window.web3) {
  //     this.web3 = new Web3(Web3.currentProvider);
  //     try {
  //       await this.web3.eth.getAccounts().then((accounts) => {
  //         this.connectMainnet(accounts);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     toast.error(
  //       "Non-Ethereum browser detected. Consider using MetaMask"
  //     );
  //   }
  // };

  // connectMainnet = async (accounts) => {
  //   await this.web3.eth.getChainId().then((x) => {
  //     if (x === 1) {
  //       this.setState({ account: accounts[0].toString(), isConnected: true });

  //       this.SALTY_Contract = new this.web3.eth.Contract(this.SALTY_ABI, this.SALTY_ADDRESS);
  //       this.airdropContract = new this.web3.eth.Contract(this.MERKLE_ABI, this.MERKLE_ADDRESS);

  //       // this.getAirdropStats();
  //       // var self = this;
  //       // this.statsInterval = setInterval(function () {
  //       //   self.getAirdropStats();
  //       // }, 10000);
  //     } else if (x === 4) {
  //       this.setState({ account: accounts[0].toString(), isConnected: true });

  //       this.SALTY_Contract = new this.web3.eth.Contract(this.SALTY_ABI, this.SALTY_ADDRESS);
  //       this.airdropContract = new this.web3.eth.Contract(
  //         this.MERKLE_ABI,
  //         this.MERKLE_ADDRESS
  //       );

  //       // this.getAirdropStats();
  //       // var self = this;
  //       // this.statsInterval = setInterval(function () {
  //       //   self.getAirdropStats();
  //       // }, 10000);
  //     }
  //     else {
  //       this.setState({ account: null });
  //       toast.error("Connect to Rinkeby or Mainnet");
  //     }
  //   });
  // };

  async getAirdropStats() {
    if (
      this.claims[
        Web3.utils.toChecksumAddress(this.props.account)
      ] != null
    ) {
      this.setState({ isEligible: true });
    }

    if (this.airdropContract != null && this.SALTY_Contract != null) {
      const balance = await this.SALTY_Contract.balanceOf(this.SALTY_ADDRESS)
      this.setState({
        // TODO: check below
        unclaimed: parseFloat(Web3.utils.fromWei(balance.toHexString(), "ether")),
      });

      if (this.state.isEligible) {
        const isClaimed = await this.airdropContract.isClaimed(
          this.claims[
            Web3.utils.toChecksumAddress(this.props.account)
          ].index
        )
        this.setState({
          isAirdropClaimed: isClaimed,
          claimable: this.roundTo(
            Web3.utils.fromWei(
              this.claims[
                Web3.utils.toChecksumAddress(this.props.account)
              ].amount,
              "ether"
            ),
            2
          ),
        });
     }
  }
}

async claimAirdrop() {
  if (this.props.account != "" && this.airdropContract != null) {
    try {
      const transactionResponse = await this.airdropContract
        .claim(
          this.claims[
            Web3.utils.toChecksumAddress(this.props.account)
          ].index,
          this.props.account,
          this.claims[
            Web3.utils.toChecksumAddress(this.props.account)
          ].amount,
          this.claims[
            Web3.utils.toChecksumAddress(this.props.account)
          ].proof
        )

      toast.info(
        "Click here to review your claim.",
        {
          onClick: function () {
            window.open(
              "https://etherscan.io/tx/" + transactionResponse.hash,
              "_blank"
            );
          },
        }
      );

      const transactionReceipt = await transactionResponse.wait(1)
      if (transactionReceipt.status === 0) { 
        toast.error('Transaction was reverted')
        return
      }

      toast.success("Airdrop Claim Successful")
    } catch(err) {
      toast.error(`Transaction Failed: ${err.message}`)
    }

    // .on("confirmation", function (confirmationNumber, receipt) {
    //   toast.success("Airdrop Claim Successful");
    // });
  }
}

  // onAccountChange() {
  //   window?.ethereum?.on("accountsChanged", (accounts) => {
  //     if (
  //       accounts.length > 0 &&
  //       this.props.account !== accounts[0].toString()
  //     ) {
  //       this.setState({ account: accounts[0].toString() });
  //     } else {
  //       this.setState({ account: null });
  //     }
  //   });
  // }

  // onNetworkChange() {
  //   window?.ethereum?.on("chainChanged", (chainId) => window.location.reload());
  // }

  // setConnection = () => {
  //   if (
  //     this.state.isConnected &&
  //     Web3.utils.isAddress(this.props.account)
  //   ) {
  //     this.setState((prevState) => ({
  //       isDropdownOpen: !prevState.isDropdownOpen,
  //     }));
  //   } else {
  //     this.getWeb3();
  //   }
  // };

  render() {
    return (
      <div className="max-width-container">
        <div className="airdrop-container">
          <div className="airdrop-title">
            {/* <div className="title-text">
              <br/><br/><br/>
              <h1>$SALTY Airdrop</h1>
            </div> */}
            {/* <ConnectButton
              account={this.props.account}
              setConnection={this.setConnection}
            /> */}
            <Connect/>
          </div>
          {/* <div className="airdrop-subtitle">
            <span>Airdrop Day: </span>
            {this.state.day}
          </div>
          <div className="airdrop-subtitle">
            <span>Unclaimed $SALTY: </span>
            {this.state.unclaimed.toLocaleString()}
          </div>
          <div className="airdrop-subtitle">
            <span>Unclaimed Drops: </span>
            {this.state.unclaimedAirdrops}
          </div> 
          <div className="airdrop-subtitle">
            <a
              href="https://rinkeby.etherscan.io/address/0xd1666190bE4fC9842b12397047B9B8Ad3A5D48c4#code"
              rel="noreferrer"
              target="_blank"
              style={{
                fontSize: "0.8em",
                color: "#ffffff",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              Airdrop Contract
            </a>
          </div> */}

          <div className="airdrop-details">
            <div className="lower">
              { this.state.isConnected ? (
                this.state.isEligible ? (
                  this.state.isAirdropClaimed ? (
                    <>
                      <div className="claim-item">
                        <div className="title">
                          You have already claimed your airdrop
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="claim-item">
                        <div className="title">Claimable $SALTY</div>
                        <div className="value">
                          {this.state.claimable.toLocaleString()}
                        </div>
                      </div>
                      <ul id="buttons02" className="style1 buttons">
                        <li>
                          <a href="#" className="button n01" onClick={this.claimAirdrop}>
                            <span className="label">Claim Airdrop</span>
                          </a>
                        </li>
                      </ul>
                    </>
                  )
                ) : (
                  <>
                    <div className="claim-item">
                      <div className="title">
                        Address Ineligible.
                      </div>
                    </div>
                  </>
                )
              ) : (
                <div className="claim-disconnected">
                  <span>Wallet not connected</span>
                  <br />
                  Please, connect wallet to continue...
                </div>
              )
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AirdropWeb3HooksWrapper;
