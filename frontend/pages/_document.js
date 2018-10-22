import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <title>Jonathan & Julie</title>
        <Head>
          {this.props.styleTags}
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
          <link rel="apple-touch-icon" href="/static/touch-icon.png" />
          <link rel="icon" href="/static/favicon.ico" />
          <meta property="og:url" content="" />
          <meta property="og:title" content="" />
          <meta property="og:description" content="Jonathan and Julie Wedding" />
          <meta name="twitter:site" content="" />
          <meta name="twitter:card" content="" />
          <meta name="twitter:image" content="" />
          <meta property="og:image" content="" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
