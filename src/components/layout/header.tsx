import { Button } from '@chakra-ui/react'
import classNames from 'classnames'
import { CgShoppingCart } from 'react-icons/cg'
import { GrConnect } from 'react-icons/gr'
import useHydrated from '~/hooks/useHydrated'
import { useCartStore } from '~/models/cart-store'
import { useEtherStore } from '~/models/web3-store'
import { Spinner } from '../spinner'
import Cloud from './cloud'

type Props = {}

function Header({}: Props) {
  const hydrated = useHydrated()
  const { addItem, items } = useCartStore()
  const { connectToMetaMask, address } = useEtherStore()

  if (!hydrated) {
    return <Spinner />
  }

  return (
    <header>
      <Cloud />
      <div className="flex justify-end">
        <Button
          className={classNames(['px-4 mr-4 mt-2 py-2 bg-rose-300'])}
          onClick={connectToMetaMask}
          leftIcon={<GrConnect />}
        >
          {address ? address : 'Connect to MetaMask'}
        </Button>
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
    </header>
  )
}

export default Header
