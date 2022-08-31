import { Button } from '@chakra-ui/react'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import React, { Fragment, useCallback } from 'react'
import { GrConnect } from 'react-icons/gr'
import { useEtherStore } from '~/models/web3-store'

type Props = {}

function ConnectWalletButton({}: Props) {
  const { connectToMetaMask, address } = useEtherStore()
  const isMetamaskIntalled = useEtherStore().isMetaMaskInstalled()
  const { data, status } = useSession()

  const handleOnClick = useCallback(() => {
    if (!isMetamaskIntalled) {
      connectToMetaMask()
      return
    }
  }, [connectToMetaMask])

  return (
    <Menu as="div" className="relative">
      <Menu.Button onClick={handleOnClick}>
        <Button
          as="span"
          className={classNames(['px-4 mr-4 mt-2 py-2 bg-rose-300'])}
          onClick={connectToMetaMask}
          leftIcon={<GrConnect />}
        >
          {address
            ? address.substr(0, 8) + '...' + address.substr(-4)
            : 'Connect to MetaMask'}
        </Button>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <>
              <Button className="w-full" variant="ghost">
                {status !== 'authenticated' ? 'Loading...' : data?.user.name}
              </Button>
            </>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ConnectWalletButton
