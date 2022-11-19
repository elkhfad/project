import CreateItem from '../component/CreateItem';
import '../styles/itemlist.css';
import Spinner from 'react-bootstrap/Spinner';
import { useGetAllItemsToUser } from '../component/control/itemsControll';
import Pagination from '../component/Pagination';
import { useState } from 'react';
import Items from '../component/Items';

const ItemList = () => {
  const url = 'http://localhost:3001/api/items';
  const { data, isPending, setData } = useGetAllItemsToUser(url);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(12);
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

  return (
    <div>
      <div className="search">
        <input id="search" name="search" placeholder="search by title" onChange={handleSearch} value={search} />
      </div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div className="container mt-5">
        <div className="addItem" style={{ float: 'left' }}>
          <CreateItem data={data} setData={setData} />
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
        <h2 className="listTitle">My Items</h2>
        {data.length > 0 ? (
          <div>
            <div>
              <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={results.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
            <Items data={currentPosts} />
            <div>
              <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={results.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
            <br />
          </div>
        ) : (
          <div className="infoItems">Your Item list is empty</div>
        )}
      </div>
    </div>
  );
};

export default ItemList;
