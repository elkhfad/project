import '../styles/itemlist.css';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../component/Pagination';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useGetAllItems } from '../component/control/itemsControll';
import { MdAddShoppingCart } from 'react-icons/md';
import cartService from '../services/cartsService';
import { Button } from 'react-bootstrap';
import AlertComponent from '../component/Alert/AlertComponent';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../services/currenUser';

const Shopping = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const url = 'http://localhost:3001/api/items/all';
  const cartUrl = 'http://localhost:3001/api/carts';
  const cartWishUrl = 'http://localhost:3001/api/carts/wishlist';
  const { data, isPending } = useGetAllItems(url);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(6);
  const [error, setError] = useState(null);
  const results = data.filter((result) => {
    return result.title.toUpperCase().includes(search.toUpperCase());
  });
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);
  const pageSizes = [3, 6, 9, 12, 20, 50, 100];
  const [cartdata, setCartData] = useState({});

  useEffect(() => {
    const getWishList = () => {
      cartService
        .getAllCartByUser(cartUrl)
        .then((res) => {
          if (!res.status === 'OK') {
            throw Error('could not load data');
          }
          const wishCard = res.find((r) => {
            return r.wish === true;
          });
          setCartData(wishCard);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    };
    getWishList();
  }, []);

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

  const buyItems = async (itemId) => {
    if (Object.keys(cartdata || {}).length > 0) {
      const itemsList = (cartdata.items || []).concat(itemId);
      const cart = {
        items: itemsList,
        time: cartdata.time,
        user: cartdata.user,
      };
      setCartData(cartdata);
      await cartService
        .update(cartWishUrl, cart)
        .then((res) => {
          setCartData(res);
          console.log(cartdata);
          setError(null);
          navigate('/');
        })
        .catch((err) => {
          setError(err.message);
        });
    } else if (Object.keys(cartdata || {}).length === 0) {
      setCartData(itemId);
      const createCart = {
        items: itemId,
      };
      cartService.create(cartUrl, createCart);
    }
  };

  return (
    <div>
      <div className="search">
        <input id="search" name="search" placeholder="search by title" onChange={handleSearch} value={search} />
      </div>
      {currentUser && <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>}
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
                      <div>
                        <img src={data.pic} alt="" width="250" height="250" />
                      </div>
                      <Card.Body>
                        <Card.Title className="cardTitleStyle">{data.title}</Card.Title>
                      </Card.Body>
                      {currentUser && (
                        <Button
                          className="addToShoppingCart"
                          onClick={() => {
                            buyItems(data.id);
                          }}
                        >
                          <MdAddShoppingCart style={{ fontSize: '2em' }} />
                        </Button>
                      )}
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
