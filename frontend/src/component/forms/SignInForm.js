import Form from 'react-bootstrap/Form';
import AlertComponent from '../Alert/AlertComponent';
import ChooseIcon from '../Alert/ChooseIcon';
import ErrorHandler from '../Alert/ErrorHandler';
import Register from '../modal/Register';
const SignInForm = ({ error, handleLogin, handlePasswordChange, handleEmailChange, email, password }) => {
  return (
    <div>
      <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
      <div className="sigInForm">
        <Form id="sigInForm" onSubmit={handleLogin}>
          <div>
            <header>Sign in</header>
            <div className="email">
              <label htmlFor="email">email *</label>
            </div>
            <div className="input-group">
              <input className="form-control" id="email" name="email" type="email" value={email} onChange={handleEmailChange} required maxLength={50} placeholder="Your email" autoComplete="on" />
              <div className="input-group-addon">
                <ChooseIcon value={email} min={5} />
              </div>
            </div>
            {<ErrorHandler min={5} value={email} text="Title length is too short" />}

            <div className="email">
              <label htmlFor="password">password *</label>
            </div>
            <div className="input-group">
              <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                maxLength={50}
                placeholder="Password"
                autoComplete="on"
              />
              <div className="input-group-addon">
                <ChooseIcon value={password} min={8} />
              </div>
            </div>
            {<ErrorHandler min={8} value={password} text="Password length is too short" />}
          </div>

          <button className="addNewItem" type="submit">
            Send
          </button>
        </Form>
        <Register />
      </div>
    </div>
  );
};

export default SignInForm;
