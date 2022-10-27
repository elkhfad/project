import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ErrorHandler from '../Alert/ErrorHandler';
import AlertComponent from '../Alert/AlertComponent';
import ChooseIcon from '../Alert/ChooseIcon';
import { useEffect } from 'react';
import services from '../../services/services';

const ModalRegister = () => {
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [success, setSuccess] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPaswword] = useState('');
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [street, setStreet] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const url = 'http://localhost:3001/registers';

  useEffect(() => {
    const validation = () => {
      if (firstName.length > 2 && lastName.length > 4 && email.length > 4 && password.length > 7) {
        setValid(true);
      }
    };
    validation();
  }, [firstName, lastName, email, password, city, postalCode, street, error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const address = {
      street: street,
      postalCode: postalCode,
      city: city,
    };
    const register = {
      id: 1,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      address: address,
    };
    if (valid) {
      setSuccess(null);
      services
        .create(url, register)
        .then((res) => {
          console.log(res.status);
          if (!res.status === 'Created') {
            throw Error('could not add data');
          }
          setFirstName('');
          setLastName('');
          setEmail('');
          setPaswword('');
          setError(null);
          setValid(false);
          setPostalCode('');
          setCity('');
          setStreet('');
          setSuccess(`${firstName} Has been added successfully`);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPaswword(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleStreet = (e) => {
    setStreet(e.target.value);
  };
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };

  return (
    <div>
      <div>
        <button className="addNewItem" style={{ fontSize: '10px' }} onClick={handleShow}>
          Do you want to register ?
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div>
            <header>Sign up</header>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="registerForm">
            <Form id="registerform" onSubmit={handleSubmit}>
              <div>
                <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
                <div>{success && <AlertComponent variant="success" header="" text={success} />}</div>

                <div className="input-group">
                  <label htmlFor="firstName">first name</label>
                  <input
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={handleFirstName}
                    required
                    maxLength={50}
                    placeholder="Write your first name"
                  />
                  <div className="input-group-addon">
                    <ChooseIcon value={firstName} min={3} />
                  </div>
                </div>
                {<ErrorHandler min={3} value={firstName} text="First length is too short !  required 3 characters" />}
                <br />
                <div className="input-group">
                  <label htmlFor="lastName">Last name</label>
                  <input className="form-control" id="lastName" name="lastName" type="text" value={lastName} onChange={handleLastName} required maxLength={50} placeholder="Write your last name" />
                  <div className="input-group-addon">
                    <ChooseIcon value={lastName} min={5} />
                  </div>
                </div>
                {<ErrorHandler min={5} value={lastName} text="First length is too short !  required 5 characters" />}
                <br />
                <div className="input-group">
                  <label htmlFor="email">email</label>
                  <input className="form-control" id="email" name="email" type="email" value={email} onChange={handleEmail} required maxLength={50} placeholder="Your_email@email.com" />
                  <div className="input-group-addon">
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
                <div className="input-group">
                  <label htmlFor="city">City</label>
                  <input className="form-control" id="city" name="city" type="text" value={city} onChange={handleCity} required maxLength={50} placeholder="City" />
                  <div className="input-group-addon">
                    <ChooseIcon value={city} min={4} />
                  </div>
                </div>
                {<ErrorHandler min={4} value={city} text="City length is too short !  required 4 characters" />}
                <br />
                <div className="input-group">
                  <label htmlFor="street">Street</label>
                  <input className="form-control" id="city" name="street" type="text" value={street} onChange={handleStreet} required maxLength={50} placeholder="Street" />
                  <div className="input-group-addon">
                    <ChooseIcon value={street} min={5} />
                  </div>
                </div>
                {<ErrorHandler min={5} value={street} text="Street length is too short !  required 5 characters" />}
                <br />
                <div className="input-group">
                  <label htmlFor="postalCode">Postal code</label>
                  <input className="form-control" id="postalCode" name="postalCode" type="number" value={postalCode} onChange={handlePostalCode} required maxLength={50} placeholder="postalCode" />
                  <div className="input-group-addon">
                    <ChooseIcon value={postalCode} min={4} />
                  </div>
                </div>
                {<ErrorHandler min={4} value={postalCode} text="Postal code length is too short !  required 4 characters" />}
                <br />
              </div>
              <br />
              <button className="addNewItem" type="submit">
                Save Changes
              </button>
              <button className="addNewItem" onClick={handleClose}>
                Close
              </button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalRegister;
