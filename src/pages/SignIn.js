import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import AlertComponent from '../component/Alert/AlertComponent';
import ChooseIcon from '../component/Alert/ChooseIcon';
import ModalRegister from '../component/modal/ModalRegister';
import ErrorHandler from '../component/Alert/ErrorHandler';
import services from '../services/services';

const SignIn = () => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [singIn, setSignIn] = useState({
    email: '',
    password: '',
  });

  const url = 'http://localhost:3001/items';

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
    const newSignIn = {
      id: 1,
      email: singIn.email,
      password: singIn.password,
    };

    if (valid) {
      services
        .create(url, newSignIn)
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
      <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
      <div className="sigInForm">
        <Form id="sigInForm" onSubmit={handleSubmit}>
          <div>
            <header>Sign in</header>
            <div className="input-group">
              <label htmlFor="email">email</label>
              <input className="form-control" id="email" name="email" type="email" value={singIn.email} onChange={handleChange} required maxLength={50} placeholder="Title" />
              <div className="input-group-addon">
                <ChooseIcon value={singIn.email} min={5} />
              </div>
            </div>
            {<ErrorHandler min={5} value={singIn.email} text="Title length is too short !  required 5 characters" />}

            <div className="input-group">
              <label htmlFor="password">password</label>
              <input className="form-control" id="password" name="password" type="password" value={singIn.password} onChange={handleChange} required maxLength={50} placeholder="Password" />
              <div className="input-group-addon">
                <ChooseIcon value={singIn.password} min={8} />
              </div>
            </div>
            {<ErrorHandler min={8} value={singIn.password} text="Password length is too short !  required 8 characters" />}
          </div>

          <button className="addNewItem" type="submit">
            Submit
          </button>
          <ModalRegister />
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
