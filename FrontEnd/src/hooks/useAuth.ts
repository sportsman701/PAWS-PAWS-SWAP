import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { setupNetwork } from 'utils/wallet'
import { injectedConnector } from "../utils/connectors"
import { toast } from 'react-hot-toast'
import { currentNetwork } from 'utils'

const useAuth = () => {
  const { library, chainId, active, activate, deactivate } = useWeb3React()

  const login = useCallback(async () => {
    await activate(injectedConnector);
    if (library && chainId != parseInt(currentNetwork)) {
      const hasSetup = await setupNetwork()
      if (hasSetup) {
        await activate(injectedConnector)
      }
      else {
        toast.error("Unsupported Network. This platform is working on Binance Smart Chain");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  const logout = useCallback(() => {
    deactivate()
  }, [deactivate])

  return { login, logout }
}

export default useAuth
