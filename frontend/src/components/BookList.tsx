import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/api/Book?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();

      //Sorting functionality
      let sortedBooks = [...data.catalogue];
      sortedBooks.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.title.localeCompare(b.title); //sort in ascending order
        } else {
          return b.title.localeCompare(a.title); //sort in descending order
        }
      });

      setBooks(sortedBooks);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortOrder, selectedCategories]);

  return (
    <>
      <button
        className="btn btn-dark text-white my-3"
        style={{ width: '80%' }} // Set width to 60% of the original width
        onClick={() =>
          setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
        }
      >
        Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      {/* Book Grid */}
      <div className="container-fluid">
        <div className="row">
          {books.map((b) => (
            <div className="col-lg-4 col-md-5 mb-2" key={b.bookID}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h2
                    className="card-title fs-4 text-dark text-center mb-3"
                    style={{ wordBreak: 'break-word' }}
                  >
                    <strong>{b.title}</strong>
                  </h2>
                  <ul className="list-unstyled text-start">
                    <li>
                      <strong>Author:</strong> {b.author}
                    </li>
                    <li>
                      <strong>Publisher:</strong> {b.publisher}
                    </li>
                    <li>
                      <strong>ISBN:</strong> {b.isbn}
                    </li>
                    <li>
                      <strong>Category:</strong> {b.category}
                    </li>
                    <li>
                      <strong>Page Count:</strong> {b.pageCount}
                    </li>
                    <li>
                      <strong>Price:</strong> ${b.price}
                    </li>
                  </ul>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-success w-80"
                      onClick={() =>
                        navigate(`/buy/${b.title}/${b.bookID}/${b.price}`)
                      }
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setPageNum(pageNum - 1)}
            >
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${pageNum === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setPageNum(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => setPageNum(pageNum + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Results per page dropdown */}
      <div className="text-center mt-3">
        <label className="form-label me-2">Results per page:</label>
        <select
          className="form-select w-auto d-inline"
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </>
  );
}

export default BookList;
