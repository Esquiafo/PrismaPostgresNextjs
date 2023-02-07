import Head from "next/head";
import Navbar from "@/components/Navbar";
import React,{ useEffect, useState } from "react";
import Foot from "@/components/Footer";
import { useRouter } from 'next/router'
import { Spinner } from "flowbite-react";
export default function BrandItems() {
const router = useRouter()
const [dataB, setDataB] = useState({});
const brandContent:Array<any> = []

useEffect(() => {
    const handle = async () => {
     const response = await fetch(
       `/api/${router.asPath}`
     );
     const responseJson = await response.json(); 
     setDataB(responseJson);
   };  
    if (router.asPath !== router.route) {
    handle()
    }

 }, [router.isReady]);

   for (const [key, value] of Object.entries( dataB )) {
    let dataContent:Array<String> = dataB[key as keyof typeof dataB]['items']
    if(dataContent!==undefined){
        dataContent.map(x=> {
            brandContent.push(x)
        })
    }

   }
  

   let ViewSoruce
    console.log(typeof brandContent)
  return(
    brandContent.map(items=>{
            return(
                <div key={items.id}>
                    <h1>{items.title}</h1>
                </div>
            )
        }) 

    )
    }