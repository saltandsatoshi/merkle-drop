import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

import { MERKLE_ADDRESS, MERKLE_ABI } from "../data/constants";

export function getContract(providerOrSigner: JsonRpcProvider | JsonRpcSigner) {
  return new Contract(MERKLE_ADDRESS, MERKLE_ABI, providerOrSigner)
}

export default { getContract }