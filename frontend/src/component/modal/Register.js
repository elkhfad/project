import registerServices from '../../services/registerService';
import RegisterForm from '../forms/RegisterForm';
import { useEffect, useState } from 'react';

const Register = () => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');
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
  const url = '/api/users';
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
      ...signUp,
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
          sessionStorage.setItem('image', JSON.stringify(image));
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    }
  };
  const removeImage = () => {
    setImage('');
    setSignUp({
      ...signUp,
      pic: image,
    });
    sessionStorage.setItem('image', JSON.stringify(''));
  };
  const handleChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setError('');
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
        setSignUp({
          ...signUp,
          pic: image,
        });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div>
      <RegisterForm
        handleChange={handleChange}
        signUp={signUp}
        error={error}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        handleImage={handleImage}
        removeImage={removeImage}
        image={image}
      />
    </div>
  );
};

export default Register;
