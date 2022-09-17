import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import moment from 'moment'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { VerticalSpacing } from '~/components/common/spacing/spacing'
import DayItem from '~/components/trade_book/day_item'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Order } from 'prisma/prisma-client'
import Script from 'next/script'
import { CgArrowLeft, CgArrowLongLeft, CgArrowLongRight } from 'react-icons/cg'

type Props = {}

function Index({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())

  type GetDayInMonthProps = {
    month: number
    year: number
  }
  const getDaysInMonth = ({ month, year }: GetDayInMonthProps) => {
    return new Date(year, month, 0).getDate()
  }

  const onDayClick = ({
    day,
    month,
    year,
  }: {
    day: number
    month: number
    year: number
  }) => {
    onOpen()
  }

  const daysInMonth = getDaysInMonth({ month, year })

  return (
    <Flex flexDirection="column" height="100%">
      <VerticalSpacing size={3} />
      {/* Month input */}
      <div className="flex mb-4">
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
          width={300}
        />
      </div>

      {/* Next month Button */}
      <div className="flex justify-end gap-4 mx-10 my-4">
        <Button
          leftIcon={<CgArrowLongLeft />}
          colorScheme="blue"
          onClick={() => setMonth(month - 1)}
        >
          Prev Month
        </Button>
        <Button
          rightIcon={<CgArrowLongRight />}
          colorScheme="blue"
          onClick={() => setMonth(month + 1)}
        >
          Next Month
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from(
          { length: getDaysInMonth({ month, year }) },
          (_, i) => i + 1
        ).map((day) => (
          <DayItem
            day={day}
            // status="DEFAULT"
            status={
              Math.random() > 0.3
                ? 'DEFAULT'
                : Math.random() > 0.5
                ? 'RED'
                : 'GREEN'
            }
            key={day}
            onClick={() => onDayClick({ day, month, year })}
          />
        ))}
      </div>

      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <div className="flex">
              <span>Order List</span>
              <Spacer />
              <Button
                variant="ghost"
                onClick={onClose}
                size="sm"
                colorScheme="red"
              >
                Close (ESC)
              </Button>
            </div>
          </DrawerHeader>
          <DrawerBody>
            <OrderBookBody />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

const OrderBookBody = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        header: 'Pair',
        accessorKey: 'pair',
      },
      {
        header: 'Type',
        accessorKey: 'type',
      },
      {
        header: 'Entry',
        accessorKey: 'entry',
      },
      {
        header: 'Stoploss',
        accessorKey: 'stoploss',
      },
      {
        header: 'Takeprofit',
        accessorKey: 'takeprofit',
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
      },
      {
        header: 'Leverage',
        accessorKey: 'leverage',
      },
      {
        header: 'Status',
        accessorKey: 'status',
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
      },
      {
        header: 'Updated At',
        accessorKey: 'updatedAt',
      },
    ],
    []
  )

  const data = React.useMemo<Order[]>(
    () => [
      {
        userId: '1',
        id: '1',
        pair: 'EURUSD',
        type: 'BUY',
        entry: 1.2,
        stoploss: 1.1,
        takeprofit: 1.3,
        amount: 1000,
        leverage: 1,
        status: 'OPEN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })
  return (
    <>
      <Text className="px-2">👨‍💻 Add Pair</Text>
      <VerticalSpacing size={2} />
      {/* pair, type, entry, stoploss, takeprofit, amount, leverage, status, createdAt, updatedAt */}
      <div className="grid grid-cols-4 gap-2">
        <Input placeholder="Pair" size="md" type="text" width={300} />
        <Input placeholder="Type" size="md" type="text" width={300} />
        <Input placeholder="Entry" size="md" type="text" width={300} />
        <Input placeholder="Stoploss" size="md" type="text" width={300} />
        <Input placeholder="Takeprofit" size="md" type="text" width={300} />
        <Input placeholder="Amount" size="md" type="text" width={300} />
        <Input placeholder="Leverage" size="md" type="text" width={300} />
        <Input placeholder="Status" size="md" type="text" width={300} />
        <Button colorScheme="blue" size="md" width={300}>
          Add
        </Button>
      </div>

      <VerticalSpacing size={4} />

      <Text className="px-2">🖥 Trade History</Text>
      <VerticalSpacing size={2} />
      <table className="overflow-hidden rounded-xl">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="min-w-[100px] bg-gray-200 py-2"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id} className="bg-slate-50">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-4 py-2 text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <div className="px-2 py-2 text-slate-600">
        {table.getRowModel().rows.length} Rows
      </div>

      <VerticalSpacing size={2} />

      <div className="h-[300px]">
        <div className="tradingview-widget-container">
          <div id="tradingview_5440b"></div>
        </div>
      </div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="blue-text">AAPL Chart</span>
        </a>{' '}
        by TradingView
      </div>
      <Script
        type="text/javascript"
        src="https://s3.tradingview.com/tv.js"
      ></Script>
      <Script
        type="text/javascript"
        id="tradingview_config"
        strategy="lazyOnload"
      >
        {`
        setTimeout(() => {
          new TradingView.widget(
            {
            "autosize": true,
            "width": "100%",
            "height": "100%",
            "symbol": "NASDAQ:AAPL",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "light",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_5440b"
          })
        }, 500);
    `}
      </Script>
    </>
  )
}

export default Index
