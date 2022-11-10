import { useState, useEffect } from 'react';
import logInService from '../services/login';
import SignInForm from '../component/forms/SignInForm';

const SignIn = () => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const validation = () => {
      if (email.length > 4 && password.length > 7) {
        setValid(true);
      }
    };
    validation();
  });
  const handleLogin = async (e) => {
    e.preventDefault();

    if (valid) {
      try {
        const newUser = await logInService.login({
          email,
          password,
        });
        sessionStorage.setItem('currenUser', JSON.stringify(newUser));
        setEmail('');
        setPassword('');
        window.location.href = '/itemList';
      } catch (exception) {
        setError('Email or Password is wrong');
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <SignInForm handlePasswordChange={handlePasswordChange} handleEmailChange={handleEmailChange} email={email} password={password} error={error} handleLogin={handleLogin} />
    </div>
  );
};

export default SignIn;
