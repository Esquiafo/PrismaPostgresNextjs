import  {createContext} from 'react';


const CartContext = createContext({
    // Array de productos
    items: [],
    // Funcion que agrega nuevos productos
        addItems(x:any,h:any)  {
        const b = x as never 
        this.items.length!==0 ?
           this.lookItem(x)!==true ? this.items.push(b) : alert('Ya esta en el carrito')
         : this.items.push(b)
        },
        // Funcion que busca un ID repetido
        lookItem (b:any) {
         console.log(b)
         
        for (let i = 0; i < this.items.length; i++) {
          console.log(this.items[i][0])
        if (b[0].id===this.items[i][0]['id']) {return true}
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
          
          if(this.items[h]['cantidad']==this.items[h]['cantity']){
            alert("No se puede aumentar mas")
          }else{
            this.items[h]['cantidad']++
          }
        },
         // Contador negativo carrito
        downCant (h:any) {
          this.items[h]['cantidad']--
          if (this.items[h]['cantidad']==0) {
            this.eliminarId(h)
          }
        }, 
        
});

export default CartContext;