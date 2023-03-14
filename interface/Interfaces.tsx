export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    title: string;
    cantity: number;
    cantidad: number;
  }
  
  export interface Cart {
    items: CartItem[];
    total: number;
  }
  
  export interface CartContextType {
    cart: Cart;
    addItem: (item: CartItem) => void;
    removeItem: (itemId: number) => void;
    clearCart: () => void;
  }
  