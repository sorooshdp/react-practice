import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item : any) => {},
  removeItem: (id : any ) => {}
});

export default CartContext;