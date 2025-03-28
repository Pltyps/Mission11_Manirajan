import 'bootstrap/dist/css/bootstrap.min.css';

function WelcomeBand() {
  return (
    <div className="container-fluid bg-dark text-white py-4 text-center shadow-lg">
      <h1 className="display-4 fw-bold">📚 Welcome to the Book Store 📚</h1>
      <p className="lead">
        Find your next great read from our vast collection!
      </p>
    </div>
  );
}

export default WelcomeBand;
