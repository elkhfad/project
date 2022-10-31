import CreateItem from '../component/CreateItem';
import '../styles/itemlist.css';
import Spinner from 'react-bootstrap/Spinner';
import AlertComponent from '../component/Alert/AlertComponent';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { CiEdit } from 'react-icons/ci';

import { Link } from 'react-router-dom';
import { useGetAllItems } from '../component/controlla/itemsControll';
const ItemList = () => {
  const url = 'http://localhost:3001/api/items';

  const getAllItems = useGetAllItems(url);

  return (
    <div>
      <div>{getAllItems.isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>{getAllItems.error && <AlertComponent variant="danger" header="You got an error!" text={getAllItems.error} />}</div>

      <div className="addItem">
        <CreateItem data={getAllItems.data} setData={getAllItems.setData} />
      </div>
      <div className={`${getAllItems.data.length > 0 && 'contain'}`}>
        {getAllItems.data.map((data) => {
          return (
            <div key={data.id}>
              <Card className="cardStyle">
                <div style={{ display: 'flex' }}>
                  <Link to={`/items/${data.id}`}>
                    <div>
                      <button className="addNewItem" style={{ fontSize: '10px' }}>
                        <CiEdit className="editPen" />
                      </button>
                    </div>
                  </Link>
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
