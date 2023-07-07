import Layout from "../components/common/Layout"
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout title="eventSync">
       <Component {...pageProps} />
      </Layout>
    </>
      
  )
}