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
      address: '0x172ea525AACdBBA138D2a9aD949899239575c477',
      abi: SWAP_LaunchPadABI,
    },
    PAWS_Token: {
      address: '0x06870D62802eB649ff1fC6f431AAE569C9fE201A',
      abi: PAWS_TokenABI,
    },
    PAWZ_Token: {
      address: '0xd51CE9DC2115b18B77dACED9213425946D5b716a',
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
