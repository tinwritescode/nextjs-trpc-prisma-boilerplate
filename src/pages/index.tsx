import React from 'react'
import { signIn, useSession, getSession } from 'next-auth/react'
import { useBearStore } from '../models/bear-store'
import { Text } from '@chakra-ui/react'
import { trpc } from '../utils/trpc'

const Index = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const { bears, addBear, clearBear } = useBearStore()
  const hello = trpc.useQuery(['motthegioimoi.byCategory', { page: 1 }], {
    onSuccess: (data) => console.log(data),
  })

  if (!hello.data) {
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

      {!session ? (
        <>
          <h2>Not signed in</h2>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      ) : (
        <div className="">
          Signed in
          {JSON.stringify(session.user)}
        </div>
      )}
    </>
  )
}

export default Index
