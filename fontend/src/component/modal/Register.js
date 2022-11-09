import { useState } from 'react';
import { useEffect } from 'react';
import registerServices from '../../services/registerService';
import RegisterForm from '../forms/RegisterForm';

const Register = () => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [show, setShow] = useState(false);

  const [signUp, setSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    street: '',
    postalCode: '',
    city: '',
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
    if (valid) {
      registerServices
        .create(url, signUp)
        .then((res) => {
          handleClose();
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
    });
    setError('');
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div>
      <RegisterForm handleChange={handleChange} signUp={signUp} error={error} handleSubmit={handleSubmit} handleClose={handleClose} handleShow={handleShow} show={show} />
    </div>
  );
};

export default Register;
