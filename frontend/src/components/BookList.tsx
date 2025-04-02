import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

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
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

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
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </>
  );
}

export default BookList;
