import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import React from 'react';
import Sidebar from './SideBar';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggedIn={props.loggedIn} admin={props.admin} />

      <Sidebar
        userIngArray={props.userIngArray}
        setUserIngArray={props.setUserIngArray}
        dbIngArray={props.dbIngArray}
        dbMainIngArray={props.dbMainIngArray}
      />

      <main>{props.children}</main>
      <Footer />
    </>
  );
}
