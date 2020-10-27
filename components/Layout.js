import Head from 'next/head';
import Header from './Header';

import React from 'react';
import Sidebar from './SideBar';


export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />

      <Header />
      <main>{props.children}</main>

    </>
  );
}
