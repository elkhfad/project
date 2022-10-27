import { useState, useEffect } from 'react';
import service from '../services/services';
import Form from 'react-bootstrap/Form';
import AlertComponent from './Alert/AlertComponent';
import ErrorHandler from './Alert/ErrorHandler';
import ChooseIcon from './Alert/ChooseIcon';

const CreateItem = ({ data, setData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(null);
  const url = 'http://localhost:3001/items';

  useEffect(() => {
    const validation = () => {
      if (title.length > 4 && content.length > 9) {
        setValid(true);
      }
    };
    validation();
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: data.length + 1 + title,
      title: title,
      content: content,
    };
    if (valid) {
      setSuccess(null);
      if (!data.map((da) => da.title).includes(title)) {
        service
          .create(url, item)
          .then((res) => {
            if (!res.status === 'Created') {
              throw Error('could not add data');
            }
            setData(data.concat(res.data));
            setTitle('');
            setContent('');
            setError(null);
            setValid(false);
            setSuccess(`${title} Has been added successfully`);
          })
          .catch((err) => {
            setError(err.message);
          });
      } else {
        setError(`${title} exist`);
      }
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
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
              <input className="form-control" id="title" name="title" type="text" value={title} onChange={handleTitle} required maxLength={50} placeholder="Title" />
              <div className="input-group-addon">
                <ChooseIcon value={title} min={5} />
              </div>
            </div>
            {<ErrorHandler min={5} value={title} text="Title length is too short !  required 5 characters" />}
            <br />
            <div className="input-group">
              <label htmlFor="content">comment</label>
              <textarea className="form-control" id="content" name="content" type="text" value={content} onChange={handleContent} required maxLength={1500} placeholder="Write something" />
              <div className="input-group-addon">
                <ChooseIcon value={content} min={10} />
              </div>
            </div>
            <ErrorHandler min={10} value={content} text="Comment is too short ! required 10 characters" />
          </div>
          <br />
          <button className="addNewItem" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default CreateItem;
