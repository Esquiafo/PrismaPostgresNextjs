import Head from "next/head";
import React,{ useEffect, useState } from "react";
import Foot from "@/components/Footer";
export default function Home() {

  return (
    <div>
        
      <Head>
        <title>eCommerce</title>
        <meta name="description" content="Index" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
<div className=" justify-center text-center align-center">
<h1>Index Category</h1>

</div>    
          
        <Foot></Foot>
 
    </div>
  );
}