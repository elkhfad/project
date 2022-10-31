import { useState } from 'react';
import services from '../../services/services';
import CreateItemForm from '../forms/CreateItenForm';

const CreateItem = ({ data, setData }) => {
  const [success, setSuccess] = useState('');
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false);
  const [addItem, setAddItem] = useState({
    title: '',
    comment: '',
    price: '',
    amount: '',
    pic: '',
  });
  const url = 'http://localhost:3001/api/items';

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
  const handleShow = () => {
    setShow(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      title: addItem.title,
      comment: addItem.comment,
      price: addItem.price,
      amount: addItem.amount,
      pic: image,
    };

    if (addItem.title.length > 4 && addItem.comment.length > 9) {
      services
        .create(url, newItem)
        .then((res) => {
          if (res.status !== 'Created') {
            throw Error('could not add data');
          }
          setData(data.concat(res.data));
          handleClose();
          setImage('');
          setValid(false);
          setSuccess(`${addItem.title} Has been added successfully`);
        })
        .catch((err) => {
          setError(err.message);
        });
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
