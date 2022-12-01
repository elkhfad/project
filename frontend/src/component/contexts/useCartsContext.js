import { useContext } from 'react';
import { CartsContext } from './CartContext';

export const useCartsContext = () => {
  const context = useContext(CartsContext);

  if (!context) {
    throw Error('useCartsContext must be used inside an cartsContextProvider');
  }

  return context;
};
