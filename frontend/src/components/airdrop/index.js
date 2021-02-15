import React, { Component } from "react";
import Web3 from "web3";
import { toast } from "react-toastify";

import { useWeb3React } from '@web3-react/core'
import Connect from '../connect'
import { INFURA_JSON_RPC_API } from '../../connectors'
import ETHEREUM from '../../services/ethereum'

import { SALTY_ABI, MERKLE_ABI } from "../../data/constants"

import SALTY_CONTRACT from '../../services/salty_contract'
import AIRDROP_CONTRACT from '../../services/airdrop_contract'

import "./style.scss";

import { merkle } from "../../data/merkle";
require('dotenv').config();

function AirdropWeb3HooksWrapper() {
  const context = useWeb3React()
  const { connector, chainId, account, library } = context

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
      isEligible: false,
      countdownString: "0:0:0",
    };
    this.claims = merkle.claims;
    this.SALTY_ABI = SALTY_ABI;
    this.MERKLE_ABI = MERKLE_ABI;
    this.SALTY_ADDRESS = process.env.SALTY_ADDRESS;
    this.MERKLE_ADDRESS = process.env.MERKLE_ADDRESS
    this.SALTY_Contract = null;
    this.airdropContract = null;

  }

  componentDidMount() {
    this.START();

    this.onAccountChange();
    this.onNetworkChange();
    this.setConnection();

  }

  START() {
    const { account, chainId, library } = this.props

    if (!account) { return }

    this.setState({ 
      account,
      isConnected: !!account
    });

    const provider = ETHEREUM.getJsonRpcProvider(INFURA_JSON_RPC_API[chainId], chainId);
    this.SALTY_Contract = SALTY_CONTRACT.getContract(this.SALTY_ADDRESS, provider)

    const signer = library.getSigner(account)
    this.airdropContract = AIRDROP_CONTRACT.getContract(signer)

    this.getAirdropStats();
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
    await this.web3.eth.getChainId().then((x) => {

      if (x === 1) {
        this.setState({ account: accounts[0].toString(), isConnected: true });
      } else {
        this.setState({ account: null });
        toast.error("Connect to Mainnet, ya ape");
      }
      this.SALTY_Contract = new this.web3.eth.Contract(this.SALTY_ABI, this.SALTY_ADDRESS);
      this.airdropContract = new this.web3.eth.Contract(this.MERKLE_ABI, this.MERKLE_ADDRESS);
    });
  };

  getAirdropStats = () => {
    
    if (
      this.claims[
        this.web3.utils.toChecksumAddress(this.state.account)
      ] != null
    ) {
      this.setState({ isEligible: true });
    }

    if (this.airdropContract != null && this.SALTY_Contract != null) {
      this.SALTY_Contract.methods
        .balanceOf(this.SALTY_ADDRESS)
        .call()
        .then((result) => {
          this.setState({
            // TODO: check below
            unclaimed: parseFloat(this.web3.utils.fromWei(result, "ether")),
          });
        });

      if (this.state.isEligible) {
        this.airdropContract.methods
          .isClaimed(
            this.claims[
              this.web3.utils.toChecksumAddress(this.state.account)
            ].index
          )
          .call()
          .then((isClaimed) => {
            this.setState({
              isAirdropClaimed: isClaimed,
              claimable: this.roundTo(
                this.web3.utils.fromWei(
                  this.claims[
                    this.web3.utils.toChecksumAddress(this.state.account)
                  ].amount,
                  "ether"
                ),
                2
              ),
            });
          });
       }
     }
  };

  claimAirdrop = async () => {
    if (this.web3 != null && this.airdropContract != null) {
      this.airdropContract.methods
        .claim(
          this.claims[
            this.web3.utils.toChecksumAddress(this.state.account)
          ].index,
          this.state.account,
          this.claims[
            this.web3.utils.toChecksumAddress(this.state.account)
          ].amount,
          this.claims[
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
          <div className="airdrop-subtitle">
            <span>Unclaimed $SALTY: </span>
            {this.state.unclaimed.toLocaleString()}
          </div>
          <div className="airdrop-subtitle">
            <a
              href="https://etherscan.io/address/0x7dafeb1cee5a14ab5666729044acb5f46506dca1#code"
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
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Airdrop;
