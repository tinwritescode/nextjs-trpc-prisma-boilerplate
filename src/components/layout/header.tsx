import { Button } from '@chakra-ui/react'
import classNames from 'classnames'
import { CgShoppingCart } from 'react-icons/cg'
import useHydrated from '~/hooks/useHydrated'
import { useCartStore } from '~/models/cart-store'
import { useEtherStore } from '~/models/web3-store'
import { Card } from '~/components/common/card'
import { Spinner } from '../common/spinner'
import { ConnectWalletButton } from './header/index'

type Props = {}

function Header({}: Props) {
  const hydrated = useHydrated()
  const { addItem, items } = useCartStore()
  const isMetaMaskInstalled = useEtherStore().isMetaMaskInstalled()

  if (!hydrated) {
    return <Spinner />
  }

  return (
    <header>
      <div className="flex justify-end">
        <ConnectWalletButton />
        <Button
          className={classNames(['px-4 mr-4 mt-2 py-2 bg-rose-300'])}
          leftIcon={<CgShoppingCart />}
          onClick={() => {
            addItem({
              id: `${Math.random()}`,
              name: 'Product name',
            })
          }}
        >
          Cart ({items.length})
        </Button>
      </div>

      {isMetaMaskInstalled ? (
        <Card colorScheme="success">
          <>
            {/* <Card.Header>You need to install MetaMask</Card.Header> */}
            <Card.Body>
              <p>You have MetaMask installed.</p>
            </Card.Body>
          </>
        </Card>
      ) : (
        <Card colorScheme="error">
          <>
            <Card.Header>
              <p>You need to install MetaMask</p>
            </Card.Header>
            <Card.Body>
              <p>
                MetaMask is a browser extension that allows you to interact with
                the Ethereum blockchain. You can install it from{' '}
                <a href="https://metamask.io/">metamask.io</a>.
              </p>
            </Card.Body>
          </>
        </Card>
      )}
    </header>
  )
}

export default Header
