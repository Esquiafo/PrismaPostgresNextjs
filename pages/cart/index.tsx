import React, { useContext, useEffect, useState} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Foot from "../../components/Footer/Footer";
import { Button, TextInput } from 'flowbite-react';
import CartView  from '../../components/Cart/ViewCart';
export default function Cart() {


  return (
  
<div>
  <Navbar></Navbar>

 <CartView></CartView>
 <Foot></Foot>

   </div>
  );
};