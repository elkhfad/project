import { useEffect, useState } from 'react';
import servicesUser from '../../services/registerService';
export const useUser = () => {
  const [user, setUser] = useState({});
  const urlUser = `/api/users`;
  useEffect(() => {
    servicesUser.getUser(urlUser).then((res) => {
      setUser(res);
    });
  }, [urlUser]);
  return {
    user,
    setUser,
  };
};
