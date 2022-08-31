import React, { useEffect } from 'react'
import { useEtherStore } from '~/models/web3-store'

interface EtherProviderProps {
  children: React.ReactNode
}

export const EtherProvider = ({ children }: EtherProviderProps) => {
  const { initWeb3, connectToMetaMask } = useEtherStore()

  useEffect(() => {
    initWeb3({ ethereum: window.ethereum })

    // if wallet is connected
    if (typeof window.ethereum !== 'undefined') {
      if (window?.ethereum.selectedAddress) {
        connectToMetaMask()
      }
    }
  }, [])

  return <>{children}</>
}
