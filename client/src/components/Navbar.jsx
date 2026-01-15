import { Link } from 'react-router-dom';
import './Navbar.css'; // We will style this below

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        ⚡ QuickPoll
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-item">Create New</Link>
        <Link to="/mypolls" className="nav-item">My Polls</Link>
      </div>
    </nav>
  );
};

export default Navbar;