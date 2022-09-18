import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  InputAddon,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Select,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { Formik, Form, Field, FieldProps } from 'formik'
import { trpc } from '~/utils/trpc'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import {
  HorizontalSpacing,
  VerticalSpacing,
} from '~/components/common/spacing/spacing'
import DayItem from '~/components/trade_book/day_item'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import type { Order, OrderType, OrderStatus } from 'prisma/prisma-client'
import Script from 'next/script'
import {
  CgArrowLeft,
  CgArrowLongLeft,
  CgArrowLongRight,
  CgClose,
} from 'react-icons/cg'
import OrderBookBody from '~/components/trade_book/orderbook_body'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { createOrderSchema } from '~/utils/schema'
import { Widget } from '@uploadcare/react-widget'
import classNames from 'classnames'
import CreateNewBody from '~/components/trade_book/createnew_body'
import FloatingOrderList from '~/components/trade_book/floating_order_list'
import CreateNewModal from '~/components/trade_book/create_new_modal'
import { useStore } from 'zustand'
import { OrderStore } from '~/models/order-store'
import { joinSignature } from 'ethers/lib/utils'

type Props = {}
type GetDayInMonthProps = {
  month: number
  year: number
}

function Index({}: Props) {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()
  // const {
  //   isOpen: isFloatingOpen,
  //   onOpen: onFloatingOpen,
  //   onClose: onFloatingClose,
  //   onToggle: onFloatingToggle,
  // } = useDisclosure()

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const {
    selectedDate,
    setSelectedDate,
    toggleIsFloatingOpen,
    setIsFloatingOpen,
  } = useStore(OrderStore)

  const getDaysInMonth = useCallback(({ month, year }: GetDayInMonthProps) => {
    return new Date(year, month, 0).getDate()
  }, [])

  const onDayClick = ({
    day,
    month,
    year,
  }: {
    day: number
    month: number
    year: number
  }) => {
    setSelectedDate(new Date(year, month, day))
    onModalOpen()
  }

  const mockTrades: Order[] = [
    {
      userId: '1',
      id: '2',
      pair: 'EURUSD',
      type: 'LONG',
      entry: 1.2,
      stoploss: 1.1,
      takeprofit: 1.3,
      amount: 1000,
      leverage: 1,
      tradeType: 'ISOLATED',
      status: 'RUNNING',
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      tradeDate: new Date(),
    },
    {
      userId: '1',
      id: '1',
      pair: 'EURUSD',
      type: 'LONG',
      tradeType: 'CROSS',
      entry: 1.2,
      stoploss: 1.1,
      takeprofit: 1.3,
      amount: 1000,
      leverage: 1,
      status: 'RUNNING',
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      tradeDate: new Date(),
    },
  ]
  const getMyTrades = trpc.useQuery([
    'tradebook.myTradeHistory',
    { months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  ])

  const dayList = useMemo(
    () =>
      Array.from({ length: getDaysInMonth({ month, year }) }, (_, i) => i + 1),
    [getDaysInMonth, month, year]
  )

  const weekDayOfFirstDay = new Date(year, month, 1).getDay()

  const closeAllPopovers = () => {
    document
      .querySelectorAll('.chakra-popover__close-btn')
      .forEach((val: any) => val.click())
  }

  const weekDays = useMemo(
    () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    []
  )
  return (
    <>
      <Flex flexDirection="column" height="100%">
        <VerticalSpacing size={3} />

        {/* Month and Year */}
        <div className="flex justify-center gap-4 mx-10 my-4">
          <Text fontSize="4xl" fontWeight="bold">
            {moment().month(month).format('MMMM')} {year}
          </Text>
        </div>

        {/* Next month Button */}
        <div className="flex justify-end gap-4 mx-10 my-4 md:w-[50%]">
          <InputGroup className="flex-1">
            {/* eslint-disable-next-line react/no-children-prop */}
            <InputLeftAddon children="Year" />
            <Input
              value={year}
              type="number"
              onChange={(e) => {
                return setYear(+e.target.value)
              }}
            />
          </InputGroup>
          <div className="flex flex-col flex-1">
            <InputGroup>
              {/* eslint-disable-next-line react/no-children-prop */}
              <InputLeftAddon children="Month" />
              <Select value={month}>
                {Array.from(Array(12).keys()).map((month) => (
                  <option key={month} value={month}>
                    {moment().month(month).format('MMMM')}
                  </option>
                ))}
              </Select>{' '}
            </InputGroup>
            <VerticalSpacing size={1} />
            <div className="flex">
              <Button
                onClick={() => {
                  setMonth(month - 1)
                  if (month === 0) {
                    setMonth(11)
                    setYear(year - 1)
                  }
                }}
              >
                <CgArrowLongLeft />
              </Button>
              <HorizontalSpacing size={7} />
              <Button
                onClick={() => {
                  setMonth(month + 1)
                  if (month === 11) {
                    setMonth(0)
                    setYear(year + 1)
                  }
                }}
              >
                <CgArrowLongRight />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Seven days */}
          {weekDays.map((day) => (
            <div
              key={day}
              className="flex items-center justify-center text-2xl text-gray-500"
            >
              {day}
            </div>
          ))}

          {/* before */}
          {Array.from(Array(weekDayOfFirstDay).keys()).map((day) => (
            <DayItem
              day={31 - (weekDayOfFirstDay - day) + 1}
              trades={mockTrades}
              status="DISABLED"
              key={`${day}_before`}
            />
          ))}

          {dayList.map((day) => (
            <DayItem
              day={day}
              trades={mockTrades}
              status={
                Math.random() > 0.3
                  ? 'DEFAULT'
                  : Math.random() > 0.5
                  ? 'RED'
                  : 'GREEN'
              }
              key={day}
              onAddModalClick={() => {
                onDayClick({ day, month, year })
              }}
              onViewListClick={() => {
                if (selectedDate.getDate() === day) {
                  toggleIsFloatingOpen()
                  return
                }

                setSelectedDate(new Date(year, month, day))
                setIsFloatingOpen(true)
              }}
            />
          ))}
        </div>
      </Flex>
      <FloatingOrderList data={getMyTrades.data} />
      <CreateNewModal isOpen={isModalOpen} onClose={onModalClose} />
    </>
  )
}

export default Index
