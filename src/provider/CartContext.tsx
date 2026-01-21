import React, { createContext, useContext, useState, type JSX } from 'react'

export const CartContext = createContext<{
  cart: Array<{
    id: string,
    name: string,
    price: number,
    category: string,
    quantity: number,
    quantityInCart: number,
  }>,
  addToCart: Function,
  removeFromCart: Function,
  removeCompletelyFromCart: Function,
  totalItemsInCart: number,
  totalCost: number
}>({ cart: [], addToCart: () => { }, removeFromCart: () => { }, removeCompletelyFromCart: () => { }, totalItemsInCart: 0, totalCost: 0 });

export default function CartProvider({ children }: { children: JSX.Element }) {
  const cartItems=localStorage.getItem("cart")
  let cartPersist= [];
  if (cartItems) {
    cartPersist = JSON.parse(cartItems)
  }
  const [cart, setCart] = useState<Array<{
    id: string,
    name: string,
    price: number,
    category: string,
    quantity: number,
    quantityInCart: number,
  }>>(cartPersist);

  const addToCart = (item: any) => {
    const index = cart.findIndex((i: any) => item.id == i.id);

    setCart((cart) => index != -1 ? cart.map((i: any) => {
      if (item.id == i.id) {
        return { ...i, quantityInCart: i.quantityInCart ? i.quantityInCart + 1 : 1 }
      }
      return i
    }) : [...cart, { ...item, quantityInCart: 1 }]);
  }

  const removeFromCart = (item: any) => {
    const index = cart.findIndex((i: any) => item.id == i.id);
    if (index != -1) {
      if (cart[index].quantityInCart > 1) {
        setCart((cart) => cart.map((i: any) => {
          if (item.id == i.id) {
            return { ...i, quantityInCart: i.quantityInCart - 1 }
          }
          return i
        }));
      } else {
        setCart((cart) => cart.filter((i: any) => item.id != i.id));
      }
    }
  }

  const removeCompletelyFromCart = (item: any) => {
    setCart((cart) => cart.filter((i: any) => item.id != i.id));
  }

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantityInCart, 0)
  const totalCost = cart.reduce((acc, item) => acc + item.quantityInCart*item.price, 0)

  localStorage.setItem("cart", JSON.stringify(cart))

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeCompletelyFromCart, totalItemsInCart, totalCost }}>
      {children}
    </CartContext.Provider>
  )
}

