import { useState, useEffect } from "react"
import useAuth from 'hooks/useAuth'
import { useWeb3React } from "@web3-react/core"

export function useEagerConnect() {
  const { active } = useWeb3React()
  const { login } = useAuth()

  const [tried, setTried] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    login()
    setError(error)
    setTried(true)
  }, [login, error]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return [tried, error]
}
