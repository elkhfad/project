import { useState, useEffect } from 'react';
import services from '../services/services';
import SignInForm from '../component/forms/SignInForm';

const SignIn = () => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [singIn, setSignIn] = useState({
    email: '',
    password: '',
  });

  const url = 'http://localhost:3001/api/items';

  useEffect(() => {
    const validation = () => {
      if (singIn.email.length > 4 && singIn.password.length > 7) {
        setValid(true);
      }
    };
    validation();
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (valid) {
      services
        .create(url, singIn)
        .then((res) => {
          if (!res.status === 'Created') {
            throw Error('could not add data');
          }

          setSignIn({
            email: '',
            password: '',
          });
          setError(null);
          setValid(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const handleChange = (e) => {
    setSignIn({ ...singIn, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <SignInForm handleChange={handleChange} singIn={singIn} error={error} handleSubmit={handleSubmit} />
    </div>
  );
};

export default SignIn;
