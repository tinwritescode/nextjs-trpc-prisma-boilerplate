import { Button } from '@chakra-ui/react'
import classNames from 'classnames'
import { CgShoppingCart } from 'react-icons/cg'
import useHydrated from '~/hooks/useHydrated'
import { Card } from '~/components/common/card'
import { Spinner } from '../common/spinner'
import { ConnectWalletButton } from './header/index'

type Props = {}

function Header({}: Props) {
  const hydrated = useHydrated()

  if (!hydrated) {
    return <Spinner />
  }

  return <header></header>
}

export default Header
