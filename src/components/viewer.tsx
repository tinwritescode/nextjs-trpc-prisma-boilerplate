import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { UserDetailFragment } from '../lib/graphql/generated/viewer.generated'

interface Props {
  viewer: UserDetailFragment
}

export const Viewer = ({ viewer }: Props) => {
  const { image } = viewer

  return (
    <div>
      {image && (
        <Image
          width="150px"
          height="150px"
          src={viewer.image}
          alt={viewer.name}
        />
      )}
      <h2>{viewer.name || 'Unset name'}</h2>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
