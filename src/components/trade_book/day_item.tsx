import { Tooltip } from '@chakra-ui/react'
import { Order } from '@prisma/client'
import classNames from 'classnames'

type DayItemProps = {
  day: number
  status: 'DEFAULT' | 'GREEN' | 'RED' | 'DISABLED'
  onAddModalClick?: () => void
  onViewListClick?: () => void
  trades: Order[]
}

const DayItem = ({
  day,
  status = 'DEFAULT',
  onAddModalClick,
  onViewListClick,
  trades,
}: DayItemProps) => {
  return (
    <div
      key={`day-item-${day}`}
      className={classNames(
        'flex flex-col items-center justify-center h-24 rounded relative',
        {
          'bg-green-200 text-white': status === 'GREEN',
          'bg-red-200 text-white': status === 'RED',
          'bg-slate-200': status === 'DEFAULT',
          'cursor-not-allowed bg-white opacity-80': status === 'DISABLED',
        },
        'hover:opacity-70'
      )}
    >
      <span className="absolute text-xl right-2 top-2">{day}</span>

      {/* Half top */}
      <a onClick={onViewListClick}>
        <Tooltip label="Xem danh sách lệnh">
          <div className="absolute top-0 left-0 w-full bg-transparent h-1/2 hover:bg-sky-300" />
        </Tooltip>
      </a>

      {/* Half bottom */}
      <a onClick={onAddModalClick}>
        <Tooltip label="Thêm cặp">
          <div className="absolute bottom-0 left-0 w-full bg-transparent h-1/2 hover:bg-sky-300" />
        </Tooltip>
      </a>

      {trades.length > 0 && (
        <div className="absolute flex self-start gap-1 bottom-4 left-4">
          {trades.map((trade) => {
            const isRed = Math.random() > 0.5

            return (
              <div
                className={classNames(
                  'w-3 h-3',
                  // bg-green-400 border border-black rounded-full'
                  {
                    'bg-green-400 border border-black rounded-full': !isRed,
                    'bg-red-400 border border-black rounded-full': isRed,
                  }
                )}
                key={`trade_inner_${trade.id}`}
              ></div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DayItem
