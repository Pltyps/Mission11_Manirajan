import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book?pageSize=${pageSize}&pageNum=${pageNum}`
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
  }, [pageSize, pageNum, totalItems, sortOrder]);

  return (
    <>
      <h1>Book List</h1>
      <br />
      <br />
      <button
        onClick={() =>
          setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
        }
      >
        Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>
      <br />
      <br />

      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h2 className="card-title">{b.title}</h2>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <h3>
                  <strong>Author: </strong>
                  {b.author}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Publisher: </strong>
                  {b.publisher}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>ISBN: </strong>
                  {b.isbn}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Classification: </strong>
                  {b.classification}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Category: </strong>
                  {b.category}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Page Count: </strong>
                  {b.pageCount}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Price: </strong>${b.price}
                </h3>
              </li>
            </ul>
          </div>
        </div>
      ))}

      <br />
      <br />
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
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
      </label>
    </>
  );
}

export default BookList;
