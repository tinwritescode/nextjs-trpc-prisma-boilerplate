import Document, { Html, Head, Main, NextScript } from 'next/document'
import Cloud from '~/components/layout/cloud'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Cloud />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
