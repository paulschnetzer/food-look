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
      <Sidebar
        userIngArray={props.userIngArray}
        setUserIngArray={props.setUserIngArray}
      />

      <Header loggedIn={props.loggedIn} admin={props.admin} />
      <main>{props.children}</main>
    </>
  );
}
