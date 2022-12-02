import { useEffect, useState } from 'react';
import services from '../../services/itemservices';
export const useGetAllItemsToUser = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    services
      .getAllByUser(url)
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
export const useGetAllItems = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    services
      .getAll(url)
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
    setIsPending,
  };
};

export const useGetItemById = (url, id) => {
  const [item, setItem] = useState({
    title: '',
    comment: '',
    price: '',
    pic: '',
  });
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
        setItem(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id, url]);
  return {
    item,
    isPending,
    error,
    setItem,
  };
};
