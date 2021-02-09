import React, { Component } from "react";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { X } from "react-feather";
import Web3Wrapper  from './components/web3_wrapper'

const Close = ({ closeToast }) => <X size={20} onClick={closeToast} />;

export default class App extends Component {
  render() {
    return (
      <Web3Wrapper>
        <ToastContainer
          position={"bottom-right"}
          autoClose={3000}
          closeButton={<Close />}
          pauseOnFocusLoss={false}
          draggable={true}
          draggablePercent={25}
        />
        <Routes />
      </Web3Wrapper>
    );
  }
}
