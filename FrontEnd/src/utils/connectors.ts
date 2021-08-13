import { NetworkConnector } from '@web3-react/network-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'


import { currentNetwork } from "./index"
import getNodeUrl from './getRpcUrl';

export const injectedConnector = new InjectedConnector({
  // supportedChainIds: [parseInt(currentNetwork)],
});

export const networkConnector = new NetworkConnector({
  urls: { 56: getNodeUrl() },
  defaultChainId: parseInt(currentNetwork)
});

export const walletConnector = new WalletConnectConnector({
  rpc: { 56: getNodeUrl() },
  qrcode: true
})