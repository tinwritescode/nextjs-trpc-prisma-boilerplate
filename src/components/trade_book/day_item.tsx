import classNames from 'classnames'

type DayItemProps = {
  day: number
  status: 'DEFAULT' | 'GREEN' | 'RED'
  onClick?: () => void
}

const DayItem = ({ day, status = 'DEFAULT', onClick }: DayItemProps) => {
  return (
    <div
      key={day}
      className={classNames(
        'flex items-center justify-center h-24',
        status === 'GREEN'
          ? 'bg-green-200'
          : status === 'RED'
          ? 'bg-red-200'
          : 'bg-gray-200',
        'hover:opacity-70'
      )}
      onClick={onClick}
    >
      <span className="text-xl">{day}</span>
    </div>
  )
}

export default DayItem
