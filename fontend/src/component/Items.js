import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { CiEdit } from 'react-icons/ci';
import { Link } from 'react-router-dom';
const Items = ({ data }) => {
  return (
    <div className={`${data.length > 0 && 'contain'}`}>
      {data.map((data) => {
        return (
          <div key={data.id}>
            <Card className="cardStyle">
              <div style={{ display: 'flex' }}>
                <Link to={`/items/${data.id}`}>
                  <div>
                    <button className="addNewItem">
                      <CiEdit className="editPen" />
                    </button>
                  </div>
                </Link>
              </div>
              <div>
                <img src={data.pic} alt="" width="250" height="250" />
              </div>
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
  );
};

export default Items;
