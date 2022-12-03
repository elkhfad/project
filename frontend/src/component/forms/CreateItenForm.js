import Form from 'react-bootstrap/Form';
import ChooseIcon from '../Alert/ChooseIcon';
import ErrorHandler from '../Alert/ErrorHandler';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { BsTrash } from 'react-icons/bs';
import { IoAddCircleOutline } from 'react-icons/io5';
import AlertComponent from '../Alert/AlertComponent';
const CreateItemForm = ({ handleSubmit, addItem, handleChange, handleImage, handleShow, handleClose, show, image, success, isPending, error, removeImage }) => {
  return (
    <div>
      <div>{success && <AlertComponent variant="success" header="" text={success} />}</div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>{error && <AlertComponent variant="warning" header="" text={error} />}</div>

      <div>
        <button className="addNewItem" style={{ fontSize: '18px' }} onClick={handleShow}>
          Add item <IoAddCircleOutline />
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <br />
          <div>
            <header>Add item</header>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="createItemForm">
            <Form id="createItemForm" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">title *</label>
                <div className="input-group">
                  <input className="form-control" id="title" name="title" type="text" value={addItem.title} onChange={handleChange} required maxLength={50} minLength={5} placeholder="Title" />
                  <div className="input-group-addon">
                    <ChooseIcon value={addItem.title} min={5} />
                  </div>
                </div>
                <div className="errorHandle"> {<ErrorHandler min={5} value={addItem.title} text="Title length is too short" />}</div>
                <label htmlFor="comment">comment *</label>
                <div className="input-group">
                  <textarea
                    className="form-control"
                    id="comment"
                    name="comment"
                    type="text"
                    value={addItem.comment}
                    onChange={handleChange}
                    required
                    maxLength={1500}
                    minLength={10}
                    placeholder="Write something"
                  />
                  <div className="input-group-addon">
                    <ChooseIcon value={addItem.comment} min={10} />
                  </div>
                </div>

                <ErrorHandler min={10} value={addItem.comment} text="Comment is too short !" />
                <label htmlFor="price">Price {'\u20AC'} *</label>
                <div className="input-group">
                  <input className="form-control" id="price" name="price" type="number" step="0.001" value={addItem.price} onChange={handleChange} required placeholder="How much it cost" min="0" />
                </div>
                <div className="input-group">
                  <Image src={image} alt="" style={{ width: '8rem', margin: '0 auto' }} />
                  {image && (
                    <Button onClick={removeImage} className="removeImage">
                      <BsTrash />
                    </Button>
                  )}
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
  );
};
export default CreateItemForm;
