import React from "react";
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
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="icon" type="image/svg+xml" href="/images/favicon.ico" />
    </Head>
    <Navbar />
    <main>
      {children}
    </main>
    {path !== '/login' && path !== '/signup' && <Footer />}

    

  </>
  )
}

export default Layout