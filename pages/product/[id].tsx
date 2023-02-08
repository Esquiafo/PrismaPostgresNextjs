import Navbar from "@/components/Navbar";
import React,{ useEffect, useState } from "react";
import Foot from "@/components/Footer";
import { useRouter } from 'next/router'
export default function BrandID() {
    const router = useRouter()
    const [state, setState] = useState({});
    let productContent:Array<any> = []
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
                productContent.push(x)
            })
        }

       }

       let ViewSource
       console.log(ViewSource)
        if(productContent.length>0){
          ViewSource =  productContent.map(items=>{
                return(
                    <div key={items.id}>
                        <h1>{items.title}</h1>
                    </div>
                )
            }) 
           }
       
     
       
 
  return (

    <div>
         
<Navbar></Navbar>
<div className=" justify-center text-center align-center">
{ViewSource}

</div>     
<Foot></Foot>
 
    </div>
  );
}