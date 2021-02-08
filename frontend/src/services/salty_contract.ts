import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

import { SALTYABI } from "../data/abi/SALTYABI";

export function getContract(contractAddress: string, providerOrSigner: JsonRpcProvider | JsonRpcSigner) {
  return new Contract(contractAddress, SALTYABI, providerOrSigner)
}

export default { getContract }