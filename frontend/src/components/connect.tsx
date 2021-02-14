import React from 'react'

import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import * as Connectors from '../connectors'

const ConnectorButton: React.FC<{theConnector: any, title: string}> = ({children, theConnector, title}) => {
  const context = useWeb3React<Web3Provider>()
  const { connector, activate } = context
  const isConnected = connector === theConnector

  return (
    <a
      href="#"
      className="button n01"
      onClick={event => {
        event.stopPropagation()
        activate(theConnector)
        return false
      }}
    >
      <span className="label">{title}</span>
    </a>)
}

function Connect() {
  const context = useWeb3React<Web3Provider>()
  const { chainId, account, deactivate, active, error } = context

  if (!account) {
    return (
      <>
        <ul id="buttons02" className="style1 buttons">
          <li>
            <ConnectorButton theConnector={Connectors.injected} title="Metamask"/>
          </li>
          <li>
            <ConnectorButton theConnector={Connectors.ledger} title="Ledger"/>
          </li>
          <li>
            <ConnectorButton theConnector={Connectors.trezor} title="Trezor"/>
          </li>
          <li>
            <ConnectorButton theConnector={Connectors.walletconnect} title="Walletconnect"/>
          </li>
        </ul>
        { error && <p style={{ fontWeight: 'normal', color: '#878E99' }} className="style2 with-cool-font">{error.message}</p> }
      </>)
  } else {
    return (<>
      <ul id="buttons02" className="style1 buttons">
        <li>
          <a href="#" className="button n01"
            onClick={event => {
              event.stopPropagation()
              return false
            }}
          >
            <span className="label">{account}</span>
          </a>
        </li>
        { (chainId !== 1) && (
          <li>
            <a href="#" className="button n01"
            onClick={event => {
              event.stopPropagation()
              return false
            }}
          >
            <span className="label">Network: {chainId}</span>
          </a>
          </li>
        )}
        <li>
          <a href="#" className="button n01"
            onClick={event => {
              event.stopPropagation()
              deactivate()
              return false
            }}
          >
            <span className="label">Logout</span>
          </a>
        </li>
      </ul>
      { error && <p id="text34" className="style2">⚠️ {error.message}</p> }
    </>)
  }
}

export default Connect