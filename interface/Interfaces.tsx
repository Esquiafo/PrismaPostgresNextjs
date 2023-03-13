export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    title: string;
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
  