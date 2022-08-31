import classNames from 'classnames'
import React from 'react'
import CARD_PRESETS from './card_preset'

type Props = {
  children?: JSX.Element
  colorScheme: keyof typeof CARD_PRESETS
}

function Card({ children, colorScheme }: Props) {
  const backgroundColor = CARD_PRESETS[colorScheme].backgroundColor
  const color = CARD_PRESETS[colorScheme].color
  const Icon = CARD_PRESETS[colorScheme].icon

  return (
    <div
      className={classNames(
        'shadow-md py-3 px-4 rounded-md mx-4 flex mt-4 items-center',
        backgroundColor,
        color
      )}
    >
      <div className="items-center mr-2">
        <Icon className="w-8 h-8" />
      </div>
      <div>{children}</div>
    </div>
  )
}

type HeaderProps = {
  children: JSX.Element
}
Card.Header = function CardHeader({ children }: HeaderProps) {
  return <p className="text-xl font-bold">{children}</p>
}

type BodyProps = {
  children: JSX.Element
}

Card.Body = function CardBody({ children }: BodyProps) {
  return <div className="text-sm">{children}</div>
}

export default Card
