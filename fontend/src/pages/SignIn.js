import { useState, useEffect } from 'react';
import itemService from '../services/itemservices';
import logInService from '../services/login';
import SignInForm from '../component/forms/SignInForm';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        setEmail('');
        setPassword('');
        sessionStorage.setItem('currenUser', JSON.stringify(newUser));
        itemService.setToken(newUser.token);
        navigate('/itemList');
      } catch (exception) {
        setError('wrong credentials');
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
