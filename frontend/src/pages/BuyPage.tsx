import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: Number(price),
      quantity,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      {/* Add Bootstrap Container */}
      <div className="container mt-4">
        <h2 className="text-center mb-4">Purchase {title}</h2>
        <div className="row justify-content-center">
          {/* Quantity input with Bootstrap form styling */}
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                className="form-control"
                placeholder="Quantity"
                value={quantity}
                onChange={(x) => {
                  // Ensure the value is at least 1
                  const value = Math.max(1, Number(x.target.value));
                  setQuantity(value);
                }}
                min="1"
                step="1"
              />
            </div>
          </div>
        </div>
        {/* Button to Add to Cart */}
        <div className="d-flex justify-content-center mt-3">
          <button onClick={handleAddToCart} className="btn-success btn-lg">
            Add to Cart
          </button>
        </div>

        {/* Go Back Button */}
        <div className="d-flex justify-content-center mt-3">
          <button
            onClick={() => navigate(-1)}
            className="btn-dark btn-secondary btn-sm"
          >
            Go Back
          </button>
          {/* -1 says go back to whatever the previous page was */}
        </div>
      </div>
    </>
  );
}

export default BuyPage;
