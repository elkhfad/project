import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ErrorHandler from '../Alert/ErrorHandler';
import AlertComponent from '../Alert/AlertComponent';
import ChooseIcon from '../Alert/ChooseIcon';
import { useEffect } from 'react';
import services from '../../services/services';

const ModalRegister = () => {
  const [success, setSuccess] = useState(null);
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
  const url = 'http://localhost:3001/registers';

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

    const signUpData = {
      id: 1,
      firstName: signUp.firstName,
      lastName: signUp.lastName,
      email: signUp.email,
      password: signUp.password,
      street: signUp.street,
      postalCode: signUp.postalCode,
      city: signUp.city,
    };

    if (valid) {
      setSuccess(null);
      services
        .create(url, signUpData)
        .then((res) => {
          if (!res.status === 'Created') {
            throw Error('could not add data');
          }
          setSignUp({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            street: '',
            postalCode: '',
            city: '',
          });
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                    value={signUp.firstName}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    placeholder="Write your first name"
                  />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.firstName} min={3} />
                  </div>
                </div>
                {<ErrorHandler min={3} value={signUp.firstName} text="First length is too short !  required 3 characters" />}

                <div className="input-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={signUp.lastName}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    placeholder="Write your last name"
                  />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.lastName} min={5} />
                  </div>
                </div>
                {<ErrorHandler min={5} value={signUp.lastName} text="First length is too short !  required 5 characters" />}

                <div className="input-group">
                  <label htmlFor="email">email</label>
                  <input className="form-control" id="email" name="email" type="email" value={signUp.email} onChange={handleChange} required maxLength={50} placeholder="Your_email@email.com" />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.email} min={5} />
                  </div>
                </div>
                {<ErrorHandler min={5} value={signUp.email} text="Title length is too short !  required 5 characters" />}

                <div className="input-group">
                  <label htmlFor="password">password</label>
                  <input className="form-control" id="password" name="password" type="password" value={signUp.password} onChange={handleChange} required maxLength={50} placeholder="Password" />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.password} min={8} />
                  </div>
                </div>
                {<ErrorHandler min={8} value={signUp.password} text="Password length is too short !  required 8 characters" />}

                <div className="input-group">
                  <label htmlFor="city">City</label>
                  <input className="form-control" id="city" required name="city" type="text" value={signUp.city} onChange={handleChange} maxLength={50} placeholder="City" />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.city} min={4} />
                  </div>
                </div>
                {<ErrorHandler min={4} value={signUp.city} text="City length is too short !  required 4 characters" />}

                <div className="input-group">
                  <label htmlFor="street">Street</label>
                  <input className="form-control" id="street" name="street" type="text" required value={signUp.street} onChange={handleChange} maxLength={50} placeholder="Street" />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.street} min={4} />
                  </div>
                </div>
                {<ErrorHandler min={4} value={signUp.street} text="Street length is too short !  required 4 characters" />}

                <div className="input-group">
                  <label htmlFor="postalCode">Postal code</label>
                  <input
                    className="form-control"
                    id="postalCode"
                    name="postalCode"
                    type="number"
                    required
                    value={signUp.postalCode}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="Numbers only"
                  />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.postalCode} min={4} />
                  </div>
                </div>
                {<ErrorHandler min={4} value={signUp.postalCode} text="Postal code length is too short !  required 4 characters" />}
              </div>

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
