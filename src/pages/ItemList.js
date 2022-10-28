import service from '../services/services';
import { useState, useEffect } from 'react';
import CreateItem from '../component/CreateItem';
import '../styles/itemlist.css';
import { BsTrash } from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import Confirm from '../component/modal/Confirm';
import AlertComponent from '../component/Alert/AlertComponent';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';

const ItemList = () => {
  const [datas, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const url = 'http://localhost:3001/items';

  useEffect(() => {
    service
      .getAll(url)
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
  }, []);

  const handleDelete = (id, title) => {
    setSuccess(null);
    service
      .deleteItem(url, id)
      .then((res) => {
        if (!res.status === 'OK') {
          throw Error(`could not delete ${title}`);
        }
        setData(datas.filter((n) => n.id !== id));
        setError(null);
        setSuccess(`${title} Has been removed successfully`);
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

      <div className="addItem">
        <CreateItem data={datas} setData={setData} />
      </div>
      <div className={`${datas.length > 0 && 'contain'}`}>
        {datas.map((data) => {
          return (
            <div key={data.id}>
              <Card style={{ width: '12rem' }}>
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
                        handleDelete(data.id, data.title);
                      }}
                    />
                    <Link to={`/items/${data.id}`}>
                      <CiEdit />
                    </Link>
                  </div>
                </div>
                <Card.Img variant="top" src={data.pic} alt="" style={{ width: '8rem', margin: '0 auto' }} />
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text>{data.content}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <div style={{ display: 'flex' }}>Price: {`${data.price} \u20AC`}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>Amount: {data.amount}</ListGroup.Item>
                </ListGroup>
                <Card.Body></Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
