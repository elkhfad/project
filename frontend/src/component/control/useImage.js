import { useEffect, useState } from 'react';
import services from '../../services/registerService';

export const useImage = (url, currentUser) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    currentUser?.length > 0
      ? services.getUser(url).then((res) => {
          setImage(res.pic);
        })
      : setImage('');
  }, [url, setImage, currentUser]);
  return {
    image,
    setImage,
  };
};
