import { Button, Icon, IconButton, useDisclosure } from '@chakra-ui/react'
import classNames from 'classnames'
import {
  CgArrowDown,
  CgArrowTopLeft,
  CgArrowUp,
  CgArrowUpO,
  CgArrowUpR,
  CgClose,
} from 'react-icons/cg'
import OrderBookBody from './orderbook_body'
import { useHotkeys } from 'react-hotkeys-hook'
import { Order } from '@prisma/client'
import { useStore } from 'zustand'
import { OrderStore } from '~/models/order-store'

type FloatingOrderListProps = {
  data?: Order[]
}

const FloatingOrderList = (props: FloatingOrderListProps) => {
  const {
    isFloatingOpen,
    setSelectedDate,
    selectedDate,
    toggleIsFloatingOpen,
  } = useStore(OrderStore)

  const { data } = props

  // K as keyboard shortcut
  useHotkeys(
    'ctrl+k',
    () => {
      toggleIsFloatingOpen()
    },
    [toggleIsFloatingOpen]
  )

  return (
    <>
      <div
        className={classNames(
          'fixed bottom-0 left-0 right-0 w-3/5 p-3 mx-auto shadow-md rounded-t-md bg-slate-200 transition-[height]',
          {
            'h-96': isFloatingOpen,
            'h-12': !isFloatingOpen,
          }
        )}
      >
        <Button
          variant="unstyled"
          __css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          width="100%"
          onClick={() => {
            return toggleIsFloatingOpen()
          }}
        >
          <span>
            Danh sách lệnh <span className="font-bold">(Ctrl + K)</span> -{' '}
            <span className="font-bold">
              {(selectedDate && selectedDate.toDateString()) ||
                'Chưa chọn ngày'}
            </span>
          </span>

          {/* Collapse button */}
          {isFloatingOpen ? <CgArrowDown /> : <CgArrowUp />}
        </Button>

        {/* Content */}
        <div className="overflow-y-auto h-[360px]">
          <OrderBookBody data={data} />
        </div>
      </div>
    </>
  )
}

export default FloatingOrderList
