import React,{useState,useEffect} from "react";


export default function GroupComponente() {
   const [data, setData] = useState({});
   let categoryContent:Array<any> = []
   useEffect(() => {
      const handle = async () => {
       const response = await fetch(
         "/api/category/"
       );
       const responseJson = await response.json();
       setData(responseJson);
     };
     handle()
   }, []);
      for (const [key, value] of Object.entries( data )) {
         categoryContent.push(data[key as keyof typeof data])
      }

      let CategoryView = categoryContent.map(units => {
         return(
             <div key={units.id+units.name}  style={{margin: '0px', width: '125px'}} className="inline-block"> 
             <div >
             <h4 className=" text-xl text-center whitespace-pre-line font-medium text-gray-900 dark:text-white">
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
           </div>
         )
      })
   return(


 
<div className=" flex flex-col">
<h1 className=" m-3 pt-5 text-xl text-start font-medium text-gray-900 dark:text-white">
       Componentes
</h1>
<div  className="mx-2 mb-5 ">
{CategoryView}
</div>
</div>
 
      



       
       
   )
}
