import { Checkbox, Image, Link } from '@chakra-ui/react'
import { iteratorSymbol } from 'immer/dist/internal'
import React, { useCallback, useRef } from 'react'
import {
  HorizontalSpacing,
  VerticalSpacing,
} from '~/components/common/spacing/spacing'
import { Spinner } from '~/components/common/spinner'
import { Gai } from '~/types/gaito'
import { trpc } from '~/utils/trpc'
import InfiniteScroll from 'react-infinite-scroller'

type Props = {}

function Index({}: Props) {
  const [page, setPage] = React.useState(1)
  const [byReport, setByReport] = React.useState(false)
  const getItems = trpc.useQuery(['gaito.getGaito', { page, byReport }])

  const [selectedId, setSelectedId] = React.useState<string>('')
  const getReviews = trpc.useQuery([
    'gaito.getReviews',
    { entityId: selectedId },
  ])

  const [items, setItems] = React.useState<Gai[]>([])

  React.useEffect(() => {
    setItems([])
    setPage(1)
  }, [byReport])

  React.useEffect(() => {
    if (getItems.data) {
      setItems([...items, ...getItems.data])
    }
  }, [getItems.data])

  const fetchMoreData = () => {
    setPage((page) => page + 1)
  }

  return (
    <section>
      <h1>Gaito</h1>

      <div className="fixed inline p-4 m-auto bottom-20 right-16">
        <Checkbox
          isChecked={byReport}
          onChange={(e) => setByReport(e.target.checked)}
        />
        <label>By Report</label>
      </div>

      <div className="h-[700px] overflow-auto">
        <InfiniteScroll
          pageStart={1}
          loadMore={fetchMoreData}
          hasMore={
            getItems.data && getItems.data.length > 0 && !getItems.isLoading
          }
          useWindow={false}
          loader={<Spinner />}
        >
          {items.map((item, index) => (
            <div
              className="hover:bg-lime-200"
              key={`gaito-${index}-${item.id}`}
            >
              <a
                className="flex items-center block "
                onClick={() => setSelectedId(item.id)}
              >
                <div className="">
                  <Image
                    src={item.cover.dimensions.original.url}
                    alt={item.name}
                    // height={item.cover.dimensions.original.height}
                    // width={item.cover.dimensions.original.width}
                    width="100px"
                    height="100px"
                    objectFit="cover"
                  />
                </div>

                <HorizontalSpacing size={2} />

                <div>{item.name}</div>
              </a>
            </div>
          ))}
        </InfiniteScroll>
      </div>

      {getItems.isLoading && <Spinner />}

      {/* Check if scroll over here */}

      <VerticalSpacing size={2} />

      <div className="fixed flex items-center bottom-4 right-8">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <HorizontalSpacing size={2} />

        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          {page}
        </button>

        <HorizontalSpacing size={2} />

        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => setPage((page) => page + 1)}
          disabled={getItems.data?.length === 0}
        >
          Next
        </button>
      </div>

      <div className="fixed bottom-0 w-3/5 p-3 text-white rounded-md bg-slate-700">
        <span>Selected {selectedId}</span>

        <VerticalSpacing size={2} />

        <div className="max-h-[20rem] overflow-y-auto">
          {getReviews.data?.map((review, index) => (
            <div key={`review-${index}-${review.id}`}>
              {/* <span>{JSON.stringify(review.photos)}</span> */}
              {review.photos.map((photo, index) => {
                const photoUrl = photo.data.dimensions.original.url
                return (
                  <div key={`photo-${index}-${photo.id}`}>
                    <Link className="block" target="_blank" href={photoUrl}>
                      <Image
                        src={photoUrl}
                        alt={photo.id}
                        width="300px"
                        height="300px"
                        objectFit="cover"
                      />
                    </Link>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Index
