import { Button, Image, Spinner, Text } from '@chakra-ui/react'
import { createTRPCClient } from '@trpc/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { AppRouter } from '~/server/routers/_app'
import { trpc } from '../../utils/trpc'
import { toast } from 'react-hot-toast'
import { getBaseUrl } from '../_app'

const client = createTRPCClient<AppRouter>({
  url: getBaseUrl(),
})

const Index = () => {
  const { data: session, status } = useSession()
  const [page, setPage] = React.useState(1)
  const fetchPostList = trpc.useQuery(
    ['motthegioimoi.byCategory', { page, withImage: true, limit: 10 }],
    {
      onSuccess: (data) => console.log(data),
      staleTime: 60 * 1000 * 30,
    }
  )
  const addToGallery = trpc.useMutation(['user.addImageToGallery'])

  return (
    <>
      {(fetchPostList.isLoading && <Spinner />) || (
        <section className="overflow-hidden">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry columnsCount={3} gutter="10px">
              {fetchPostList.data?.map((post) => (
                <div key={post.url}>
                  <Text>{post.url}</Text>
                  {post.image?.map((image) => (
                    <Image
                      className="transition transform hover:scale-105 cursor-pointer"
                      key={image}
                      src={image}
                      title={`Save ${image}`}
                      onClick={() =>
                        addToGallery.mutate(
                          { url: image },
                          {
                            onSuccess: () => {
                              toast.success(`Saved ${image} to your gallery`)
                            },
                          }
                        )
                      }
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
      )}

      <Button
        colorScheme="pink"
        className="fixed right-10 bottom-10 my-4"
        css={{ position: 'fixed' }}
        onClick={() => {
          // fetchPostList.fetchNextPage()
          setPage((page) => page + 1)
        }}
      >
        Fetch next page
      </Button>
      {/* {JSON.stringify(images.data)} */}
    </>
  )
}

export default Index
