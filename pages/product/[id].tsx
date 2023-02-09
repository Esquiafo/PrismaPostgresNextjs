import Navbar from "@/components/Navbar";
import React,{ useEffect, useState } from "react";
import Foot from "@/components/Footer";
import { useRouter } from 'next/router'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Alert, Badge, Button } from "flowbite-react";

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
              ViewProduct = ()=>{
return(<div key={objValue['id']} className=" justify-center text-center align-center">
<div className="flex  justify-center  ">
<div  className="md:w-4/5 w-3/5 lg:w-2/3">
<Carousel interval={3000} infiniteLoop={true} dynamicHeight={true} autoPlay={true}>
                <div>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" />
                </div>
                <div>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" />
                </div >
                <div>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" />
                </div>
                <div>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" />
                </div>
                <div>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" />
                </div>
                <div>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" />
                </div>
</Carousel>
</div>
</div>
<div className="">
<div className="p-8">
  <div style={{width: '100%'}}>
    <a href="#">
      <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {objValue['title']}
      </h1>
    </a>

    <div className="flex items-center align-middle justify-between">
      <span className="text-3xl font-bold text-gray-900 dark:text-white">
      ${objValue['price']}
      </span>
      <a
        href="#"
        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add to cart
      </a>
    </div>
    {ProductList}
    <div>
   
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