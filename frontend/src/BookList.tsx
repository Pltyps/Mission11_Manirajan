import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://localhost:5000/api/Book');
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h1>Book List</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard">
          <h3>{b.title}</h3>
          <ul>
            <li>
              <h3>Author: {b.author}</h3>
            </li>
            <li>
              <h3>Publisher: {b.publisher}</h3>
            </li>
            <li>
              <h3>ISBN: {b.isbn}</h3>
            </li>
            <li>
              <h3>Classification: {b.classification}</h3>
            </li>
            <li>
              <h3>Category: {b.category}</h3>
            </li>
            <li>
              <h3>Page Count: {b.pageCount}</h3>
            </li>
            <li>
              <h3>Price: ${b.price}</h3>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
