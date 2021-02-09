import React, { Component } from "react";
import Web3 from "web3";
import { toast } from "react-toastify";
import { ConnectButton } from "./elements";

import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import * as WEB3HOOKS from '../../services/web3_hooks'
import Connect from '../connect'
import { INFURA_JSON_RPC_API } from '../../connectors'
import ETHEREUM from '../../services/ethereum'

// * ABI
import { SALTYABI } from "../../data/abi/SALTYABI";

// * CONSTANTS
import { SALTYAddress } from "../../data/constants/constants"
import { merkle } from "../../data/constants/merkle"
import SALTY_CONTRACT from '../../services/salty_contract'
import AIRDROP_CONTRACT from '../../services/airdrop_contract'

import "./style.scss";

function AirdropWeb3HooksWrapper() {
  const context = useWeb3React()
  const { connector, chainId, account, library, deactivate, active, error } = context

  return <Airdrop chainId={chainId} account={account} library={library} connector={connector}/>
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
      isAirdropLive: false,
      countdownString: "0:0:0",
    };
    this.SALTYABI = SALTYABI;
    this.merkle = merkle;
    this.SALTYAddress = SALTYAddress;
    this.SALTYContract = null;
    this.airdropContract = null;
  }

  componentDidMount() {
    this.START();

    this.onAccountChange();
    this.onNetworkChange();
    this.setConnection();

    // let now = new Date().getTime();
    // let startCountdown = this.merkle.startTimestamp * 1000;
    // let self = this;
    // if (startCountdown > now) {
    //   let countdownInterval = setInterval(function () {
    //     let now = new Date().getTime();
    //     let distance = startCountdown - now;

    //     let hours = Math.floor(
    //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //     );
    //     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //     hours = hours < 10 ? "0" + hours : hours;
    //     minutes = minutes < 10 ? "0" + minutes : minutes;
    //     seconds = seconds < 10 ? "0" + seconds : seconds;

    //     let calculatedCountdownString = hours + ":" + minutes + ":" + seconds;
    //     self.setState({ countdownString: calculatedCountdownString });

    //     if (distance < 0) {
    //       self.setState({ isAirdropLive: true });
    //       clearInterval(countdownInterval);
    //     }
    //   }, 1000);
    // } else {
    this.setState({ isAirdropLive: true });
    // }
  }

  START() {
    const { account, chainId, library } = this.props

    if (!account) { return }

    this.setState({ 
      account,
      isConnected: !!account
    });

    const provider = ETHEREUM.getJsonRpcProvider(INFURA_JSON_RPC_API[chainId], chainId);
    this.SALTYContract = SALTY_CONTRACT.getContract(this.SALTYAddress, provider)

    const signer = library.getSigner(account)
    this.airdropContract = AIRDROP_CONTRACT.getContract(signer)

    this.getAirdropStats();
    // this.statsInterval = setInterval(() => {
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

  getWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable().then((accounts) => {
          this.connectMainnet(accounts);
        });
      } catch (err) {
        console.log(err);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      this.web3 = new Web3(Web3.currentProvider);
      try {
        await this.web3.eth.getAccounts().then((accounts) => {
          this.connectMainnet(accounts);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error(
        "Non-Ethereum browser detected. Consider using MetaMask"
      );
    }
  };

  connectMainnet = async (accounts) => {
    await this.web3?.eth?.getChainId().then((x) => {
      if (x === 1) {
        this.setState({ account: accounts[0].toString(), isConnected: true });

        this.SALTYContract = new this.web3.eth.Contract(this.SALTYABI, this.SALTYAddress);
        this.airdropContract = new this.web3.eth.Contract(this.merkle.contractABI, this.merkle.contractAddress);

        this.getAirdropStats();
        var self = this;
        this.statsInterval = setInterval(function () {
          self.getAirdropStats();
        }, 10000);
      } else if (x === 4) {
        this.setState({ account: accounts[0].toString(), isConnected: true });

        this.SALTYContract = new this.web3.eth.Contract(this.SALTYABI, this.SALTYAddress);
        this.airdropContract = new this.web3.eth.Contract(
          this.merkle.contractABI,
          this.merkle.contractAddress
        );

        this.getAirdropStats();
        var self = this;
        this.statsInterval = setInterval(function () {
          self.getAirdropStats();
        }, 10000);
      }
      else {
        this.setState({ account: null });
        toast.error("Connect to Rinkeby or Mainnet");
      }
    });
  };

  getAirdropStats = () => {
    debugger

    if (
      this.merkle.claims[
        this.web3.utils.toChecksumAddress(this.state.account)
      ] != null
    ) {
      this.setState({ isEligible: true });
    }

    if (this.airdropContract != null && this.SALTYContract != null) {
      this.SALTYContract.methods
        .balanceOf(this.merkle.contractAddress)
        .call()
        .then((result) => {
          this.setState({
            unclaimed: parseFloat(this.web3.utils.fromWei(result, "ether")),
          });
        });

      if (this.state.isEligible) {
        this.airdropContract.methods
          .isClaimed(
            this.merkle.claims[
              this.web3.utils.toChecksumAddress(this.state.account)
            ].index
          )
          .call()
          .then((isClaimed) => {
            this.setState({
              isAirdropClaimed: isClaimed,
              claimable: this.roundTo(
                this.web3.utils.fromWei(
                  this.merkle.claims[
                    this.web3.utils.toChecksumAddress(this.state.account)
                  ].amount,
                  "ether"
                ) * rewardMultiplier,
                2
              ),
            });
          });
       }
     }
  };

  // unclaimedAirdrops = () => {
  //   if (this.web3 != null && this.airdropContract != null) {
  //     this.airdropContract.methods
  //       .isClaimed(
  //         this.merkle.claims[1]
  //         )
  //       .call()
  //       .then((isClaimed) => {
  //         this.setState({
  //           unclaimedAirdrops: isClaimed,
  //         });
  //       });
  //   }
  // };

  claimAirdrop = () => {
    if (this.web3 != null && this.airdropContract != null) {
      this.airdropContract.methods
        .claim(
          this.merkle.claims[
            this.web3.utils.toChecksumAddress(this.state.account)
          ].index,
          this.state.account,
          this.merkle.claims[
            this.web3.utils.toChecksumAddress(this.state.account)
          ].amount,
          this.merkle.claims[
            this.web3.utils.toChecksumAddress(this.state.account)
          ].proof
        )
        .send({
          from: this.state.account,
        })
        .on("error", function (error) {
          toast.error("Transaction Failed");
        })
        .on("transactionHash", function (transactionHash) {
          toast.info(
            "Click here to review your claim.",
            {
              onClick: function () {
                window.open(
                  "https://etherscan.io/tx/" + transactionHash,
                  "_blank"
                );
              },
            }
          );
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          toast.success("Airdrop Claim Successful");
        });
    }
  };

  onAccountChange() {
    window?.ethereum?.on("accountsChanged", (accounts) => {
      if (
        accounts.length > 0 &&
        this.state.account !== accounts[0].toString()
      ) {
        this.setState({ account: accounts[0].toString() });
      } else {
        this.setState({ account: null });
      }
    });
  }

  onNetworkChange() {
    window?.ethereum?.on("chainChanged", (chainId) => window.location.reload());
  }

  setConnection = () => {
    if (
      this.state.isConnected &&
      this.web3.utils.isAddress(this.state.account)
    ) {
      this.setState((prevState) => ({
        isDropdownOpen: !prevState.isDropdownOpen,
      }));
    } else {
      this.getWeb3();
    }
  };

  render() {
    return (
      <div className="max-width-container">
        <div className="airdrop-container">
          <div className="airdrop-title">
            <div className="title-text">
              <br/><br/><br/>
              <h1>$SALTY Airdrop</h1>
            </div>
            {/* <ConnectButton
              account={this.state.account}
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
              {this.state.isAirdropLive ? (
                this.state.isConnected ? (
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
                        <button
                          className="claim-btn"
                          onClick={this.claimAirdrop}
                        >
                          Claim Airdrop
                        </button>
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
              ) : (
                <>
                  <div className="claim-item">
                    <div className="title">The airdrop starts in</div>
                    <div className="title" id="countdownToStart">
                      {this.state.countdownString}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <div className="salty-texture-bg" />
        <div className="salty-logo-bg" /> */}
      </div>
    );
  }
}

export default Airdrop;
