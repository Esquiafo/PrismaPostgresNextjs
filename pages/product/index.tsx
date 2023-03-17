import Head from "next/head";
import React,{ useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Foot from "../../components/Footer/Footer";
export default function Home() {

  return (
    <div>
        
      <Head>
        <title>eCommerce</title>
        <meta name="description" content="Index" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
<div className=" justify-center text-center align-center">

<h1>Product Index</h1>

</div>    
          
        <Foot></Foot>
 
    </div>
  );
}