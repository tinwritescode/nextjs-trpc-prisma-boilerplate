import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import superjson from 'superjson'
import { Layout } from '../components'
import '../styles/global.css'
import { Toaster } from 'react-hot-toast'
import { theme } from '~/components/ui'
import { ChakraProvider } from '@chakra-ui/react'
import { AppRouter } from '~/server/routers/_app'
import { withTRPC } from '@trpc/next'

interface AppPropsWithAuth extends AppProps {
  session: any
}

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAuth) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>

      <Toaster />
    </SessionProvider>
  )
}

// export default appWithTranslation(App)

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return ''
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
  config({}) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      transformer: superjson,
      url: `${getBaseUrl()}/api/trpc`,
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(appWithTranslation(App as any))
