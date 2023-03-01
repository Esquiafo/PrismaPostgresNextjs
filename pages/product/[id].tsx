import Navbar from "@/components/Navbar";
import React,{ useEffect, useState, useRef } from "react";
import Foot from "@/components/Footer";
import { useRouter } from 'next/router'

import { Alert, Badge, Button, Carousel, Table } from "flowbite-react";

export default function BrandID() {
  const params = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }
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
            let ViewProduct=()=>{return <div>Loading</div>}
            let ProductList:any
            for (const [key, value] of Object.keys( state )) {
              let objValue = state[key as keyof typeof state]
        
                let finalValue:Array<String> = objValue['description'];
                ProductList = finalValue.map(x=>{
                  const productKey = Object.getOwnPropertyNames(x)
                  const productValue = Object.values(x)
                  console.log(typeof productValue[0] == "boolean")
                  console.log()
                  return(
                 <div className="flex justify-between">
                  {productKey}
                  {typeof productValue[0] == "boolean" ? (
                    <div>
                      
                      {productValue[0] ? (
                        <div>  
                            <div>
                        <Button color="success">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                          </svg>
                        </Button>
  </div>
                       </div>
                      ) : (
                        <div> 
                                                <Button color="failure">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>

                        </Button>  
                        </div>
                      )}
                    </div>
                  ):
                  (
                    <div>{productValue}</div>
                  )}
                 </div>
                  )
                })
               
              }
            for (const [key, value] of Object.keys( state )) {
              let objValue = state[key as keyof typeof state]
              let arrayJson:Array<String> = objValue['description']
              
              let jsonView= arrayJson.map(x=>{
                for (const [key, value] of Object.entries(x)) {
                console.log()
                return(
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {`${key}`.toUpperCase()}
                  </Table.Cell>
                  <Table.Cell>
                  {`${typeof value == 'boolean' ? (value==true ? (
                     '✔'
                    
                  ) : (
                     'x'

                  )) : (value)}`.toUpperCase()}
                  </Table.Cell>
                </Table.Row>
                  )}
                }
              )
              ViewProduct = ()=>{
return(
<div key={objValue['id']} className="">
<div className="flex flex-wrap justify-center">
<div className="md:basis-1/2 my-5 px-5 sm:basis-1 relative">
<div className="flex justify-center align-center ">

<div className=" text-center h-80 w-80 md:w-5/6 h-min-[80] w-min-[80] sm:w-screen">
  <Carousel slideInterval={5000}>
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
      alt="..."
    />
    <img
      src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
      alt="..."
    />
  </Carousel>
</div>

</div>
</div>
<div  className="md:basis-1/2 my-5 px-5 sm:basis-1 w-full">
<div className="block ">
<div className=" text-center sm:w-auto ">
COMPRAR 
    CANTIDAD
<Table>
  <Table.Head>
    <Table.HeadCell>
      Descripciones
    </Table.HeadCell>
    <Table.HeadCell>
      Valores
    </Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y">

    {jsonView}
  </Table.Body>
</Table>
</div>
</div>
</div>


</div>

</div>
              )}
            }
  return (

    <div>
         
<Navbar></Navbar>
{ViewProduct()}
   
<Foot></Foot>
 
    </div>
  );

}