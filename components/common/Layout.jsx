import PropTypes from 'prop-types'
import Head from 'next/head';
import { useRouter } from 'next/router'

import Navbar from "./Navbar";
import Footer from "./Footer";


const Layout = ({ title, children }) => {
  const router = useRouter()
  const path = router.pathname

  return (
    <>
    <Head>
      <title>{title}</title>
      <meta name="author" content="G Carolina Hernandez"/>
      <meta name="description" content="EventSync Web Page"/>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="icon" type="image/svg+xml" href="/images/favicon.ico" />
    </Head>
    <div id="container" className="h-screen border border-red-900 w-full ">
      <Navbar />
      <main className="flex h-[100%] border-black border w-full items-center justify-center my-[-5.1rem]">
        {children}
      </main>
      {path !== '/login' && path !== '/signup' && <Footer />}
    </div>
  </>
  )
}

// props validation
Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object
}

export default Layout