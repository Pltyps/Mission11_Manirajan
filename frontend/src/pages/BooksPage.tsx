import Fingerprint from '../components/Fingerprint';
import BookList from '../components/BookList';
import CookieConsent from 'react-cookie-consent';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';
import CartSummary from '../components/CartSummary';
import { Toast, ToastContainer } from 'react-bootstrap';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    //  Overall Div
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBand />
      <div className="row">
        <div className="col-md-2">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={handleCategoryChange}
          />
        </div>
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              <BookList selectedCategories={selectedCategories} />
            </div>
          </div>
        </div>
      </div>
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Fingerprint />

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg="white"
          className="border-success text-success" // Green text and border
        >
          <Toast.Header className="bg-success text-white">
            <strong className="me-auto">Category Selected</strong>
          </Toast.Header>
          <Toast.Body className="text-success">
            {selectedCategories} Filter applied successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
export default BooksPage;
