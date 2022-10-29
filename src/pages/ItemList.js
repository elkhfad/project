import service from '../services/services';
import { useState, useEffect } from 'react';
import CreateItem from '../component/CreateItem';
import '../styles/itemlist.css';
import Spinner from 'react-bootstrap/Spinner';
import AlertComponent from '../component/Alert/AlertComponent';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import EditItem from '../component/modal/EditItem';
const ItemList = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
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
  });

  return (
    <div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>
        {error && <AlertComponent variant="danger" header="You got an error!" text={error} />}
        <div>{data.length === 0 && <AlertComponent variant="warning" header="Your list is empty!" text="Start adding some items" />}</div>
      </div>

      <div className="addItem">
        <CreateItem data={data} setData={setData} />
      </div>
      <div className={`${data.length > 0 && 'contain'}`}>
        {data.map((data) => {
          return (
            <div key={data.id}>
              <Card className="cardStyle">
                <div style={{ display: 'flex' }}>
                  <div style={{ textAlign: 'left' }}>
                    <EditItem id={data.id} />
                  </div>
                </div>
                <Card.Img variant="top" src={data.pic} alt="" style={{ width: '8rem', margin: '0 auto' }} />
                <Card.Body>
                  <Card.Title className="cardTitleStyle">{data.title}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="listGroupItem">
                    <div style={{ display: 'flex' }}>Price: {`${data.price} \u20AC`}</div>
                  </ListGroup.Item>
                  <ListGroup.Item className="listGroupItem">Amount: {data.amount}</ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
