import { IconType } from 'react-icons'
import { TbFaceId, TbFaceIdError } from 'react-icons/tb'

const CARD_PRESETS = {
  error: {
    backgroundColor: 'bg-rose-600',
    color: 'text-white',
    icon: TbFaceIdError,
  },
  warning: {
    backgroundColor: 'bg-orange-500',
    color: 'text-white',
    icon: TbFaceIdError,
  },
  success: {
    backgroundColor: 'bg-green-400',
    color: 'text-white',
    icon: TbFaceId,
  },
} as {
  [key: string]: {
    backgroundColor: string
    color: string
    icon: IconType
  }
}

export default CARD_PRESETS
