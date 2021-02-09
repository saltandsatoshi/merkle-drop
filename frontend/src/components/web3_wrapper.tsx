import React from 'react'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  return library
}

function Web3Wrapper(props: React.PropsWithChildren<{}>) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {props.children}
    </Web3ReactProvider>
  )
}

export default Web3Wrapper
