import { Button } from '@chakra-ui/react'
import classNames from 'classnames'
import React from 'react'
import { CgShoppingCart } from 'react-icons/cg'
import useHydrated from '~/hooks/useHydrated'
import { useCartStore } from '~/models/cart-store'
import { Spinner } from '../spinner'

type Props = {}

function Header({}: Props) {
  const hydrated = useHydrated()
  const { addItem, clearItem, items } = useCartStore()

  if (!hydrated) {
    return <Spinner />
  }

  return (
    <header>
      <div className="flex justify-end">
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
