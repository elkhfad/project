import AlertComponent from '../component/Alert/AlertComponent';
import { Spinner } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ChooseIcon from '../component/Alert/ChooseIcon';
import ErrorHandler from '../component/Alert/ErrorHandler';
import Button from 'react-bootstrap/Button';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import { useAccountHandler } from '../component/control/useAccountHandle';
import { BsTrash } from 'react-icons/bs';

const Account = () => {
  const navigate = useNavigate();
  const { image, account, isPending, error, success, handleSubmit, handleChange, handleImage, removeImage } = useAccountHandler();
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
            <div className="input-group">
              <Image src={image} alt="It is empty" style={{ width: '8rem', margin: '0 auto' }} />
              <Button onClick={removeImage} className="removeImage">
                <BsTrash />
              </Button>
            </div>
            <div className="input-group">
              <input className="form-control" type="file" name="image" onChange={handleImage} accept="image/*" />
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
