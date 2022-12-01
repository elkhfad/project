import { createContext, useReducer } from 'react';

export const CartsContext = createContext();

const initialState = {
  carts: [
    {
      buyItems: [{ buyItem: '12324', amount: 1, price: 123 }],
      user: 'user._id',
      time: ' localTime',
      wish: true,
    },
  ],
};

export const cartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CARTS':
      return { carts: action.payload };
    case 'CREATE_CART':
      return { carts: [action.payload, ...state.carts] };
    case 'DELETE_CART':
      return {
        carts: state.carts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const CartsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartsReducer, {
    carts: null,
  });

  return <CartsContext.Provider value={{ ...state, dispatch }}>{children}</CartsContext.Provider>;
};
