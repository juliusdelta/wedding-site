import App, { Container } from 'next/app'
import base from '../styles/base'
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    pageProps.query = ctx.query;
    return { pageProps }
  }

  render () {
    base();
    const { Component, apollo, pageProps } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp);