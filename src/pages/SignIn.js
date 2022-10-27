import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import AlertComponent from '../component/Alert/AlertComponent';
import ChooseIcon from '../component/Alert/ChooseIcon';
import ModalRegister from '../component/modal/ModalRegister';
import ErrorHandler from '../component/Alert/ErrorHandler';
import services from '../services/services';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPaswword] = useState('');
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const url = 'http://localhost:3001/items';

  useEffect(() => {
    const validation = () => {
      if (email.length > 4 && password.length > 7) {
        setValid(true);
      }
    };
    validation();
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: 1,
      email: email,
      password: password,
    };
    if (valid) {
      services
        .create(url, item)
        .then((res) => {
          if (!res.status === 'Created') {
            throw Error('could not add data');
          }

          setEmail('');
          setPaswword('');
          setError(null);
          setValid(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPaswword(e.target.value);
  };

  return (
    <div>
      <div>
        <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
      </div>
      <div className="sigInForm">
        <Form id="sigInForm" onSubmit={handleSubmit}>
          <div>
            <header>Sign in</header>
            <div className="input-group">
              <label htmlFor="email">email</label>
              <input className="form-control" id="email" name="email" type="email" value={email} onChange={handleEmail} required maxLength={50} placeholder="Title" />
              <div className="input-group-addon">
                {' '}
                <ChooseIcon value={email} min={5} />
              </div>
            </div>
            {<ErrorHandler min={5} value={email} text="Title length is too short !  required 5 characters" />}
            <br />

            <div className="input-group">
              <label htmlFor="password">password</label>
              <input className="form-control" id="password" name="password" type="password" value={password} onChange={handlePassword} required maxLength={50} placeholder="Password" />
              <div className="input-group-addon">
                <ChooseIcon value={password} min={8} />
              </div>
            </div>
            {<ErrorHandler min={8} value={password} text="Password length is too short !  required 8 characters" />}
            <br />
          </div>
          <br />
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
