import registerServices from '../../services/registerService';
import RegisterForm from '../forms/RegisterForm';
import { useEffect, useState } from 'react';

const Register = () => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [signUp, setSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    street: '',
    postalCode: '',
    city: '',
    pic: '',
  });
  const url = 'http://localhost:3001/api/users';
  useEffect(() => {
    const validation = () => {
      if (
        signUp.firstName.length > 2 &&
        signUp.lastName.length > 4 &&
        signUp.email.length > 4 &&
        signUp.password.length > 7 &&
        signUp.street.length > 3 &&
        signUp.postalCode.length > 3 &&
        signUp.city.length > 3
      ) {
        setValid(true);
      }
    };
    validation();
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: signUp.firstName,
      lastName: signUp.lastName,
      email: signUp.email,
      password: signUp.password,
      street: signUp.street,
      postalCode: signUp.postalCode,
      city: signUp.city,
      pic: image,
    };
    if (valid) {
      registerServices
        .create(url, newUser)
        .then((res) => {
          handleClose();
          setImage(null);
          setError(null);
          setValid(false);
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    }
  };
  const handleChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setSignUp({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      street: '',
      postalCode: '',
      city: '',
      pic: '',
    });
    setError('');
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div>
      <RegisterForm handleChange={handleChange} signUp={signUp} error={error} handleSubmit={handleSubmit} handleClose={handleClose} handleShow={handleShow} show={show} handleImage={handleImage} />
    </div>
  );
};

export default Register;
