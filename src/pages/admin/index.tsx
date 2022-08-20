import { Link } from '@chakra-ui/react'
import React from 'react'
import { requireAuth } from '~/utils/common/requireAuth'

type Props = {}

function Index({}: Props) {
  return (
    <div>
      <Link href="/admin/facebook">Facebook</Link>
    </div>
  )
}

// SSR
export const getServerSideProps = requireAuth(async (ctx) => {
  return {
    props: {},
  }
})

export default Index
