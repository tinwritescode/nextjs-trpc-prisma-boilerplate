import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>
  )
}

export default appWithTranslation(App)
