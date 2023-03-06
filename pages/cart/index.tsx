import React, {use, useContext, useEffect, useState} from 'react';
import CartContext from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Foot from '@/components/Footer';
import { Button, TextInput } from 'flowbite-react';
import ViewCart from '@/components/ViewCart';
export default function Cart() {


  
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
  
<div>
  <Navbar></Navbar>
  <ViewCart></ViewCart>
 <Foot></Foot>

   </div>
  );
};