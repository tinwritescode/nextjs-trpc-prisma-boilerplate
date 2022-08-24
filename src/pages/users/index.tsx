import { useSession } from 'next-auth/react'
import React from 'react'
import { trpc } from '~/utils/trpc'

type Props = {}

function Index({}: Props) {
  const { data, isLoading, isError } = trpc.useQuery(['user.getToken'])
  const { data: session } = useSession()

  if (isLoading || !session) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error</div>
  }

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <div className="">{JSON.stringify(session?.user.id)}</div>
    </div>
  )
}

export default Index
