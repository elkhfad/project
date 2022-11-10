import { useEffect, useState } from 'react';
export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const current = sessionStorage.getItem('currenUser');
    const currentUserData = JSON.parse(current);
    setCurrentUser(currentUserData);
  }, [currentUser]);
  return {
    currentUser,
  };
};
