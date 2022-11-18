import { useEffect, useState } from 'react';
import services from '../../services/cartsService';
export const useGetCartList = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    services
      .getAllCartByUser(url)
      .then((res) => {
        if (!res.status === 'OK') {
          throw Error('could not load data');
        }
        setIsPending(false);
        setData(res);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [url]);
  return {
    data,
    error,
    isPending,
    setData,
  };
};
export const useGetCartById = (url, id) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    services
      .getById(url, id)
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
  }, [id, url]);
  return {
    error,
    isPending,
    data,
  };
};
