import { useState, useEffect } from 'react';
import AlertComponent from '../Alert/AlertComponent';
import { Spinner } from 'react-bootstrap';
import Confirm from './Confirm';
import { BsTrash } from 'react-icons/bs';
import services from '../../services/itemservices';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ChooseIcon from '../Alert/ChooseIcon';
import ErrorHandler from '../Alert/ErrorHandler';
import Button from 'react-bootstrap/Button';
import { IoReturnDownBackOutline } from 'react-icons/io5';
const EditItem = () => {
  const [item, setItem] = useState({
    title: '',
    comment: '',
    price: '',
    amount: '',
    pic: '',
  });
  const [itemOriginal, setItemOriginal] = useState({
    title: '',
    comment: '',
    price: '',
    amount: '',
    pic: '',
  });
  const { id } = useParams();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const url = `http://localhost:3001/api/items`;

  useEffect(() => {
    services
      .getById(url, id)
      .then((res) => {
        setIsPending(false);
        setItem(res.data);
        setItemOriginal(res);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setIsPending(false);
      });
  }, [id, url]);

  const handleDelete = () => {
    setSuccess(null);
    services.deleteItem(url, id).then((res) => {
      setSuccess(`${item.title} Has been removed successfully`);
      navigate('/itemList');
    });
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setItem({
          title: item.title,
          comment: item.comment,
          price: item.price,
          amount: item.amount,
          pic: reader.result,
        });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateItem = {
      title: item.title,
      comment: item.comment,
      price: item.price,
      amount: item.amount,
      pic: item.pic,
    };

    setSuccess(null);
    if (updateItem.title.length > 4 && updateItem.comment.length > 9) {
      services
        .update(url, id, updateItem)
        .then((res) => {
          setItem(res);
          handleClose();
          setError(null);
          navigate('/itemList');
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };
  const handleClose = () => {
    setItem({
      title: itemOriginal.title,
      comment: itemOriginal.comment,
      price: itemOriginal.price,
      amount: itemOriginal.amount,
      pic: itemOriginal.pic,
    });
  };
  return (
    <div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
      <div>{success && <AlertComponent variant="success" header="" text={success} />}</div>

      <div>
        <div className="editItemForm">
          <Form id="editItemForm" onSubmit={handleSubmit}>
            <div style={{ textAlign: 'left' }}>
              <Confirm
                icon={<BsTrash />}
                title={`Are you sure ?`}
                body={`You won't be able to revert deleted item!`}
                confirm="Yes delete it"
                cancelColor="success"
                confirmColor="danger"
                buttonName="Delete"
                itemDeleteBtn="itemDeleteBtn"
                handleClick={() => {
                  handleDelete(item.id, item.title);
                }}
              />
              <Button style={{ float: 'right' }} className="returnToList" onClick={() => navigate('/itemList')}>
                Return <IoReturnDownBackOutline />
              </Button>
              <header style={{ textAlign: 'center' }}>Edit Item</header>
            </div>
            <div>
              <label htmlFor="title">title *</label>
              <div className="input-group">
                <input className="form-control" id="title" name="title" type="text" value={item.title} onChange={handleChange} required maxLength={50} placeholder="Title" minLength={5} />
                <div className="input-group-addon">
                  <ChooseIcon value={item.title} min={5} />
                </div>
              </div>
              <div className="errorHandle"> {<ErrorHandler min={5} value={item.title} text="Title length is too short !  required 5 characters" />}</div>
              <label htmlFor="comment">comment *</label>
              <div className="input-group">
                <textarea
                  className="form-control"
                  id="comment"
                  name="comment"
                  type="text"
                  value={item.comment}
                  onChange={handleChange}
                  required
                  maxength={1500}
                  minLength={10}
                  placeholder="Write something"
                />
                <div className="input-group-addon">
                  <ChooseIcon value={item.comment} min={10} />
                </div>
              </div>

              <ErrorHandler min={10} value={item.comment} text="Comment is too short ! required 10 characters" />
              <label htmlFor="price">Price {'\u20AC'} *</label>
              <div className="input-group">
                <input className="form-control" id="price" name="price" type="number" step="0.001" value={item.price} onChange={handleChange} required placeholder="How much it cost" />
              </div>

              <label htmlFor="amount">Amount *</label>
              <div className="input-group">
                <input className="form-control" id="amount" style={{ width: '12px' }} name="amount" type="number" value={item.amount} onChange={handleChange} required placeholder="Amount of pieces" />
              </div>
              <div className="input-group">
                <img src={item.pic} alt="It is empty" style={{ width: '8rem', margin: '0 auto' }} />
              </div>
              <div className="input-group">
                <input className="form-control" type="file" name="image" onChange={handleImage} accept="image/*" />
              </div>
            </div>
            <Button className="addNewItem" type="submit">
              Save changes
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default EditItem;
