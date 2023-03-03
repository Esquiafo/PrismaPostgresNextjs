import React, {useContext, useState} from 'react';
import CartContext from '@/components/CartContect';
import Navbar from '@/components/Navbar';
import Foot from '@/components/Footer';
const Cart = () =>{


  const context = useContext(CartContext); //CONTEXT PARA PRODUCTOS
  const increase = (h:any)=>{
    context.upCant(h.target.value)
  }
  const decrease = (h:any)=>{
    context.downCant(h.target.value)
  }
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [validemail, setValidemail] = useState('')
  let [phone, setPhone] = useState('')
  let count = -1
  let id
  let cantidad
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
    count++
    id = product['id']
    cantidad = product['cantidad']
    console.log(product)
    return (
    <div key={product['id']}>

      
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
const [show, setShow] = useState(false);


  return (
  
    <div >
    
 <Navbar></Navbar>
 <h1>HI</h1>
 <Foot></Foot>

   </div>
  );
};
export default Cart;