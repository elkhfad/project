import { useState, useEffect } from 'react';
import AlertComponent from '../component/Alert/AlertComponent';
import { Spinner } from 'react-bootstrap';
import services from '../services/registerService';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ChooseIcon from '../component/Alert/ChooseIcon';
import ErrorHandler from '../component/Alert/ErrorHandler';
import Button from 'react-bootstrap/Button';
import { IoReturnDownBackOutline } from 'react-icons/io5';
const Account = () => {
  const [account, setAccount] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    street: '',
    postalCode: '',
    city: '',
  });
  const [accountOriginal, setAccountOriginal] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    postalCode: '',
    city: '',
  });
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const url = `http://localhost:3001/api/users`;
  useEffect(() => {
    services
      .getUser(url)
      .then((res) => {
        setIsPending(false);
        setAccount(res);
        setAccountOriginal(res);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setIsPending(false);
      });
  }, [url]);

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateAccount = {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      street: account.street,
      postalCode: account.postalCode,
      city: account.city,
    };

    setSuccess(null);
    if (
      updateAccount.firstName.length > 2 &&
      updateAccount.lastName.length > 4 &&
      updateAccount.email.length > 4 &&
      updateAccount.street.length > 3 &&
      updateAccount.postalCode.length > 3 &&
      updateAccount.city.length > 3
    ) {
      services
        .update(url, updateAccount)
        .then((res) => {
          setAccount(updateAccount);
          handleClose();
          setError(null);
          navigate('/');
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };
  const handleClose = () => {
    setAccount({
      firstName: accountOriginal.firstName,
      lastName: accountOriginal.lastName,
      email: accountOriginal.email,
      password: accountOriginal.password,
      street: accountOriginal.street,
      postalCode: accountOriginal.postalCode,
      city: accountOriginal.city,
    });
  };
  return (
    <div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
      <div>{success && <AlertComponent variant="success" header="" text={success} />}</div>

      <div>
        <div className="editAccountForm">
          <Form id="editAccountForm" onSubmit={handleSubmit}>
            <div>
              <div style={{ textAlign: 'left' }}>
                <Button style={{ float: 'right' }} className="returnToList" onClick={() => navigate('/')}>
                  Return <IoReturnDownBackOutline />
                </Button>
                <header style={{ textAlign: 'center' }}>Edit Account</header>
              </div>
              <label htmlFor="firstName">First name *</label>
              <div className="input-group">
                <input
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={account.firstName}
                  onChange={handleChange}
                  required
                  maxLength={50}
                  placeholder="Write your first name"
                  minLength={3}
                />
                <div className="input-group-addon">
                  <ChooseIcon value={account.firstName} min={3} />
                </div>
              </div>
              {<ErrorHandler min={3} value={account.firstName} text="First length is too short !  required 3 characters" />}
              <label htmlFor="lastName">Last name *</label>
              <div className="input-group">
                <input
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={account.lastName}
                  onChange={handleChange}
                  required
                  maxLength={50}
                  placeholder="Write your first name"
                  minLength={3}
                />
                <div className="input-group-addon">
                  <ChooseIcon value={account.lastName} min={3} />
                </div>
              </div>
              {<ErrorHandler min={5} value={account.lastName} text="First length is too short !  required 5 characters" />}
              <label htmlFor="email">email *</label>
              <div className="input-group">
                <input className="form-control" id="email" name="email" type="email" value={account.email} onChange={handleChange} required maxLength={50} placeholder="Your_email@email.com" />
                <div className="input-group-addon">
                  <ChooseIcon value={account.email} min={5} />
                </div>
              </div>
              {<ErrorHandler min={5} value={account.email} text="Title length is too short !  required 5 characters" />}

              <label htmlFor="city">City *</label>
              <div className="input-group">
                <input className="form-control" id="city" required name="city" type="text" value={account.city} onChange={handleChange} maxLength={50} placeholder="City" />
                <div className="input-group-addon">
                  <ChooseIcon value={account.city} min={4} />
                </div>
              </div>
              {<ErrorHandler min={4} value={account.city} text="City length is too short !  required 4 characters" />}

              <label htmlFor="street">Street *</label>
              <div className="input-group">
                <input className="form-control" id="street" name="street" type="text" required value={account.street} onChange={handleChange} maxLength={50} placeholder="Street" />
                <div className="input-group-addon">
                  <ChooseIcon value={account.street} min={4} />
                </div>
              </div>
              {<ErrorHandler min={4} value={account.street} text="Street length is too short !  required 4 characters" />}

              <label htmlFor="postalCode">Postal code *</label>
              <div className="input-group">
                <input
                  className="form-control"
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  required
                  value={account.postalCode}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="Your postal code"
                />
                <div className="input-group-addon">
                  <ChooseIcon value={account.postalCode} min={4} />
                </div>
              </div>
              {<ErrorHandler min={4} value={account.postalCode} text="Postal code length is too short !  required 4 characters" />}
            </div>
            <Button className="editAccount" type="submit">
              Save changes
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Account;
