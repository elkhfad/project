import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import AlertComponent from '../Alert/AlertComponent';
import { Spinner } from 'react-bootstrap';
import Confirm from './Confirm';
import { BsTrash } from 'react-icons/bs';
import ListGroup from 'react-bootstrap/ListGroup';
import services from '../../services/services';

const EditItem = () => {
  const { id } = useParams();
  const [datas, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const url = `http://localhost:3001/items/`;
  useEffect(() => {
    services
      .getById(url, id)
      .then((res) => {
        if (!res.status === 'OK') {
          throw Error('could not load data');
        }
        setIsPending(false);
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [url, id]);
  const handleDelete = () => {
    setSuccess(null);
    services
      .deleteItem(url, id)
      .then((res) => {
        if (!res.status === 'OK') {
          throw Error(`could not delete ${datas.title}`);
        }
        setData(datas.filter((n) => n.id !== id));
        setError(null);
        setSuccess(`${datas.title} Has been removed successfully`);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
      <div>{success && <AlertComponent variant="success" header="" text={success} />}</div>

      <div className={`${datas.length > 0 && 'contain'}`}>
        <div>
          <Card key={id} style={{ width: '12rem' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ textAlign: 'left' }}>
                <Confirm
                  icon={<BsTrash color={'red'} />}
                  title="Are you sure?"
                  body="You won't be able to revert this!"
                  confirm="Yes delete it"
                  cancelColor="success"
                  confirmColor="danger"
                  buttonName="Delete"
                  buttonColor="danger"
                  itemDeleteBtn="itemDeleteBtn"
                  handleClick={() => {
                    handleDelete(datas.id, datas.title);
                  }}
                />
              </div>
            </div>
            <Card.Img variant="top" src={datas.pic} alt="" style={{ width: '8rem', margin: '0 auto' }} />
            <Card.Body>
              <Card.Title>{datas.title}</Card.Title>
              <Card.Text>{datas.content}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <div style={{ display: 'flex' }}>Price: {`${datas.price} \u20AC`}</div>
              </ListGroup.Item>
              <ListGroup.Item>Amount: {datas.amount}</ListGroup.Item>
            </ListGroup>
            <Card.Body></Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default EditItem;
