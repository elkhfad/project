import { useState, useEffect } from 'react';
import service from '../services/itemservices';
import CreateItemForm from './forms/CreateItenForm';
const CreateItem = ({ data, setData }) => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(null);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [addItem, setAddItem] = useState({
    title: '',
    comment: '',
    price: '',
    amount: '',
    pic: '',
  });
  const url = 'http://localhost:3001/api/items';

  useEffect(() => {
    const validation = () => {
      if (addItem.title.length > 4 && addItem.comment.length > 9) {
        setValid(true);
      }
    };
    validation();
  });
  const handleClose = () => {
    setAddItem({
      title: '',
      comment: '',
      price: '',
      amount: '',
      pic: '',
    });
    setImage('');
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      title: addItem.title,
      comment: addItem.comment,
      price: addItem.price,
      amount: addItem.amount,
      pic: image,
    };
    if (valid) {
      setSuccess(null);
      if (!data.map((da) => da.title).includes(addItem.title)) {
        service
          .create(url, newItem)
          .then((res) => {
            setData(data.concat(res));
            handleClose();
            setImage(null);
            setError(null);
            setValid(false);
            setSuccess(`${addItem.title} Has been added successfully`);
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
      } else {
        setError(`${addItem.title} exist`);
      }
    }
  };

  const handleChange = (e) => {
    setAddItem({ ...addItem, [e.target.name]: e.target.value });
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
  return (
    <div>
      <CreateItemForm
        handleChange={handleChange}
        addItem={addItem}
        image={image}
        error={error}
        success={success}
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
    </div>
  );
};

export default CreateItem;
