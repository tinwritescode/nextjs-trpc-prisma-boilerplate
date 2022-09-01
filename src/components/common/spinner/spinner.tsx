import { Spinner, SpinnerProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends SpinnerProps {}

function CustomSpinner(data: Props) {
  const { color = 'red.500', ...rest } = data

  return (
    <div className="flex justify-center py-4">
      <Spinner size="xl" color={color} {...rest} />
    </div>
  )
}

export default CustomSpinner
