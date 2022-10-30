import services from '../../../services/services';

const getAllItem = (data, setData) => {
  const [data, setData] = useState([]);
  return (
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
  )
};
