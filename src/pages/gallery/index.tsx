import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Spinner } from '~/components/common/spinner'
import { trpc } from '~/utils/trpc'
import { Image } from '@chakra-ui/react'

type Props = {}

function Index({}: Props) {
  const getMyGallery = trpc.useQuery(['user.getMyGallery'])

  return (
    <section className="overflow-hidden">
      {(getMyGallery.isLoading && <Spinner />) || (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry columnsCount={3} gutter="10px">
            {getMyGallery.data?.map((image) => (
              <div key={image.url}>
                <Image
                  className="transition transform hover:scale-105 cursor-pointer"
                  src={image.url}
                  alt=""
                  style={{ width: '100%', display: 'block' }}
                  objectFit="contain"
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </section>
  )
}

export default Index
