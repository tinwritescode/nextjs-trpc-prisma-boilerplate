import React from 'react'
import { signIn, useSession, getSession } from 'next-auth/react'
import { useBearStore } from '../models/bear-store'
import { Text } from '@chakra-ui/react'
import { trpc } from '../utils/trpc'

const Index = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const { bears, addBear, clearBear } = useBearStore()
  const hello = trpc.useQuery(['healthz'])

  if (!hello.data || loading) {
    return <div>Loading</div>
  }

  return (
    <>
      <div className="">
        <Text>Bear</Text>
        <button onClick={() => addBear({ name: 'Bear' })}>Add Bear</button>
        {/* clear */}
        <button onClick={() => clearBear()}>Clear</button>
        {bears.map((bear, index) => (
          <div key={index}>{bear.name}</div>
        ))}
      </div>

      <div className="">{JSON.stringify(hello.data)}</div>

      {!session ? (
        <>
          <h2>Not signed in</h2>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      ) : (
        <div className="">Signed in</div>
      )}
    </>
  )
}

export default Index
