import { useContext } from 'react';
import { CartsContext } from '../context/CartsContext';

export const useCartsContext = () => {
  const context = useContext(CartsContext);

  if (!context) {
    throw Error('useCartsContext must be used inside a CartsContextProvider');
  }

  return context;
};
