import React, { useCallback } from 'react'
import useSWR from 'swr'
import { useEtherStore } from '~/models/web3-store'

interface EtherProviderProps {
  children: React.ReactNode
}

export const EtherProvider = ({ children }: EtherProviderProps) => {
  const { connectToMetaMask } = useEtherStore()

  const fetcher = useCallback(() => {
    // if wallet is connected
    if (window?.ethereum.selectedAddress) {
      connectToMetaMask()
    }
  }, [])

  useSWR('ethereum-reloader', fetcher)

  return <>{children}</>
}
