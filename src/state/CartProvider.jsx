/*
import React, { useReducer, useContext } from 'react'

// Initialize the context
const CartContext = React.createContext()

// Definte the default state
const initialState = {
  itemsById: {},
  allItems: [],
}

// Define reducer actions
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

// Define the reducer
const cartReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_ITEM:
      console.log({state, action})
      const newState = {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...payload,
            quantity: state.itemsById[payload._id]
              ? state.itemsById[payload._id].quantity + 1
              : 1,
          },
        },
        // Use `Set` to remove all duplicates
        allItems: Array.from(new Set([...state.allItems, action.payload._id])),
      };
      return newState
    case REMOVE_ITEM:
      const updatedState = {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key, value]) => key !== action.payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value
            return obj
          }, {}),
        allItems: state.allItems.filter(
          (itemId) => itemId !== action.payload._id
        ),
      }
      return updatedState
    
    default:
      return state
  }
}

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }

  // todo Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    // todo
  }

  // todo Get the total price of all items in the cart
  const getCartTotal = () => {
    // todo
  }

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
*/

// src/state/CartProvider.js
import React, { useReducer } from 'react';

// Define initial state and actions
const initialState = {
  itemsById: {},
  allItems: [],
};

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItem = action.payload;
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [newItem._id]: {
            ...newItem,
            quantity: state.itemsById[newItem._id]
              ? state.itemsById[newItem._id].quantity + 1
              : 1,
          },
        },
        allItems: [...new Set([...state.allItems, newItem._id])],
      };
    case REMOVE_ITEM:
      const updatedItemsById = { ...state.itemsById };
      delete updatedItemsById[action.payload._id];
      return {
        ...state,
        itemsById: updatedItemsById,
        allItems: state.allItems.filter(id => id !== action.payload._id),
      };
    case UPDATE_ITEM_QUANTITY:
      const { _id, quantity } = action.payload;
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [_id]: {
            ...state.itemsById[_id],
            quantity: state.itemsById[_id].quantity + quantity,
          },
        },
      };
    default:
      return state;
  }
};

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  const updateItemQuantity = (product, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: product._id, quantity } });
  };

  const getCartTotal = () => {
    return Object.values(state.itemsById).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItems = () => {
    return state.allItems.map(id => state.itemsById[id]) ?? [];
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };