import { Button } from 'flowbite-react';

import React, { useContext, useEffect, useState } from 'react';
import { Cart, CartContextType, CartItem} from "../../interface/Interfaces";
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
  let finalPrice = 0;
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

  const updatedTotal = cart.total + params.price;
  setCart({ items: cart.items, total: updatedTotal });
}
}
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name: string) => {
  const nameRegex = /^[a-zA-Z\s]*$/;
  return nameRegex.test(name);
};

const validateTelephone = (telephone: string) => {
  const telephoneRegex =/^(\+?\d{8,14})$/
  return telephoneRegex.test(telephone);
};
const [email, setEmail] = useState('');
const [isValidEmail, setIsValidEmail] = useState(false);
const [nombre, setNombre] = useState('');
const [isValidName, setIsValidName] = useState(false);
const [telephone, setTelephone] = useState('');
const [isValidTelephone, setIsValidTelephone] = useState(false);
const [reEmail, setReEmail] = useState('')
const [isReValidEmail, setRevalidEmail] = useState(false)

const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const enteredEmail = event.target.value;
  setEmail(enteredEmail);
  setIsValidEmail(validateEmail(enteredEmail));
};
const handleReEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const enteredEmail = event.target.value;
  setEmail(email);
  setReEmail(enteredEmail);
  email === enteredEmail ? setRevalidEmail(true) : setRevalidEmail(false);
};
const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const enteredName = event.target.value;
  setNombre(enteredName);
  setIsValidName(validateName(enteredName));
};

const handleTelephoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const enteredTelephone = event.target.value;
  setTelephone(enteredTelephone);
  setIsValidTelephone(validateTelephone(enteredTelephone));
};
const EmailValidationForm = () => {

  return (
 
    <form>


        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email:</label>

      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        className={`${isValidEmail ? 'bg-green-100' : 'bg-red-100'} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      />
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Reingresa Email:</label>

      <input
        type="email"
        id="email"
        name="email"
        value={reEmail}
        onChange={handleReEmailChange}
        className={`${isReValidEmail ? 'bg-green-100' : 'bg-red-100'} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      />

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Nombre y Apellido:</label>

      <input
        type="text"
        id="name"
        name="name"
        value={nombre}
        onChange={handleNameChange}
        className={`${isValidName ? 'bg-green-100' : 'bg-red-100'} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}        />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Celular:</label>
      <input
        type="text"
        id="telephone"
        name="telephone"
        value={telephone}
        onChange={handleTelephoneChange}
        className={`${isValidTelephone ? 'bg-green-100' : 'bg-red-100'} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />

    </form>
  );
};



const products = cart.items.map(product => {
      finalPrice += product.price * product.cantidad
        console.log(finalPrice)
      

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
  
  return (
    <>
      {cart.items.length === 0 ? (
        <div className="text-center mt-16 mb-16">
          <h2 className="text-3xl font-semibold">Tu carrito esta vacío.</h2>
          <p className="mt-2 mb-2">
            No tienes productos agregados en tu carrito todavía. ¡Agrega algunos para continuar!
          </p>
        </div>
      ) : (
     
          <div className="flex flex-wrap justify-center">
       <div className="my-5 px-5 md:basis-1/2 sm:basis-1 w-full">
        <h3>Eliminar todo: </h3>
              <button onClick={()=>deleteAll()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Icon description</span>
              </button>
        {products}
        </div>
        <div  className="my-5 px-5 md:basis-1/2 sm:basis-1 w-full">
        {EmailValidationForm()}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">   Costo productos:  ${finalPrice}</label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">   Costo envio:  $1200</label>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">   Costo final:  ${finalPrice+1200}</label>
        <Button>Comprar</Button>
          </div>
          </div>
    )}
 
    </>

          
  )
  };
