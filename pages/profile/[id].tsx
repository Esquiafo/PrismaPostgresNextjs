import Navbar from "../../components/Navbar/Navbar";
import Foot from "../../components/Footer/Footer";
import React,{ useEffect, useState } from "react";
import { useRouter } from 'next/router'
export default function BrandID() {
    const router = useRouter()
    const [state, setState] = useState({});
    let profileContent:Array<any> = []
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
                profileContent.push(x)
            })
        }

       }

       let ViewSource

        if(profileContent.length>0){
          ViewSource =  profileContent.map(items=>{
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