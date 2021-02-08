import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

import { merkle } from "../data/constants/merkle"

export function getContract(providerOrSigner: JsonRpcProvider | JsonRpcSigner) {
  return new Contract(merkle.contractAddress, merkle.contractABI, providerOrSigner)
}

export default { getContract }