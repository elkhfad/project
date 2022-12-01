import { createContext, useReducer } from 'react';

export const CartsContext = createContext();
// const initialState = {
//   buyItems: [{ buyItem: '637e80c624999e1a20f8ffd75', amount: 11, price: 234, _id: '1263818aeb5f7a4aab255072f69' }],
//   time: '2022-12-01 15:40:04',
//   user: '12637e842a24999ea20f8ffe2a',
//   wish: true,
//   id: '1263818aeb5f7a4aab255072f68',
// };

export const cartsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CARTS':
      return {
        carts: action.payload,
      };
    case 'CREATE_CART':
      return {
        carts: [action.payload],
      };
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
