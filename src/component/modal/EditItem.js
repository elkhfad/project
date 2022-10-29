import { useState, useEffect } from 'react';
import AlertComponent from '../Alert/AlertComponent';
import { Spinner } from 'react-bootstrap';
import Confirm from './Confirm';
import { BsTrash } from 'react-icons/bs';
import services from '../../services/services';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ChooseIcon from '../Alert/ChooseIcon';
import ErrorHandler from '../Alert/ErrorHandler';
import { CiEdit } from 'react-icons/ci';
const EditItem = ({ id }) => {
  const [item, setItem] = useState({
    title: '',
    content: '',
    price: '',
    amount: '',
    pic: '',
  });
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const url = `http://localhost:3001/items/`;

  useEffect(() => {
    services
      .getById(url, id)
      .then((res) => {
        if (!res.status === 'OK') {
          throw Error('could not load data');
        }
        setIsPending(false);
        setItem(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id, url]);

  const handleDelete = () => {
    setSuccess(null);
    services
      .deleteItem(url, id)
      .then((res) => {
        if (!res.status === 'OK') {
          throw Error(`could not delete ${item.title}`);
        }
        setError(null);
        setSuccess(`${item.title} Has been removed successfully`);
        navigate('/itemList');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateItem = {
      title: item.title,
      content: item.content,
      price: item.price,
      amount: item.amount,
      pic: image || item.pic,
    };

    setSuccess(null);

    services
      .update(url, id, updateItem)
      .then((res) => {
        if (!res.status === 'OK') {
          throw Error('could not add data');
        }

        setItem(updateItem);
        handleClose();
        setImage(null);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
      <div>{success && <AlertComponent variant="success" header="" text={success} />}</div>

      <div>
        <div>
          <button className="addNewItem" style={{ fontSize: '10px' }} onClick={handleShow}>
            <CiEdit className="editPen" />
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <div>
              <header>
                Add item
                <div style={{ textAlign: 'left' }}>
                  <Confirm
                    icon={<BsTrash className="deleteBtn" />}
                    title={`Are you sure ?`}
                    body={`You won't be able to revert deleted item!`}
                    confirm="Yes delete it"
                    cancelColor="success"
                    confirmColor="danger"
                    buttonName="Delete"
                    buttonColor="danger"
                    itemDeleteBtn="itemDeleteBtn"
                    handleClick={() => {
                      handleDelete(item.id, item.title);
                    }}
                  />
                </div>
              </header>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="createItemForm">
              <Form id="createItemForm" onSubmit={handleSubmit}>
                <div>
                  <div className="input-group">
                    <label htmlFor="title">title</label>
                    <input className="form-control" id="title" name="title" type="text" value={item.title} onChange={handleChange} required maxLength={50} placeholder="Title" minLength={5} />
                    <div className="input-group-addon">
                      <ChooseIcon value={item.title} min={5} />
                    </div>
                  </div>
                  <div className="errorHandle"> {<ErrorHandler min={5} value={item.title} text="Title length is too short !  required 5 characters" />}</div>
                  <div className="input-group">
                    <label htmlFor="content">comment</label>
                    <textarea
                      className="form-control"
                      id="content"
                      name="content"
                      type="text"
                      value={item.content}
                      onChange={handleChange}
                      required
                      minLength={10}
                      maxLength={1500}
                      placeholder="Write something"
                    />
                    <div className="input-group-addon">
                      <ChooseIcon value={item.content} min={10} />
                    </div>
                  </div>

                  <ErrorHandler min={10} value={item.content} text="Comment is too short ! required 10 characters" />
                  <div className="input-group">
                    <label htmlFor="price">Price {'\u20AC'}</label>
                    <input className="form-control" id="price" name="price" type="text" value={item.price} onChange={handleChange} required placeholder="How much it cost" />
                    <div className="input-group-addon">
                      <ChooseIcon value={item.price} min={1} />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="amount">Amount</label>
                    <input className="form-control" id="amount" name="amount" type="number" value={item.amount} onChange={handleChange} required placeholder="How many pieces do you have" />
                    <div className="input-group-addon">
                      <ChooseIcon value={item.amount} min={1} />
                    </div>
                  </div>
                  <div className="input-group">
                    <img src={item.pic} alt="It is empty" style={{ width: '8rem', margin: '0 auto' }} />
                  </div>
                  <div className="input-group">
                    <input className="form-control" type="file" name="image" onChange={handleImage} accept="image/*" />
                  </div>
                </div>
                <button className="addNewItem" type="submit">
                  Submit
                </button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
export default EditItem;
