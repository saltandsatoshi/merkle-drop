import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'
import { TrezorConnector } from '@web3-react/trezor-connector'

export const INFURA_JSON_RPC_API = {
  1: `https://mainnet.infura.io/v3/663207cc32894545b804fbc519d9fa2a`,
  42: `https://kovan.infura.io/v3/663207cc32894545b804fbc519d9fa2a`,
  4: `https://rinkeby.infura.io/v3/663207cc32894545b804fbc519d9fa2a`,
}
const POLLING_INTERVAL = 12000

export const injected = new InjectedConnector({ supportedChainIds: [1, 42, 4] })

export const walletconnect = new WalletConnectConnector({
  rpc: { 
    4: INFURA_JSON_RPC_API[4],
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})


export const ledger = new LedgerConnector({
  chainId: 4,
  url: INFURA_JSON_RPC_API[4],
  pollingInterval: POLLING_INTERVAL
})

export const trezor = new TrezorConnector({
  chainId: 4,
  url: INFURA_JSON_RPC_API[4],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: 'dummy@abc.xyz',
  manifestAppUrl: 'http://localhost:1234'
})