import { NavLink } from "react-router-dom";

const navClass = ({ isActive }: { isActive: boolean }) =>
  "nav-link" + (isActive ? " active" : "");

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a className="navbar-brand" href="/">
          💳 <span>Expense Manager</span>
        </a>
        <div className="nav-links">
          <NavLink to="/"       end className={navClass}>Dashboard</NavLink>
          <NavLink to="/add"        className={navClass}>Add Expense</NavLink>
          <NavLink to="/upload"     className={navClass}>Upload CSV</NavLink>
        </div>
      </div>
    </nav>
  );
}