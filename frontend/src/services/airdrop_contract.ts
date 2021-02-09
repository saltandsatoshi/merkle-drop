import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

import { merkle } from "../data/merkle"

export function getContract(providerOrSigner: JsonRpcProvider | JsonRpcSigner) {
  return new Contract(merkle.SALTY_Address, merkle.SALTY_ABI, providerOrSigner)
}

export default { getContract }