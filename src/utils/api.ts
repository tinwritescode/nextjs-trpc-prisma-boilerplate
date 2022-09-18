import axios from 'axios'

const fetcher = (url: string) => {
  if (!url) return []

  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err)
      return []
    })
}

export { fetcher }
