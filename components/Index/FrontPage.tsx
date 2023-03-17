import React,{ useEffect, useState } from "react";
import IndexContext from './IndexContext'
import Navbar from "../Navbar/Navbar";
import Foot from "../Footer/Footer";
import GroupIndex from "./GroupIndex";
export default function FrontPage() {

  return (
    <div> 


         <div className="">
         <Navbar></Navbar>
         </div>
         <div className="">
        <IndexContext></IndexContext>
         </div>
         <div className="">
          <GroupIndex></GroupIndex>
         </div>
         <div className="">
        <Foot></Foot>
         </div>
    </div>
 

 




            
          
        

  );
}