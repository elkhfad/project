import { useEffect, useState } from 'react';
import services from '../../services/registerService';
export const useAccountHandler = () => {
  const [image, setImage] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const url = `http://localhost:3001/api/users`;
  const [account, setAccount] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    street: '',
    postalCode: '',
    city: '',
    pic: '',
  });
  const [accountOriginal, setAccountOriginal] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    postalCode: '',
    city: '',
    pic: '',
  });
  const removeImage = () => {
    setImage(null);
  };
  useEffect(() => {
    services
      .getUser(url)
      .then((res) => {
        setIsPending(false);
        setAccount(res);
        setImage(res.pic);
        setAccountOriginal(res);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setIsPending(false);
      });
  }, [url]);

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
        setAccount({
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
          street: account.street,
          postalCode: account.postalCode,
          city: account.city,
          pic: image,
        });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateAccount = {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      street: account.street,
      postalCode: account.postalCode,
      city: account.city,
      pic: image,
    };
    setImage(account.pic);
    setSuccess(null);
    if (
      updateAccount.firstName.length > 2 &&
      updateAccount.lastName.length > 4 &&
      updateAccount.email.length > 4 &&
      updateAccount.street.length > 3 &&
      updateAccount.postalCode.length > 3 &&
      updateAccount.city.length > 3
    ) {
      services
        .update(url, updateAccount)
        .then((res) => {
          setAccount(updateAccount);
          handleClose();
          setError(null);
          window.location.href = '/';
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };
  const handleClose = () => {
    setAccount({
      firstName: accountOriginal.firstName,
      lastName: accountOriginal.lastName,
      email: accountOriginal.email,
      password: accountOriginal.password,
      street: accountOriginal.street,
      postalCode: accountOriginal.postalCode,
      city: accountOriginal.city,
      pic: accountOriginal.pic,
    });
  };
  return {
    account,
    error,
    handleChange,
    handleImage,
    handleSubmit,
    success,
    isPending,
    image,
    removeImage,
  };
};
