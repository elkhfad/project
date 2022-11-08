import CreateItem from '../component/CreateItem';
import '../styles/itemlist.css';
import Spinner from 'react-bootstrap/Spinner';
import AlertComponent from '../component/Alert/AlertComponent';
import { useGetAllItems } from '../component/control/itemsControll';
import Pagination from '../component/Pagination';
import { useState } from 'react';
import Items from '../component/Items';

const ItemList = () => {
  const url = 'http://localhost:3001/api/items';
  const { data, error, isPending, setData } = useGetAllItems(url);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(12);
  const results = data.filter((result) => {
    return result.title.includes(search);
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

  return (
    <div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
      <div className="container mt-5">
        <div className="addItem" style={{ float: 'left' }}>
          <CreateItem data={data} setData={setData} />
        </div>
        <div className="search">
          <input id="search" name="search" placeholder="search by title" onChange={handleSearch} value={search} />
        </div>
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
        <h1 className="listTitle">My Items</h1>
        {data.length > 0 ? (
          <div>
            <div>
              <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={results.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
            <Items data={currentPosts} isPending={isPending} currentPage={currentPage} />
            <div>
              <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={results.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
          </div>
        ) : (
          <div className="infoItems">Your Item list is empty</div>
        )}
      </div>
    </div>
  );
};

export default ItemList;
