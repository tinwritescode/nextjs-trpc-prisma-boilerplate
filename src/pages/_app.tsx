import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <div>
        <Component {...pageProps} />
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
        }
        div {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </SessionProvider>
  )
}

export default appWithTranslation(App)
