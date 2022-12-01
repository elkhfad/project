import { useEffect, useState } from 'react';
import services from '../../services/registerService';

export const useImage = (url, currentUser) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    services.getUser(url).then((res) => {
      setImage(res.pic);
    });
  }, [url, setImage]);
  return {
    image,
    setImage,
  };
};
