import { Spinner } from '~/components/common/spinner'
import { trpc } from '~/utils/trpc'

type Props = {}

function Index({}: Props) {
  const { data, isLoading, isError } = trpc.useQuery([
    'user.getUser',
    { id: 'cl71m0xtw0009qovwjx8neh8pss' },
  ])
  // const { data: session } = useSession()

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }
  if (isError) {
    return <div>Error...</div>
  }

  return (
    <div>
      <div>{data?.name}</div>
    </div>
  )
}

export default Index
