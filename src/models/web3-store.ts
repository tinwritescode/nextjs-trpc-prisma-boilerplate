import { ethers } from 'ethers'
import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'

interface EtherProviderState {
  web3: any | null
  provider: ethers.providers.Web3Provider | null
  contract: ethers.Contract | null
  address: any | null
  connectToMetaMask: () => void
  initWeb3: ({ ethereum }: any) => void
  isMetaMaskInstalled: () => boolean
}

declare global {
  interface Window {
    ethereum: any
  }
}

export const useEtherStore = create<EtherProviderState>()(
  devtools(
    (set, get) => ({
      web3: null,
      provider: null,
      contract: null,
      address: null,
      initWeb3: ({ ethereum }: any) => {
        const web3 = ethereum
        if (!web3) return

        const provider = new ethers.providers.Web3Provider(ethereum)
        if (!provider) return

        set(
          produce((state) => {
            state.web3 = web3
            state.provider = provider
          })
        )
      },
      connectToMetaMask: async () => {
        if (typeof window.ethereum !== 'undefined') {
          get().initWeb3({ ethereum: window.ethereum })

          const provider = get().provider

          if (!provider) {
            return
          }

          const address = await provider
            .send('eth_requestAccounts', [])
            .then((value) => value[0])

          set(
            produce((state) => {
              state.address = address
            })
          )
        }
      },
      isMetaMaskInstalled: () => !!get()?.web3,
    }),
    {
      name: 'EtherStore',
    }
  )
)
