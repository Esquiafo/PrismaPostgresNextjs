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
  const addItem = (item: CartItem) => {
    const existingItem = cart.items.find((i) => i.id === item.id);

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
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
      console.log(cart)
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: CartItem = {
      id: Math.random(),
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      title: '',
      image: '',
    };
    addItem(newItem);
    setName('');
    setPrice('');
    setQuantity('');
  };


  
     let products = cart.items.map(product => {
        console.log(product)

          
          return (
      
             <div key={product.id}>
              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-full rounded-t-lg h-24 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`${product.image}`} alt={`${['image']} image`} />
          <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
              <div className='flex text-center justify-center'>
              <Button value={'1'} style={{width: '35px'}} >-</Button>
                     {product.quantity}
              <Button value={'2'} style={{width: '35px'}} >+</Button>
              </div>
              <p>${product.price}</p>
               </div>
          </div>
           
                      
                      
      
             </div>
      
      
          
      
        );
      
      
      
      
      
      })
  
  
  // Handler de elementos del formulario
  
    return (
    
      <div >
      {products}
     </div>
    );
  };
