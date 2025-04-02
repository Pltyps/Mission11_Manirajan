import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

// Additonal Bootstrap stuff
import { Table } from 'react-bootstrap'; // Bootstrap components

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Add Total Calulation
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          // Changed list to bootstrap table
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price per Item</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: CartItem) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => removeFromCart(item.bookID)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      <button className="btn-success">Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Shopping</button>
    </div>
  );
}

export default CartPage;
