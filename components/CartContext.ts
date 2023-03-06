import { createContext, useState } from 'react';

interface CartContextProps {
  items: { values: any[]; cantidad: number }[];
  length(): number;
  addItems(x: any, h: any): void;
  lookItem(b: any): boolean;
  clear(): void;
  eliminarId(h: any): void;
  upCant(h: any): void;
  downCant(h: any): void;
}

class CartContextClass implements CartContextProps {
  items: { values: any[]; cantidad: number }[] = [];

  length() {
    return this.items.length;
  }

  addItems(x: any, h: any) {
    const b = { values: x, cantidad: h } as never;

    if (this.items.length !== 0) {
      if (this.lookItem(x) !== true) {
        this.items.push(b);
      } else {
        alert('Ya esta en el carrito');
      }
    } else {
      this.items.push(b);
    }
  }

  lookItem(b: any) {
    for (let i = 0; i < this.items.length; i++) {
      if (b[0]['id'] === this.items[i]['values'][0]['id']) {
        return true;
      }
    }
    return false;
  }

  clear() {
    this.items = [];
  }

  eliminarId(h: any) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]['values'][0]['id'] == h) {
        this.items.splice(i, 1);
      }
    }
  }

  upCant(h: any) {
    this.items.map((x) => {
      if (x['values'][0]['id'] == h) {
        if (x['values'][0]['cantity'] == x['cantidad']) {
          alert('Superaste el maximo de equipos para comprar');
        } else {
          x['cantidad']++;
        }
      }
    });
  }

  downCant(h: any) {
    this.items.map((x) => {
      if (x['values'][0]['id'] == h) {
        if (x['cantidad'] <= 1) {
          this.eliminarId(h);
        } else {
          x['cantidad']--;
        }
      }
    });
  }
}

const CartContext = createContext(new CartContextClass());

export default CartContext;
