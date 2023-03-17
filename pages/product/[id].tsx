import Navbar from "../../components/Navbar/Navbar";
import Foot from "../../components/Footer/Footer";
import React,{ useEffect, useState, useContext } from "react";

import { useRouter} from 'next/router'
import { Button, Carousel, Table } from "flowbite-react";
import { Cart, CartContextType, CartItem} from "../../interface/Interfaces";

export default function ProductId() {
  const [cantity, setCantity] = useState(1);
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const addItem = (item: CartItem) => { 
    const existingItem = cart.items.find((i) => i.id === item.id);

    if (existingItem) {
      const updatedItem = {
        ...existingItem,

      };
      const updatedItems = cart.items.map((i) =>
        i.id === item.id ? updatedItem : i
      );
      const updatedTotal = cart.total + item.price;
      setCart({ items: updatedItems, total: updatedTotal });
    } else {
      const newItems = [...cart.items, { ...item, quantity: 1 }];
      const newTotal = cart.total + item.price;
      setCart({ items: newItems, total: newTotal });
    }
  };

  const params = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }
    const router = useRouter()
    const [state, setState]:any = useState({});
    useEffect(() => {
      let path = ''
      const handle = async () => {
       const response = await fetch(
         `/api/${router.asPath.replace("-"," ")}`
       );
       const responseJson = await response.json();
       setState(responseJson);
       setIsLoading(true);
     };
     if (router.asPath !== router.route) {
      handle()
      }
   }, [router.isReady]);
            let ViewProduct=()=>{return <div>Empty</div>}
            let ProductList:any
            for (const [key, value] of Object.keys( state )) {
              let objValue = state[key as keyof typeof state]
        
                let finalValue:Array<String> = objValue['description'];
                ProductList = finalValue.map(x=>{
                  const productKey = Object.getOwnPropertyNames(x)
                  const productValue = Object.values(x)

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
              objValue['cantidad']=cantity
              function sendData(){
                addItem(objValue)
              }
              let jsonView= arrayJson.map(x=>{
                for (const [key, value] of Object.entries(x)) {
                
                return(
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {`${key}`.toUpperCase()}
                  </Table.Cell>
                  <Table.Cell>
              {typeof value == 'boolean' ? (
              <div>
                {value==true ? (
                  <div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">✔</span>
                  </div>
                ) : (
                  <div>
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">x</span>
                  </div>
                    
                    )}
              </div>
              ) : (<div>{value}</div>)}
                  </Table.Cell>
                </Table.Row>
                  )}
                }
              )
              ViewProduct = ()=>{
                if (cantity==objValue['cantity']) {
                  alert(`El maximo es stock de este producto es: `+cantity)
                }
                function increase(){
                  cantity==objValue['cantity'] ? setCantity(cantity) : setCantity(cantity+1)
                }
                function decrease(){
                  cantity!=1 ? setCantity(cantity-1) : setCantity(1)
                }
return(
<div key={objValue['id']} className="min-h-screen bg-white border border-gray-200 shadow  dark:bg-gray-800 dark:border-gray-700">
    


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
<div className="  sm:w-auto ">

<div className="inline-block">
<div className="inline-block pr-3">
<h1 style={{display:'flex', justifyContent: 'start'}} className="pr-3 pl-1 text-2xl font-bold dark:text-white mb-1 items-center flex justify-center">Precio Lista: ${objValue['price']}</h1>
<h1 style={{display:'flex', justifyContent: 'start'}} className="pr-3 pl-1 text-2xl font-bold dark:text-white mb-1 items-center flex justify-center">Precio Contado: ${objValue['price']*0.9}</h1>

</div>
<div style={{verticalAlign: 'text-bottom'}} className="inline-block">

<div className="flex justify-center text-center">
<button onClick={decrease} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">-</button>
<h3 className="pr-3 pl-1 text-2xl font-bold dark:text-white mb-1 items-center flex justify-center">{cantity}</h3>
<button onClick={increase} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">+</button>
<button onClick={sendData} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Agregar al carro</button>

</div>
</div>

<div className="inline-block">

</div>

</div>
<div id="toast-success" className="flex items-center w-full max-w-xs py-3 text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
</svg>

    </div>
    <div className="ml-3 text-sm font-normal">Garantia - {objValue['warranty']} meses</div>
</div>
<div id="toast-success" className="flex items-center w-full max-w-xs py-3 text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
</svg>

    </div>
    <div className="ml-3 text-sm font-normal">Stock disponible</div>
</div>
<div id="toast-success" className="flex items-center w-full max-w-xs py-3 text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>

       
    </div>
    <div className="ml-3 text-sm font-normal">Envios a todo el pais</div>
</div>
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

            if (!isLoading) {
              return (
                <div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              );
            }
          
            return (
              <>
              <Navbar></Navbar>
                {ViewProduct().props.children == "Empty" ? (
                  <div className="text-center mt-16 mb-16">
                    <h2 className="text-3xl font-semibold">Producto inexistente :( </h2>
                    <p className="mt-2 mb-2">
                    Vuelve al menu principal para encontrar tu producto deseado.
                    </p>
                  </div>
                ) : (
                  <>
                  {ViewProduct()}
                  </>
                 
              )}
            <Foot></Foot>
              </>
          
                    
            )

}