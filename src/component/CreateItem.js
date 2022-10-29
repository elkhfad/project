import { useState, useEffect } from 'react';
import service from '../services/services';
import CreateItemForm from './forms/CreateItenForm';
const CreateItem = ({ data, setData }) => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(null);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [addItem, setAddItem] = useState({
    title: '',
    content: '',
    price: '',
    amount: '',
    pic: '',
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
  const handleClose = () => {
    setAddItem({
      title: '',
      content: '',
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
      content: addItem.content,
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
            if (!res.status === 'Created') {
              throw Error('could not add data');
            }
            setData(data.concat(res.data));
            handleClose();
            setImage(null);
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
