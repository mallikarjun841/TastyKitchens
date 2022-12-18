import React from 'react'

const CartContext = React.createContext({
  CartItem: [],
  addcartitemlist: () => {},
  increasecount: () => {},
  decreasecount: () => {},
  removeelementfromcart: () => {},
})

export default CartContext
