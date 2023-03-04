import  {createContext} from 'react';


const CartContext = createContext({
    // Array de productos
    items: [],
    // Funcion que agrega nuevos productos
        addItems(x:any,h:any)  {
        console.log(...x, h)
        const b = {values: x, cantidad: h} as never
        const c = h as never 
        this.items.length!==0 ?
           this.lookItem(x)!==true ? this.items.push(b) : alert('Ya esta en el carrito')
         : this.items.push(b)
        },
        // Funcion que busca un ID repetido
        lookItem (b:any) {
         console.log(b)
         
        for (let i = 0; i < this.items.length; i++) {
          console.log(this.items)
        if (b[0]['id']===this.items[i]['values'][0]['id']) {return true}
        } return false
        },        
        // Funcion que borra todos los elementos
        clear() {
        this.items=[];
        },
        
        // Funcion que borra un ID especifico
        eliminarId (h:any) {
          this.items.splice(h,1)
        },
        
        // Contador positivo carrito
        upCant (h:any) {
          let values = this.items
          values.map( x =>{
            if(x['values'][0]['id']==h){
              if(x['values'][0]['cantity']==x['cantidad']){
                alert("Superaste el maximo de equipos para comprar")
              }else{
                x['cantidad']++
              }
            }
          })
          console.log(this.items)
        },
         // Contador negativo carrito
        downCant (h:any) {
          let values = this.items
          values.map( x =>{
            if(x['values'][0]['id']==h){
              if(x['cantidad']<=1){
                this.eliminarId(h)
              }else{
                x['cantidad']--
              }
            }
          })
          console.log(this.items)
        }, 
        
});

export default CartContext;