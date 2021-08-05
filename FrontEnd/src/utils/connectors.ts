import { InjectedConnector } from "@web3-react/injected-connector";
import { currentNetwork } from "./index"

export const injectedConnector = new InjectedConnector({
  // supportedChainIds: [parseInt(currentNetwork)],
});
