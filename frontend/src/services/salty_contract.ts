import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

import { SALTY_ABI } from "../data/constants";

export function getContract(contractAddress: string, providerOrSigner: JsonRpcProvider | JsonRpcSigner) {
  return new Contract(contractAddress, SALTY_ABI, providerOrSigner)
}

export default { getContract }