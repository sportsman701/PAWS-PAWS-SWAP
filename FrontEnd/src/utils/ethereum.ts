import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { getContractInfo } from "utils";

export function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

export function getNetworkName(chainId) {
  switch(chainId) {
    case 56: return 'BSC Mainnet';
    case 97: return 'BSC Testnet';
    default: return 'Unsupported Network';
  }
}

export function contractLink(chainId) {
  const contractInfo = getContractInfo('MelodyAirdrop', chainId);
  if(contractInfo) {
    switch(chainId) {
      case 56: return `https://bscscan.com/address/${contractInfo.address}`;
      case 97: return `https://testnet.bscscan.com/address/${contractInfo.address}`;
      default: return '#';
    } 
  }
  return '#';
}

export function txHashLink(chainId, hash) {
  if(hash) {
    switch(chainId) {
      case 56: return `https://bscscan.com/tx/${hash}`;
      case 97: return `https://testnet.bscscan.com/tx/${hash}`;
      default: return '#';
    } 
  }
  return '#';
}