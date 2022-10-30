import { useState } from 'react';
import { useEffect } from 'react';
import services from '../../services/services';
import RegisterForm from '../forms/RegisterForm';

const Register = () => {
  const [success, setSuccess] = useState('');
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
  const url = 'http://localhost:3001/api/registers';

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
  }, [signUp, error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('');
    if (valid) {
      services
        .create(url, signUp)
        .then((res) => {
          if (!res.status === 'Created') {
            throw Error('could not add data');
          }
          handleClose();
          setError(null);
          setValid(false);
          setSuccess(`${signUp.firstName} Has been added successfully`);
        })
        .catch((err) => {
          setError(err.message);
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
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div>
      <RegisterForm
        handleChange={handleChange}
        signUp={signUp}
        error={error}
        success={success}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        newSuccess={success}
      />
    </div>
  );
};

export default Register;
