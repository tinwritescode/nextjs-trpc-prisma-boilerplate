import React, { useCallback, useEffect } from 'react'
import useSWR from 'swr'
import { useEtherStore } from '~/models/web3-store'

interface EtherProviderProps {
  children: React.ReactNode
}

declare global {
  interface Window {
    ethereum: any
  }
}

export const EtherProvider = ({ children }: EtherProviderProps) => {
  const { connectToMetaMask } = useEtherStore()

  const fetcher = useCallback(() => {
    // if wallet is connected
    if (window?.ethereum.selectedAddress) {
      connectToMetaMask()
    }
  }, [])

  const { mutate } = useSWR('ethereum-reloader', fetcher, {
    revalidateOnFocus: false,
  })

  const handleAccountChanged = () => mutate()

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum?.on('accountsChanged', handleAccountChanged)
    }

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountChanged)
    }
  }, [])

  return <>{children}</>
}
