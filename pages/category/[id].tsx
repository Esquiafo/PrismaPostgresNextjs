import Navbar from "@/components/Navbar";
import React,{ useEffect, useState } from "react";
import Foot from "@/components/Footer";
import { useRouter } from 'next/router'
import Link from "next/link";
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
      

         const ViewSource =  brandContent.map(items=>{
                return(
                    <Link key={items.id} href={`/product/${items.id}`}>
                    <div >
                        <h1>{items.title}</h1>
                    </div>
                    </Link>
                )
            })
           
           
       
     
       

 
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