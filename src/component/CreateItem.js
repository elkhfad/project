import { useState, useEffect } from 'react';
import service from '../services/services';
import Form from 'react-bootstrap/Form';
import AlertComponent from './Alert/AlertComponent';
import ErrorHandler from './Alert/ErrorHandler';
import ChooseIcon from './Alert/ChooseIcon';

const CreateItem = ({ data, setData }) => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(null);
  const [addItem, setAddItem] = useState({
    title: '',
    content: '',
  });
  const url = 'http://localhost:3001/items';

  useEffect(() => {
    const validation = () => {
      if (addItem.title.length > 4 && addItem.content.length > 9) {
        setValid(true);
      }
    };
    validation();
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: data.length + 1 + addItem.title,
      title: addItem.title,
      content: addItem.content,
    };
    if (valid) {
      setSuccess(null);
      if (!data.map((da) => da.title).includes(addItem.title)) {
        service
          .create(url, item)
          .then((res) => {
            if (!res.status === 'Created') {
              throw Error('could not add data');
            }
            setData(data.concat(res.data));
            setAddItem({
              title: '',
              content: '',
            });
            setError(null);
            setValid(false);
            setSuccess(`${addItem.title} Has been added successfully`);
          })
          .catch((err) => {
            setError(err.message);
          });
      } else {
        setError(`${addItem.title} exist`);
      }
    }
  };

  const handleChange = (e) => {
    setAddItem({ ...addItem, [e.target.name]: e.target.value });
  };
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
          </div>
          <button className="addNewItem" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default CreateItem;
