import React, { useEffect } from 'react'
import { signIn, useSession, getSession } from 'next-auth/react'
import { useBearStore } from '../models/bear-store'
import { Button, Text } from '@chakra-ui/react'
import { trpc } from '../utils/trpc'
import { createTRPCClient } from '@trpc/client'
import { AppRouter } from '~/server/routers/_app'
import { getBaseUrl } from './_app'
import { Image } from '@chakra-ui/react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const client = createTRPCClient<AppRouter>({
  url: getBaseUrl(),
})

const Index = () => {
  const { data: session, status } = useSession()
  const [page, setPage] = React.useState(1)
  const fetchPostList = trpc.useQuery(
    ['motthegioimoi.byCategory', { page, withImage: true }],
    {
      onSuccess: (data) => console.log(data),
      staleTime: 60 * 1000 * 30,
    }
  )

  if (!fetchPostList.data) {
    return <div>Loading</div>
  }

  return (
    <>
      <section>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry columnsCount={3} gutter="10px">
            {fetchPostList.data.map((post) => (
              <div key={post.url}>
                <Text>{post.url}</Text>
                {post.image?.map((image) => (
                  <Image
                    key={image}
                    src={image}
                    alt=""
                    style={{ width: '100%', display: 'block' }}
                    objectFit="contain"
                  />
                ))}
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </section>

      <Button
        className="block"
        onClick={() => {
          // fetchPostList.fetchNextPage()
          setPage((page) => page + 1)
        }}
      >
        Fetch next page
      </Button>
      {/* {JSON.stringify(images.data)} */}

      {!session ? (
        <>
          <h2>Not signed in</h2>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Index
