import { useRouter } from 'next/router'
import en from '../../public/locales/en/common.json'
import vi from '../../public/locales/en/common.json'

const useTrans = () => {
  const { locale } = useRouter()

  const trans = locale === 'vi' ? vi : en

  return trans
}

export default useTrans
