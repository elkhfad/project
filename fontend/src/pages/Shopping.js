import '../styles/itemlist.css';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../component/Pagination';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useGetAllItems } from '../component/control/itemsControll';
import { MdAddShoppingCart } from 'react-icons/md';
import { useCurrentUser } from '../services/currenUser';
import cartService from '../services/cartsService';
const Shopping = () => {
  const url = 'http://localhost:3001/api/items/all';
  const cartUrl = 'http://localhost:3001/api/carts';
  const { data, isPending } = useGetAllItems(url);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(6);
  const [cart, setCart] = useState([{}]);
  const { currentUser } = useCurrentUser();

  const results = data.filter((result) => {
    return result.title.toUpperCase().includes(search.toUpperCase());
  });
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);
  const pageSizes = [3, 6, 9, 12, 20, 50, 100];
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePageSizeChange = (event) => {
    setPostPerPage(event.target.value);
    setCurrentPage(1);
  };
  const handleCart = (itemId) => {
    const newCart = {
      amount: 1,
      item: itemId,
    };

    setCart(cart.concat(newCart));
    cartService.create(cartUrl, cart).then((res) => {
      sessionStorage.setItem('cartList', JSON.stringify(cart));
    });
    console.log(cart);
  };

  return (
    <div>
      <div className="search">
        <input id="search" name="search" placeholder="search by title" onChange={handleSearch} value={search} />
      </div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div className="container mt-5">
        <div className="mt-3" style={{ float: 'right' }}>
          {'Items per Page: '}
          <select onChange={handlePageSizeChange} value={postsPerPage}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        {data.length > 0 && (
          <div>
            <div>
              <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={results.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
            <div className={`${data.length > 0 && 'contain'}`}>
              {currentPosts.map((data) => {
                return (
                  <div key={data.id}>
                    <Card className="cardStyle">
                      {currentUser && (
                        <div style={{ display: 'flex' }}>
                          <button
                            className="addToShoppingCart"
                            onClick={() => {
                              handleCart(data.id);
                            }}
                          >
                            <MdAddShoppingCart className="shoppingCart" />
                          </button>
                        </div>
                      )}
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
                        <ListGroup.Item className="listGroupItem">{data.amount} pcs</ListGroup.Item>

                        <ListGroup.Item className="listGroupItem">{data.comment}</ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </div>
                );
              })}
            </div>
            <div>
              <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={results.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
            <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default Shopping;
