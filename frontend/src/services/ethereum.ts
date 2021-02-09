import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'

function getJsonRpcProvider(jsonRPCAPIURL: string, network: number): JsonRpcProvider {
  const provider = new JsonRpcProvider(jsonRPCAPIURL, network)
  return provider
}

export default { getJsonRpcProvider }