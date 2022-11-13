import { useEffect, useState } from 'react';
export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const current = sessionStorage.getItem('currenUser');
    const currentUserData = JSON.parse(current);
    setCurrentUser(currentUserData);
  }, []);
  return {
    currentUser,
  };
};
export const useAvatar = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    const avatar = sessionStorage.getItem('image');
    const avatarImage = JSON.parse(avatar);
    setImage(avatarImage);
  }, []);
  return {
    image,
  };
};
