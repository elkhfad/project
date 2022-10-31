import { useState } from 'react';
import services from '../../services/services';
export const useGetAllItems = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  services
    .getAll(url)
    .then((res) => {
      if (!res.status === 'OK') {
        throw Error('could not load data');
      }
      setIsPending(false);
      setData(res.data);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setIsPending(false);
    });
  return {
    data,
    error,
    isPending,
    setData,
  };
};
