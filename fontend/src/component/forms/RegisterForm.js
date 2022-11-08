import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AlertComponent from '../Alert/AlertComponent';
import ChooseIcon from '../Alert/ChooseIcon';
import ErrorHandler from '../Alert/ErrorHandler';
import Button from 'react-bootstrap/Button';

const RegisterForm = ({ error, handleSubmit, handleChange, signUp, handleShow, handleClose, show }) => {
  return (
    <div>
      <div>
        <button className="addNewItem" style={{ fontSize: '18px' }} onClick={handleShow}>
          Do you want to register ?
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <div>
            <header>Sign up</header>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="registerForm">
            <Form id="registerform" onSubmit={handleSubmit}>
              <div>
                <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>

                <label htmlFor="firstName">first name *</label>
                <div className="input-group">
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

                <label htmlFor="lastName">Last name *</label>
                <div className="input-group">
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

                <label htmlFor="email">email *</label>
                <div className="input-group">
                  <input className="form-control" id="email" name="email" type="email" value={signUp.email} onChange={handleChange} required maxLength={50} placeholder="Your_email@email.com" />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.email} min={5} />
                  </div>
                </div>
                {<ErrorHandler min={5} value={signUp.email} text="Title length is too short !  required 5 characters" />}

                <label htmlFor="password">password *</label>
                <div className="input-group">
                  <input className="form-control" id="password" name="password" type="password" value={signUp.password} onChange={handleChange} required maxLength={50} placeholder="Password" />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.password} min={8} />
                  </div>
                </div>
                {<ErrorHandler min={8} value={signUp.password} text="Password length is too short !  required 8 characters" />}

                <label htmlFor="city">City *</label>
                <div className="input-group">
                  <input className="form-control" id="city" required name="city" type="text" value={signUp.city} onChange={handleChange} maxLength={50} placeholder="City" />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.city} min={4} />
                  </div>
                </div>
                {<ErrorHandler min={4} value={signUp.city} text="City length is too short !  required 4 characters" />}

                <label htmlFor="street">Street *</label>
                <div className="input-group">
                  <input className="form-control" id="street" name="street" type="text" required value={signUp.street} onChange={handleChange} maxLength={50} placeholder="Street" />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.street} min={4} />
                  </div>
                </div>
                {<ErrorHandler min={4} value={signUp.street} text="Street length is too short !  required 4 characters" />}

                <label htmlFor="postalCode">Postal code *</label>
                <div className="input-group">
                  <input className="form-control" id="postalCode" name="postalCode" type="text" required value={signUp.postalCode} onChange={handleChange} maxLength={10} placeholder="Numbers only" />
                  <div className="input-group-addon">
                    <ChooseIcon value={signUp.postalCode} min={4} />
                  </div>
                </div>
                {<ErrorHandler min={4} value={signUp.postalCode} text="Postal code length is too short !  required 4 characters" />}
              </div>

              <Button className="addNewItem" type="submit">
                Send
              </Button>
              <Button className="addNewItem" onClick={handleClose}>
                Close
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RegisterForm;
