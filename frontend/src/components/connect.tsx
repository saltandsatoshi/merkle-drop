import React from 'react'

import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import * as WEB3HOOKS from '../services/web3_hooks'

import * as Connectors from '../connectors'

const ConnectorButton: React.FC<{theConnector: any, title: string}> = ({children, theConnector, title}) => {
  const context = useWeb3React<Web3Provider>()
  const { connector, activate } = context
  const isConnected = connector === theConnector

  return (
    <button className="salty-button"
      onClick={event => {
        event.stopPropagation()
        activate(theConnector)
        return false
      }}
    >
      <h3>{title}</h3>
    </button>)
}

function Connect() {
  const context = useWeb3React<Web3Provider>()
  const { chainId, account, deactivate, connector, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = WEB3HOOKS.useEagerConnect()
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  WEB3HOOKS.useInactiveListener(!triedEager || !!activatingConnector)

  if (!account) {
    return (
      <>
        <div id="buttons02" className="style1 buttons" style={{display: "flex", justifyContent: 'space-around'}}>
          <ConnectorButton theConnector={Connectors.injected} title="Metamask"/>
          <ConnectorButton theConnector={Connectors.ledger} title="Ledger"/>
          <ConnectorButton theConnector={Connectors.trezor} title="Trezor"/>
          <ConnectorButton theConnector={Connectors.walletconnect} title="Walletconnect"/>
        </div>
        { error && <div style={{ fontWeight: 'normal', color: '#fc508e' }} className="style2 with-cool-font">{error.message}</div> }
      </>)
  } else {
    return (<>
      <div id="buttons02" className="style1 buttons" style={{display: "flex", justifyContent: 'space-around'}}>
        <button className="salty-button"
            onClick={event => {
              event.stopPropagation()
              return false
            }}
          >
            <h3>{account}</h3>
        </button>
        { (chainId !== 1) && (
          <button className="salty-button"
            onClick={event => {
              event.stopPropagation()
              return false
            }}
          >
            <h3>Network: {chainId}</h3>
        </button>
        )}
        <button className="salty-button"
            onClick={event => {
              event.stopPropagation()
              deactivate()
              return false
            }}
          >
            <h3>Logout</h3>
        </button>
      </div>
      { error && <p style={{color: '#f72585'}}>⚠️ {error.message}</p> }
    </>)
  }
}

export default Connect