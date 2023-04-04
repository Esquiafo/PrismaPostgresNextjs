import Head from "next/head";
import React,{ useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Foot from "../../components/Footer/Footer";
import axios from 'axios'
import jwt from "jsonwebtoken";
import { useRouter } from 'next/router';
import { Button } from "flowbite-react";


interface UserLogin {
  loginEmail: string;
  loginPassword: string;
}
interface UserCreate {
  email: string;
  password: string;
  nombre: string;
  surname: string;
  phone: string;
}

const secretKey = process.env.API_KEY;

export default function Home() {
  const [tokenLogin, setTokenLogin] = useState('');
 
  const router = useRouter();
  const [error, setError] = useState('');
  
/*   useEffect(() => {
    if (cart) {

      });
    }
  }, [cart]) */;
  
  const [jsonResponse, setJsonResponse] = useState(null);
  const [stateCreate, setStateCreate]:any = useState('');
  const [stateLogin, setStateLogin]:any = useState('');
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  
  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(name);
  };
  const validSurname = (surname: string) => {
    const surnameRegex = /^[a-zA-Z\s]*$/;
    return surnameRegex.test(surname);
  };
  
  const validateTelephone = (phone: string) => {
    const phoneRegex =/^(\+?\d{8,14})$/
    return phoneRegex.test(phone);
  };
  const [loginEmail, setLoginEmail] = useState('');
  const [isValidLoginEmail, setIsValidLoginEmail] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [isValidLoginPassword, setIsValidLoginPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [nombre, setNombre] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [surname, setSurname] = useState('');
  const [isValidSurname, setIsValidSurname] = useState(false);
  const [phone, setTelephone] = useState('');
  const [isValidTelephone, setIsValidTelephone] = useState(false);
  const [password, setPassword] = useState('')
  const [isValidPassword, setValidPassword] = useState(false)
  const [rePassword, setRePassword] = useState('')
  const [isValidRePassword, setValidRePassword] = useState(false)
  
  const handleLoginEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = event.target.value;
    setLoginEmail(enteredEmail);
    setIsValidLoginEmail(validateEmail(enteredEmail));
  };
  const handleLoginPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredPassword = event.target.value;
    setLoginPassword(enteredPassword);
    setIsValidLoginPassword(validatePassword(enteredPassword));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);
    setIsValidEmail(validateEmail(enteredEmail));
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredPassword = event.target.value;
    setPassword(enteredPassword);
    setValidPassword(validatePassword(enteredPassword));
  };
  const handleRePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredPassword = event.target.value;
    setRePassword(enteredPassword);
    enteredPassword === password ? setValidRePassword(true) : setValidRePassword(false);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setNombre(enteredName);
    setIsValidName(validateName(enteredName));
  };
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredSurname = event.target.value;
    setSurname(enteredSurname);
    setIsValidSurname(validateName(enteredSurname));
  };
  const handleTelephoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredTelephone = event.target.value;
    setTelephone(enteredTelephone);
    setIsValidTelephone(validateTelephone(enteredTelephone));
  };


  //Valida si existe el mail create
  useEffect(() => {
    let path = '';
    const headers = new Headers();
    if (secretKey) {
      headers.append('Authorization', secretKey);
      headers.append('Acess', secretKey)
    }
    const handle = async () => {
      const response = await fetch(`/api/user/${email}`, { headers});
      const responseJson = await response.json();
      setStateCreate(responseJson);
    };
    if (isValidEmail) {
      handle();
    }
  }, [email]);
  

 //Valida si existe el mail login con un click

  const runLogin = async () => {
   const response = await fetch(
     `/api/user/${loginEmail}`
   );
   const responseJson = await response.json();
   setStateLogin(responseJson);
 };


 async function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loginEmail, loginPassword }),
    });
    if (res.ok) {
      const { token, id } = await res.json();
      localStorage.setItem(id, token);
      const expirationTime = 10000; // 24 hours in milliseconds
      setTimeout(() => {
             localStorage.removeItem(id);
           }, expirationTime);
      const tokenAuth = localStorage.getItem(id)
      console.log(tokenAuth!==undefined)
      console.log(tokenAuth)
      if (tokenAuth!=='undefined') {
        //Redireccion
        alert("Correcto")
      }else{
        //Pass incorrecta / mail
        alert("Incorrecto")
      }
    } else {
      setError(await res.text());
    }
  }
 

 async function handleSubmitCreate(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  
  const user: UserCreate = { email, password, nombre, surname, phone  };

  try {
    const response = await axios.post('/api/user', user);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
console.log(tokenLogin)
 const LoginCreate = ()=>{
  return(
    <div className="flex flex-wrap justify-center">
 
    <div className="md:basis-1/2 my-5 px-8 sm:basis-1 relative">
    <div className="flex justify-center align-center ">
  
    <form onSubmit={handleSubmitLogin} className="min-w-[400px]">
    <h1 className="text-2xl font-bold mb-6">Iniciar Sesion</h1>
   
    <div className="mb-6">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu correo electronico</label>
            
          <input 
          type="email"
          name="email"
          value={loginEmail}
          onChange={handleLoginEmailChange}
          className={`${isValidLoginEmail ? 'bg-green-100 dark:bg-green-100' : 'bg-red-100 dark:bg-red-100'}  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="correo@dominio.com" required/>
             
               </div>
               <div className= "mb-6">
               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu contraseña</label>
                   
          <input 
            type="password"
            name="password"
            value={loginPassword}
            onChange={handleLoginPasswordChange}
          className={`${isValidLoginPassword ? 'bg-green-100 dark:bg-green-100' : 'bg-red-100 dark:bg-red-100'}  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="correo@dominio.com" required/>
          
          </div>
             <div className="flex items-start mb-6">
               <div className="flex items-center h-5">

                 <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
               </div>
               <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
             </div>

             <button type="submit" className=" flex items-start mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        
                </form>
                
    </div>
    </div>
    <div  className="md:basis-1/2 my-5 px-8 sm:basis-1 w-full">
    <form onSubmit={handleSubmitCreate} className="min-w-[300px]">
    <h1  className="text-2xl font-bold mb-6">Crear Usuario</h1>
      <div className="relative z-0 w-full mb-6 group">
          <input 
          type="email" 
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className={`${isValidEmail ? `${stateCreate.length>=1 ? 'bg-orange-500' : 'bg-green-200'}` : 'bg-red-100 dark:bg-red-100'}  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
         placeholder=" " 
          required />
          <label htmlFor="floating_email" className="  pl-1 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text- peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Correo Electronico</label>
      
      </div>
      <div className="relative z-0 w-full mb-6 group">
            <input 
          type="password" 
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className={`${isValidPassword ? 'bg-green-100 dark:bg-green-100' : 'bg-red-100 dark:bg-red-100'}  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder=" " 
          required />
          <label htmlFor="floating_password" className="pl-1 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text- peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Contraseña</label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
             <input 
          type="password" 
          id="password"
          name="password"
          value={rePassword}
          onChange={handleRePasswordChange}
          className={`${isValidRePassword ? 'bg-green-100 dark:bg-green-100' : 'bg-red-100 dark:bg-red-100'}  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder=" " 
          required />
          <label htmlFor="floating_repeat_password" className="pl-1 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text- peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Confirmar contraseña</label>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
      <div className="relative z-0 w-full mb-6 group">
            <input 
            type="nombre" 
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={handleNameChange}
            className={`${isValidName ? 'bg-green-100 dark:bg-green-100' : 'bg-red-100 dark:bg-red-100'}  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder=" " 
            required />
            <label htmlFor="floating_first_name" className="pl-1 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text- peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Nombres</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
           <input 
            type="surname" 
            id="surname"
            name="surname"
            value={surname}
            onChange={handleSurnameChange}
            className={`${isValidSurname ? 'bg-green-100 dark:bg-green-100' : 'bg-red-100 dark:bg-red-100'}  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder=" " 
            required />
            <label htmlFor="floating_last_name" className="pl-1 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text- peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Apellidos</label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
      <div className="relative z-0 w-full mb-6 group">
           <input 
            type="phone" 
            id="phone"
            name="phone"
            value={phone}
            onChange={handleTelephoneChange} 
            className={`${isValidTelephone ? 'bg-green-100 dark:bg-green-100' : 'bg-red-100 dark:bg-red-100'}  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder=" " 
            required />
            <label htmlFor="floating_phone" className="pl-1 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text- peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Telefono Contacto</label>
        </div>

      </div>
      <button  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
    </div>
    
    
    </div>
  )
 }
  return (
    <div>
        
      <Head>
        <title>eCommerce</title>
        <meta name="description" content="Index" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <div>
      {LoginCreate()}
      </div>
        <Foot></Foot>
 
    </div>
  );
}
