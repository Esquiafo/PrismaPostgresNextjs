import Navbar from "@/components/Navbar";
import React,{ useEffect, useState } from "react";
import Foot from "@/components/Footer";
import { useRouter } from 'next/router'
import Link from "next/link";
import { Button, Card } from "flowbite-react";
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
                    <div key={items.id} className=" ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 border-4 rounded dark:border-sky-900  inline-block filter-none  m-8">
                   
                    <div className="max-w-sm ">
                    <div>
                    <img className="" src="https://flowbite.com/docs/images/blog/image-1.jpg"/>
                    <div className="my-5">
                    <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {items.title}
                    </h5>
                    <p className=" font-normal text-gray-700 dark:text-gray-300">
                    ${items.price}
                    </p>
                    </div>
                    <div className="justify-between flex">
                    <Link key={`${items.id}product`} href={`/product/${items.id}`}>
                    <Button className="ml-5 mb-5">
                      Detalle
                    </Button>
                    </Link>
                    <Link key={`${items.id}carrito`} href={`/carrito/${items.id}`}>
                    <Button color="success" className="mr-5 mb-5">
                      Comprar
                    </Button> 
                    </Link>
                    </div>
                    </div>
                    </div>
                 
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