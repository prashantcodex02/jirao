import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const item = localStorage.getItem('jiraso_cart');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('jiraso_cart', JSON.stringify(cart));
  }, [cart]);

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const addItem = (item) => {
    if (item.outOfStock) {
      alert(`${item.name || 'This product'} is currently out of stock.`);
      return;
    }
    setCart((prev) => {
      const existing = prev.find(c => c.name === item.name && c.size === item.size);
      const qtyToAdd = Number.isFinite(item.qty) ? item.qty : 1;
      if (existing) {
        return prev.map(c => 
          c.name === item.name && c.size === item.size 
            ? { ...c, qty: c.qty + qtyToAdd }
            : c
        );
      }
      return [...prev, { ...item, qty: qtyToAdd }];
    });
  };

  const updateQty = (name, size, newQty) => {
    setCart(prev => prev.map(item => 
      item.name === name && item.size === size 
        ? { ...item, qty: Math.max(1, newQty) } 
        : item
    ));
  };

  const removeItem = (name, size) => {
    setCart(prev => prev.filter(item => !(item.name === name && item.size === size)));
  };

  return (
    <CartContext.Provider value={{ cart, totalQty, addItem, updateQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
