import PropTypes from 'prop-types'
import Layout from '../components/common/Layout'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout title="eventSync">
       <Component {...pageProps} />
      </Layout>
    </>
      
  )
}

// props validation
App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}