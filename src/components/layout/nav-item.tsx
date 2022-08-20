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
}

function NavItem({ href, title, active = false, leftIcon }: NavItemProps) {
  const activeBg = 'bg-slate-100'

  const LeftIcon = leftIcon ? leftIcon : null

  return (
    <li
      className={classNames('rounded-md hover:bg-slate-100', {
        [activeBg]: active,
      })}
    >
      <Link href={href || '/'}>
        <a className="block p-4">
          {LeftIcon && (
            <LeftIcon size="1rem" className="inline-block mb-1 mr-1" />
          )}
          {title}
        </a>
      </Link>
    </li>
  )
}

export default NavItem
