import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import Foot from "../../components/Footer/Footer";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import { useRouter } from 'next/router'

export default function BrandID() {
  const router = useRouter()
  const [state, setState] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  let brandContent:Array<any> = []
  useEffect(() => {
    let path = '';
    const handle = async () => {
      const response = await fetch(`/api/${router.asPath.replace("-", " ")}`);
      const responseJson = await response.json();
      setState(responseJson);
      setIsLoading(true);
    };
    if (router.asPath !== router.route) {
      handle();
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
  let ViewSource;
  if (brandContent.length > 0) {
    ViewSource = brandContent.map((items) => {
      return (
        <div
          key={items.id}
          className="ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-4 rounded dark:border-sky-900 inline-block filter-none m-8"
        >
          <div className="max-w-sm pb-2">
            <div>
              <img
                className=""
                src="https://flowbite.com/docs/images/blog/image-1.jpg"
              />
              <div className="my-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {items.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-300">
                  ${items.price}
                </p>
              </div>
              <div className="justify-center flex ">
                <Link key={`${items.id}product`} href={`/product/${items.id}`}>
                  <Button>Ver mas</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  if (!isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>

<Navbar></Navbar>
<div className=" justify-center text-center align-center">
{ViewSource==undefined ? (
     <div className="text-center mt-16 mb-16">
     <h2 className="text-3xl font-semibold">Marca inexistente :( </h2>
     <p className="mt-2 mb-2">
     Vuelve al menu principal para encontrar tu producto deseado.
     </p>
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