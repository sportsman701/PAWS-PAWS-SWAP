import { Contract } from '@ethersproject/contracts'
import SWAP_LaunchPadABI from 'contracts/SWAP_LaunchPad.json'
import PAWS_TokenABI from 'contracts/PAWS_Token.json'
import PAWZ_TokenABI from 'contracts/PAWZ_Token.json'

export const Networks = {
  MainNet: 56,
  Testnet: 97,
  Rinkeby: 4,
  Kovan: 42,
}

export const CONTRACTS_BY_NETWORK = {
  [Networks.MainNet]: {
    SWAP_LaunchPad: {
      address: '0x1fFF4CC7A5A5e4302e1D2628B321680b03528843',
      abi: SWAP_LaunchPadABI,
    },
    PAWS_Token: {
      address: '0x066fc8DD5955534A01a9f892314c9B01b59A9C11',
      abi: PAWS_TokenABI,
    },
    PAWZ_Token: {
      address: '0xa54A5e77B126B0E920AF521133e0FF3E735B6Fa0',
      abi: PAWZ_TokenABI,
    }
  },
  [Networks.Testnet]: {
    SWAP_LaunchPad: {
      address: '0x39658015cF8E04A83546e7023f5156d676B0f5A8',
      abi: SWAP_LaunchPadABI,
    },
    PAWS_Token: {
      address: '0x39658015cF8E04A83546e7023f5156d676B0f5A8',
      abi: PAWS_TokenABI,
    },
    PAWZ_Token: {
      address: '0x39658015cF8E04A83546e7023f5156d676B0f5A8',
      abi: PAWZ_TokenABI,
    }
  },
  [Networks.Rinkeby]: {
    SWAP_LaunchPad: {
      address: '0x39658015cF8E04A83546e7023f5156d676B0f5A8',
      abi: SWAP_LaunchPadABI,
    },
    PAWS_Token: {
      address: '0x39658015cF8E04A83546e7023f5156d676B0f5A8',
      abi: PAWS_TokenABI,
    },
    PAWZ_Token: {
      address: '0x39658015cF8E04A83546e7023f5156d676B0f5A8',
      abi: PAWZ_TokenABI,
    }
  },
  [Networks.Kovan]: {
    SWAP_LaunchPad: {
      address: '0x39658015cF8E04A83546e7023f5156d676B0f5A8',
      abi: SWAP_LaunchPadABI,
    },
    PAWS_Token: {
      address: '0x39658015cF8E04A83546e7023f5156d676B0f5A8',
      abi: PAWS_TokenABI,
    },
    PAWZ_Token: {
      address: '0x39658015cF8E04A83546e7023f5156d676B0f5A8',
      abi: PAWZ_TokenABI,
    }
  }
}

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const baseApiUrl = process.env.REACT_APP_API_URL;

export function getContractInfo(name, chainId = null) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + '...' + endStr;
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + '...' + endStr;
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
