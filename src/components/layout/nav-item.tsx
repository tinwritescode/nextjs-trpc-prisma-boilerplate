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
  const activeBg = 'bg-slate-100'

  const LeftIcon = leftIcon ? leftIcon : null

  return (
    <li
      className={classNames('rounded-md hover:bg-slate-100', {
        [activeBg]: active,
      })}
    >
      <Link href={(!onClick && href) || '#'}>
        <a className="block p-4" onClick={onClick}>
          {LeftIcon && (
            <LeftIcon size="1rem" className="inline-block mb-1 mr-2" />
          )}
          {title}
        </a>
      </Link>
    </li>
  )
}

export default NavItem
