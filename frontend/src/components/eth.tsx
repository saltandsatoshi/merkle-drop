import React from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'

function Number(props: {
  number: BigNumber
}) {
  return <>{`Ξ${formatEther(props.number)}`}</>
}

function AddressLink(props: {
  address: string
  chainId: 1 | 42
}) {
  const url = `https://${ props.chainId === 42 ? `kovan.` : ``}etherscan.io/address/${props.address}`
  return <a href={url} target="_blank">{`${props.address.slice(0, 10)}...`}</a>
}

export default { Number, AddressLink }