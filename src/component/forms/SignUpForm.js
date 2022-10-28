import Form from 'react-bootstrap/Form';
import AlertComponent from '../Alert/AlertComponent';
import ChooseIcon from '../Alert/ChooseIcon';
import ErrorHandler from '../Alert/ErrorHandler';
import Register from '../modal/Register';
const SignInForm = ({ error, handleSubmit, handleChange, singIn }) => {
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
          <Register />
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
