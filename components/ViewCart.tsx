import React, {use, useContext, useEffect, useState} from 'react';
import CartContext from '@/components/CartContext';
import { Button, TextInput } from 'flowbite-react';

  

export default function ViewCart() {

  let contextApi = useContext(CartContext); //CONTEXT PARA PRODUCTOS
  const [context, setContext] = useState(contextApi)

let products

if(context.items.length>0){

    products = context.items.map(product => {
      console.log(product)
        let productValues = product['values'][0]
        
        useEffect(()=>{
          setContext(contextApi)
          },[context])
        const increase = (h:any)=>{
          context.upCant(productValues['id'])
        
          console.log(context)
    
        }
        const decrease = (h:any)=>{
          context.downCant(productValues['id'])
          
          console.log(context)
    
        }
        
        return (
    
           <div key={productValues['id']}>
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-24 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`${productValues['image']}`} alt={`${['image']} image`} />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{productValues['title']}</h5>
            <div className='flex text-center justify-center'>
            <Button value={'1'} style={{width: '35px'}} onClick={decrease}>-</Button>
                   {product['cantidad']}
            <Button value={'2'} style={{width: '35px'}} onClick={increase}>+</Button>
            </div>
            <p>${productValues['price']}</p>
             </div>
        </div>
         
                    
                    
    
           </div>
    
    
        
    
      );
    
    
    
    
    
    })
}

// Handler de elementos del formulario

  return (
  
    <div >
    {products}
   </div>
  );
};
