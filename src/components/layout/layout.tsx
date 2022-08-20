import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import useTrans from '../../hooks/useTrans'
import Footer from './footer'
import Header from './header'
import {
  CgGoogleTasks,
  CgHome,
  CgSearch,
  CgSearchLoading,
} from 'react-icons/cg'
import NavItem, { NavItemProps } from './nav-item'

type Props = { children: React.ReactNode }

const NAVIGATION: NavItemProps[] = [
  {
    title: 'Home',
    active: true,
    href: '/',
    leftIcon: CgHome,
  },
  {
    title: 'Tasks',
    href: '/tasks',
    leftIcon: CgGoogleTasks,
  },
]

function Layout({ children }: Props) {
  const {
    navigation: { search },
  } = useTrans()

  return (
    <div>
      {/* <Header /> */}
      <div className="h-[calc(100vh)] ">
        {/* Medium device navigation */}
        <div className="absolute inset-y-0 px-2 transition shadow-md w-60 -translate-x-60 md:translate-x-0">
          {/* Heading */}
          <Text fontSize="2xl">Laputa</Text>

          {/*  */}
          <InputGroup>
            <InputLeftElement>
              <CgSearch size="1rem" />
            </InputLeftElement>
            <Input variant="outline" placeholder={search} />
          </InputGroup>

          {/* Navigation */}
          <nav className="mt-4">
            <ul>
              {NAVIGATION.map((nav, index) => (
                <NavItem key={index} {...nav} />
              ))}
            </ul>
          </nav>
        </div>

        <div className="absolute inset-y-0 left-0 right-0 ml-2 overflow-y-scroll transition md:left-60">
          {children}
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default Layout
