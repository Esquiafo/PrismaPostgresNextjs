import Navbar from "@/components/Navbar";
import React,{ useEffect, useState } from "react";
import Foot from "@/components/Footer";
import { useRouter } from 'next/router'
import Link from "next/link";
import { Card } from "flowbite-react";
export default function BrandID() {
    const router = useRouter()
    const [state, setState] = useState({});
    let brandContent:Array<any> = []
    useEffect(() => {
        let path = ''
        const handle = async () => {
         const response = await fetch(
           `/api/${router.asPath.replace("-"," ")}`
         );
         const responseJson = await response.json();
         setState(responseJson);
       };
       if (router.asPath !== router.route) {
        handle()
        }
     }, [router.isReady]);
       for (const [key, value] of Object.entries( state )) {
        let dataContent:Array<String> = state[key as keyof typeof state]['items']
        if(dataContent!==undefined){
            dataContent.map(x=> {
                
                brandContent.push(x)
            })
        }

       }
      

       let ViewSource
        if(brandContent.length>0){
          ViewSource =  brandContent.map(items=>{
                return(
                    <div className="inline-block  p-8">
                    <Link key={items.id} href={`/product/${items.id}`}>
                   <div className="max-w-sm">
                    <Card imgSrc="https://flowbite.com/docs/images/carousel/carousel-2.svg">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {items.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    ${items.price}
                    </p>
                    </Card>
                    </div>
                    </Link>
                    </div>
                )
            }) 
           }
           
           
       
     
       

 
  return (
    <div>

<Navbar></Navbar>
<div className=" justify-center text-center align-center">
{ViewSource==undefined ? (
    <div>
        No data
    </div>
) : (
    <div>
        {ViewSource}
    </div>
)}
<Foot></Foot>
</div>     
          
 
    </div>
  );
}