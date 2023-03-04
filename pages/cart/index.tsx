import React, {use, useContext, useEffect, useState} from 'react';
import CartContext from '@/components/CartContect';
import Navbar from '@/components/Navbar';
import Foot from '@/components/Footer';
import { Button, TextInput } from 'flowbite-react';
const Cart = () =>{


  const contextProducts = useContext(CartContext); //CONTEXT PARA PRODUCTOS
  
  const [context, setContext] = useState(contextProducts)

  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [validemail, setValidemail] = useState('')
  let [phone, setPhone] = useState('')

  let id
  
  let var1 = true
// Validadores de la API
  let validEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
  let validName = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(name)
  let validPhone = /\b(?:\d[ ]*?){6,}\b/.test(phone)
  let validEmailEmail = email == validemail
  const costoEnvio = 1000
  const deleteId = (h:any)=>{
    context.eliminarId(h.target.value);
}
  const fullClear = ()=>{
    context.clear()
}

let finalPrice = 0
context.items.map(x=> finalPrice= finalPrice + (x['cantidad']*x['price']))

  const products = context.items.map(product => {
    

    let productValues = product['values'][0]
    let [cantidad, setCantidad] =  useState(product['cantidad']) 
    
    const increase = (h:any)=>{
      context.upCant(productValues['id'])
      setCantidad(product['cantidad'])
    }
    const decrease = (h:any)=>{
      context.downCant(productValues['id'])
      setCantidad(product['cantidad'])
    }
    
    return (

       <div key={productValues['id']}>
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img className="object-cover w-full rounded-t-lg h-24 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`${productValues['image']}`} alt={`${['image']} image`} />
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{productValues['title']}</h5>
        <div className='flex text-center justify-center'>
        <Button value={'1'} style={{width: '35px'}} onClick={decrease}>-</Button>
               {cantidad}
        <Button value={'2'} style={{width: '35px'}} onClick={increase}>+</Button>
        </div>
        <p>${productValues['price']*cantidad}</p>
         </div>
    </div>
     
                
                

       </div>


    

  );

})
// Handler de elementos del formulario
const handleName = (event:any) => {
  setName(event.target.value)
}
const handleEmail = (event:any) => {
    setEmail(event.target.value)
}
const handleValidEmail = (event:any) => {
  setValidemail(event.target.value)
}
const handlePhone = (event:any) => {
  setPhone(event.target.value)
}

  return (
  
    <div >
    
 <Navbar></Navbar>
 <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

   
   

 {products!==undefined ? (
    <div>
    {products}
    </div>
 ) : (
  <div>
  Cargando
  </div>
 )}
      
    
      <div>
  
     
      </div>
</div>
 <Foot></Foot>

   </div>
  );
};
export default Cart;