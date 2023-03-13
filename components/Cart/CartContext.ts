import { Cart } from "@/interface/Interfaces";
import { useEffect, useState } from "react";

const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
      
useEffect(() => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    setCart(JSON.parse(storedCart));
  }
}, []);

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);