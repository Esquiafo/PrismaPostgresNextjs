import React,{useState,useEffect, SVGAttributes} from "react";
import { Footer } from "flowbite-react";



export default function Foot() {
  
    return(


  
<div>
<div className="text-start ">

</div>
<Footer>
  <div className="w-full bg-white border border-gray-200 shadow  dark:bg-gray-800 dark:border-gray-700">
    <div className="grid w-full grid-cols-2  gap-8 py-8 px-6 md:grid-cols-4">
      <div style={{marginLeft: '25%'}}>
        <Footer.Title title="Compañia"  className=" text-start " />
        <Footer.LinkGroup col={true}  className=" text-start ">
          <Footer.Link href="#" >
            Inicios
          </Footer.Link>
          <Footer.Link href="#">
            Carreras
          </Footer.Link>
          <Footer.Link href="#">
            Centro de Marcas
          </Footer.Link>
          <Footer.Link href="#">
            Blogs
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
      <div style={{marginLeft: '25%'}}>
        <Footer.Title title="Redes"  className=" text-start " />
        <Footer.LinkGroup col={true}  className=" text-start ">
          <Footer.Link href="#">
            Discord
          </Footer.Link>
          <Footer.Link href="#">
            Instagram
          </Footer.Link>
          <Footer.Link href="#">
            Whatsapp
          </Footer.Link>
          <Footer.Link href="#">
            Email
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
      <div style={{marginLeft: '25%'}}>
        <Footer.Title title="Legales"  className=" text-start " />
        <Footer.LinkGroup col={true}  className=" text-start ">
          <Footer.Link href="#">
            Politica de Privacidad
          </Footer.Link>
          <Footer.Link href="#">
            Licencias
          </Footer.Link>
          <Footer.Link href="#">
            Terminos y coindiciones
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
      <div style={{marginLeft: '25%'}}>
        <Footer.Title title="Nosotros"  className=" text-start " />
        <Footer.LinkGroup col={true}  className=" text-start ">
          <Footer.Link href="#">
            Empresa
          </Footer.Link>
          <Footer.Link href="#">
            Vision
          </Footer.Link>
          <Footer.Link href="#">
            Trayectoria
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
    </div>
    
  </div>
</Footer>
</div>
  
       



        
        
    )
}
