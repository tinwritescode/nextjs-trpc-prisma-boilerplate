import { Text, Button, Input } from '@chakra-ui/react'
import { Order } from '@prisma/client'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import Script from 'next/script'
import { useMemo, useState } from 'react'
import { VerticalSpacing } from '../common/spacing/spacing'

type OrderBookBodyProps = {
  data?: Order[]
}

const OrderBookBody = (props: OrderBookBodyProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const columns = useMemo<ColumnDef<Order>[]>(
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

  const mockData = useMemo<Order[]>(() => [], [])
  const { data = mockData } = props

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
      <table className="rounded-xl">
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
        {table.getRowModel().rows.length > 0 ? 'Rows' : 'Chưa có dữ liệu'}
      </div>

      <VerticalSpacing size={2} />

      {/* <div className="h-[300px]">
        <div className="tradingview-widget-container">
          <div id="tradingview_5440b"></div>
        </div>
      </div> */}
      {/* <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="blue-text">AAPL Chart</span>
        </a>{' '}
        by TradingView
      </div> */}
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

export default OrderBookBody
