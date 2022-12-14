import {
  Avatar,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import classNames from 'classnames'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import {
  CgFacebook,
  CgGoogleTasks,
  CgHome,
  CgImage,
  CgLogIn,
  CgPokemon,
  CgSearch,
  CgToggleOff,
  CgToggleOn,
  CgUser,
} from 'react-icons/cg'
import useTrans from '../../hooks/useTrans'
import { Spinner } from '../common/spinner'
import Header from './header'
import NavItem, { NavItemProps } from './nav-item'

type Props = { children: React.ReactNode }

const NAVIGATION: NavItemProps[] = [
  {
    title: 'Home',
    href: '/',
    leftIcon: CgHome,
  },
  {
    title: 'Tasks',
    href: '/tasks',
    leftIcon: CgGoogleTasks,
  },
  {
    title: '1TheGioiMoi',
    href: '/1thegioimoi',
    leftIcon: CgImage,
  },
  {
    title: 'Admin Panel',
    href: '/admin',
    leftIcon: CgPokemon,
  },
  {
    title: 'User',
    href: '/users',
    leftIcon: CgUser,
  },
  {
    title: 'Gallery',
    href: '/gallery',
    leftIcon: CgImage,
  },
  {
    title: 'Trade Book',
    href: '/trade-book',
    leftIcon: CgGoogleTasks,
  },
]

function NavbarFooter({ onOpen }: { onOpen: () => void }) {
  const { data, status } = useSession()

  if (status === 'loading') {
    return <Spinner></Spinner>
  }

  return (
    <ul className="">
      {status === 'unauthenticated' ? (
        <NavItem title="Login" leftIcon={CgLogIn} onClick={onOpen} />
      ) : (
        <>
          <div className="flex gap-2">
            <Avatar src={data?.user.picture} />
            <Text className="mt-1" noOfLines={2}>
              Login as {data?.user.email}
            </Text>
          </div>
          <NavItem title="Logout" leftIcon={CgLogIn} onClick={signOut} />
        </>
      )}
    </ul>
  )
}

const LoginModal = ({
  isOpen,
  onClose,
}: {
  // initialRef: React.RefObject<any>
  isOpen: boolean
  onClose: () => void
}) => {
  const initialRef = React.useRef(null)

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login to your account</ModalHeader>

        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* Login with facebook */}
          <Button
            onClick={() => {
              signIn('facebook')
              onClose()
            }}
            leftIcon={<CgFacebook />}
            width="100%"
            colorScheme="facebook"
          >
            Login with Facebook
          </Button>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function Layout({ children }: Props) {
  const {
    navigation: { search },
  } = useTrans()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navbar = useDisclosure()
  const router = useRouter()
  const { route } = router

  return (
    <div>
      <div className="h-[calc(100vh)] overflow-hidden w-full relative">
        <div className="absolute z-50 block top-4 left-4 md:hidden">
          <IconButton
            colorScheme="blackAlpha"
            aria-label="toggle navbar"
            onClick={() => {
              navbar.onToggle()
            }}
            icon={navbar.isOpen ? <CgToggleOff /> : <CgToggleOn />}
          />
        </div>

        {/* Medium device navigation */}
        <div
          className={classNames(
            'absolute inset-y-0 px-2 transition shadow-md w-60 -translate-x-60 md:translate-x-0 bg-white',
            { 'translate-x-0': navbar.isOpen }
          )}
        >
          {/* Navigation */}
          <nav className="absolute inset-0 flex flex-col justify-between px-2 mt-4 ">
            {/* Heading */}
            <Text fontSize="xl" className="mb-4 ml-2">
              Laputa
            </Text>

            {/*  */}
            <InputGroup className="mb-2">
              <InputLeftElement>
                <CgSearch size="1rem" />
              </InputLeftElement>
              <Input variant="outline" placeholder={search} />
            </InputGroup>

            <ul>
              {NAVIGATION.map((nav, index) => (
                <NavItem
                  active={nav.href?.endsWith(route)}
                  key={index}
                  {...nav}
                />
              ))}
            </ul>

            <div className="flex-grow border-t-slate-300"></div>

            {/* Footer */}
            <NavbarFooter onOpen={onOpen}></NavbarFooter>
          </nav>
        </div>

        <div
          className={classNames(
            'absolute inset-y-0 left-0 right-0 ml-2 overflow-y-scroll transition md:left-60 mt-4 md:mt-0',
            {
              'translate-x-60': navbar.isOpen,
            }
          )}
        >
          <Header />
          {children}
        </div>
      </div>

      <LoginModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default Layout
