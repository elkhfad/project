import Form from 'react-bootstrap/Form';
import AlertComponent from '../Alert/AlertComponent';
import ChooseIcon from '../Alert/ChooseIcon';
import ErrorHandler from '../Alert/ErrorHandler';

const CreateItemForm = ({ success, error, handleSubmit, addItem, handleChange, handleImage }) => {
  return (
    <div>
      <div>
        <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
        <div>{success && <AlertComponent variant="success" header="" text={success} />}</div>
      </div>
      <div className="createForm">
        <Form id="form" onSubmit={handleSubmit}>
          <div>
            <header>Add items</header>
            <div className="input-group">
              <label htmlFor="title">title</label>
              <input className="form-control" id="title" name="title" type="text" value={addItem.title} onChange={handleChange} required maxLength={50} placeholder="Title" />
              <div className="input-group-addon">
                <ChooseIcon value={addItem.title} min={5} />
              </div>
            </div>
            <div className="errorHandle"> {<ErrorHandler min={5} value={addItem.title} text="Title length is too short !  required 5 characters" />}</div>
            <div className="input-group">
              <label htmlFor="content">comment</label>
              <textarea className="form-control" id="content" name="content" type="text" value={addItem.content} onChange={handleChange} required maxLength={1500} placeholder="Write something" />
              <div className="input-group-addon">
                <ChooseIcon value={addItem.content} min={10} />
              </div>
            </div>

            <ErrorHandler min={10} value={addItem.content} text="Comment is too short ! required 10 characters" />
            <div className="input-group">
              <label htmlFor="price">Price {'\u20A0'}</label>
              <input className="form-control" id="price" name="price" type="text" value={addItem.price} onChange={handleChange} required placeholder="How much it cost" />
              <div className="input-group-addon">
                <ChooseIcon value={addItem.price} min={1} />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="amount">Amount</label>
              <input className="form-control" id="amount" name="amount" type="number" value={addItem.amount} onChange={handleChange} required placeholder="How many pieces do you have" />
              <div className="input-group-addon">
                <ChooseIcon value={addItem.amount} min={1} />
              </div>
            </div>

            <div className="input-group">
              <input className="form-control" type="file" onChange={handleImage} accept="image/*" />
            </div>
          </div>
          <button className="addNewItem" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};
export default CreateItemForm;
