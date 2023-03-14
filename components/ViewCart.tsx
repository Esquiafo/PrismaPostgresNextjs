import { Button } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { Cart, CartContextType, CartItem} from "../interface/Interfaces";
export default function CartView() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
      
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const deleteItem = (itemId: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== itemId);
      const updatedTotal = updatedItems.reduce((total, item) => total + item.price, 0);
      return {
        items: updatedItems,
        total: updatedTotal,
      };
    });
  };
  const deleteAll = ()=>{
    setCart({ items: [], total: 0 })
  }

 

  function decrease(params:CartItem) {
    
    const existingItem = cart.items.map((i) => {
      if (i.id === params.id) {
        i.cantidad--
      }
    });
  if(params.cantidad < 1 ){
    deleteItem(params.id)
  }else{
    const newItems= [
      ...existingItem
    ]
 
    const updatedTotal = cart.total + params.price;
    setCart({ items: cart.items, total: updatedTotal });
  }
}
  

function increase(params:CartItem) {
    

if(params.cantidad >= params.cantity ){
  alert('Superaste el maximo de stock')
}else{
  const existingItem = cart.items.map((i) => {
    if (i.id === params.id) {
      i.cantidad++
    }
  });
  const newItems= [
    ...existingItem
  ]

  const updatedTotal = cart.total + params.price;
  setCart({ items: cart.items, total: updatedTotal });
}
}


     let products = cart.items.map(product => {
      console.log(product)
        console.log(cantidad)
      

          return (
           
             <div key={product.id}>
              <h3>Eliminar item: </h3>
              <button onClick={()=>deleteItem(product.id)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              <span className="sr-only">Icon description</span>
              </button>
              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-full rounded-t-lg h-24 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`${product.image}`} alt={`${['image']} image`} />
          <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
              <div className='flex text-center justify-center'>
              <Button onClick={()=>{decrease(product)}} style={{width: '35px'}} >-</Button>
                     {product.cantidad}
              <Button onClick={()=>{increase(product)}}  style={{width: '35px'}} >+</Button>
              </div>
              <p>Unitario: ${product.price}</p>
              <p>Total: ${product.price*product.cantidad}</p>
               </div>
          </div>
           
                      
                      
      
             </div>
      
      
          
      
        );
      
      
      
      
      
      })
  
  
  // Handler de elementos del formulario
  
    return (
    
      <div >
        <h3>Eliminar todo: </h3>
              <button onClick={()=>deleteAll()}type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
</svg>

<span className="sr-only">Icon description</span>
              </button>
      {products}
     </div>
    );
  };
