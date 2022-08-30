import classNames from 'classnames'
import Link, { LinkProps } from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { CgSearch } from 'react-icons/cg'

export type NavItemProps = {
  title: string
  active?: boolean
  href?: string
  leftIcon?: IconType
  onClick?: () => void
}

function NavItem({
  onClick,
  href,
  title,
  active = false,
  leftIcon,
}: NavItemProps) {
  const activeBg = 'bg-green-400'

  const LeftIcon = leftIcon ? leftIcon : null

  return (
    <li
      className={classNames(
        'animate-in fade-in transition-colors duration-1000',
        'rounded-md hover:bg-green-400',
        {
          [activeBg]: active,
        }
      )}
    >
      <Link href={(!onClick && href) || '#'}>
        <a className="block p-4" onClick={onClick}>
          {LeftIcon && (
            <LeftIcon
              size="1rem"
              className="inline-block mb-1 mr-2 animate-in slide-in-from-left duration-500"
            />
          )}
          {title}
        </a>
      </Link>
    </li>
  )
}

export default NavItem
