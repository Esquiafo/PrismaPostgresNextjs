import React,{useState,useEffect} from "react";
import Link from "next/link";

export default function IndexContext() {
   const [dataC, setDataC] = useState({});
   let categoryContent:Array<any> = []
   const [isLoadingBrand, setIsLoadingBrand] = useState(false);
   const [isLoadingCategory, setIsLoadingCategory] = useState(false);
   useEffect(() => {
      const handle = async () => {
       const response = await fetch(
         "/api/category/"
       );
       const responseJson = await response.json();
       setDataC(responseJson);
       setIsLoadingCategory(true);
     };
     handle()
   }, []);
   const [dataB, setDataB] = useState({});
   let brandContent:Array<any> = []
   useEffect(() => {
      const handle = async () => {
       const response = await fetch(
         "/api/brand/"
       );
       const responseJson = await response.json();
       setDataB(responseJson);
       setIsLoadingBrand(true);
     };
     handle()
   }, []);
      for (const [key, value] of Object.entries( dataB )) {
         brandContent.push(dataB[key as keyof typeof dataB])
      }

let BrandView = brandContent.map(units => {
  let path = units.name.toLowerCase().replace(" ","-")
   return(
    
       <div key={units.id+units.name}  style={{margin: '0px', width: '125px'}} className="ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 inline-block"> 
        <Link href={`/brand/${path}`}>
       <div >
       <h4 className=" font-mono text-lg text-center whitespace-pre-line font-medium text-gray-900 dark:text-white">
            {units.name}
           </h4>
         <div style={{margin: "0px"}} className="flex justify-center">
           <img
    
             className="w-28 h-28 rounded-full"
             src={units.image}
             alt={units.id+units.name}
           />

          
        
         </div>
       </div>
       </Link>
     </div>
   )
})
      for (const [key, value] of Object.entries( dataC )) {
         categoryContent.push(dataC[key as keyof typeof dataC])
      }

      let CategoryView = categoryContent.map(units => {
        let path = units.name.toLowerCase().replace(" ","-")
         return(
          
             <div  key={units.id+units.name}  style={{margin: '0px', width: '125px'}} className="ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 inline-block"> 
               <Link href={`/category/${path}`}>
             <div >
             <h1 className=" font-mono text-lg text-center whitespace-pre-line font-medium text-gray-900 dark:text-white ">
                  {units.name}
                 </h1>
               <div style={{margin: "0px"}} className="flex justify-center">
                 <img
          
                   className="w-28 h-28 rounded-full"
                   src={units.image}
                   alt={units.id+units.name}
                 />
      
                
              
               </div>
             </div>
             </Link>
           </div>
         )
      })
   return(



<div className=" flex flex-col">
<h2 className="m-3 pt-5 text-start font-medium text-gray-900 dark:text-white text-3xl font-semibold">Componentes: </h2>
{isLoadingCategory == true ? (
 <div  className="mx-2 mb-5 ">
 {CategoryView}
 </div>
) : (
  <div className="flex justify-center items-center">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
</div>
)}

<div className=" flex flex-col">
<h2 className="m-3 pt-5 text-start font-medium text-gray-900 dark:text-white text-3xl font-semibold">Marcas: </h2>

{isLoadingBrand == true ? (
 <div  className="mx-2 mb-5 ">
 {BrandView}
 </div>
) : (
  <div className="flex justify-center items-center">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
</div>
)}
</div>
 
</div>  



       
       
   )
}
