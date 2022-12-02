import { useState, useEffect } from 'react';
import service from '../services/itemservices';
import CreateItemForm from './forms/CreateItenForm';
const CreateItem = ({ data, setData }) => {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [addItem, setAddItem] = useState({
    title: '',
    comment: '',
    price: '',
    amount: '',
    pic: '',
  });
  const url = '/api/items';

  useEffect(() => {
    const validation = () => {
      if (addItem.title.length > 4 && addItem.comment.length > 9) {
        setValid(true);
      }
    };
    validation();
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...addItem,
      pic: image,
    };
    if (valid) {
      if (!data.map((da) => da.title).includes(addItem.title)) {
        service
          .create(url, newItem)
          .then((res) => {
            setData(data.concat(res));
            setImage(null);
            setError(null);
            setValid(false);
            handleClose();
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
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
      />
    </div>
  );
};

export default CreateItem;
