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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    </Head>
    <div id="container" className="min-h-[100vh] bg-[#F8FBFE] relative w-full ">
      <Navbar />
      <main className="flex h-full w-full items-center justify-center pt-[70px]">
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