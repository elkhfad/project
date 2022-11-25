import Form from 'react-bootstrap/Form';
import AlertComponent from '../Alert/AlertComponent';
import ChooseIcon from '../Alert/ChooseIcon';
import ErrorHandler from '../Alert/ErrorHandler';
import Register from '../modal/Register';
const SignInForm = ({ error, handleLogin, handlePasswordChange, handleEmailChange, email, password }) => {
  return (
    <div>
      <div>{error && <AlertComponent variant="danger" header="Error occurred, Please check details" text={error} />}</div>
      <div className="sigInForm">
        <Form id="sigInForm" onSubmit={handleLogin}>
          <div>
            <header>Sign in</header>
            <div className="email">
              <label htmlFor="email">email *</label>
            </div>
            <div className="input-group">
              <input className="form-control" id="email" name="email" type="email" value={email} onChange={handleEmailChange} required maxLength={50} placeholder="Your email" />
              <div className="input-group-addon">
                <ChooseIcon value={email} min={5} />
              </div>
            </div>
            {<ErrorHandler min={5} value={email} text="Title is short!  min 5 characters required" />}

            <div className="email">
              <label htmlFor="password">password *</label>
            </div>
            <div className="input-group">
              <input className="form-control" id="password" name="password" type="password" value={password} onChange={handlePasswordChange} required maxLength={50} placeholder="Password" />
              <div className="input-group-addon">
                <ChooseIcon value={password} min={8} />
              </div>
            </div>
            {<ErrorHandler min={8} value={password} text="Password length is too short !  min 8 characters required" />}
          </div>

          <button className="addNewItem" type="submit">
            Submit
          </button>
        </Form>
        <Register />
      </div>
    </div>
  );
};

export default SignInForm;
