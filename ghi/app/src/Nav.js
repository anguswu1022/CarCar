import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales_persons/new">
                Add Sales Person
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers/new">
                Add Customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales">
                Sale List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/new">
                Add Sale
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales_history/">
                Sales History
              </NavLink>
            </li>
            <li>
            <NavLink className="navbar-brand" to="/technician">New technician</NavLink>
            </li>
            <li>
            <NavLink className="navbar-brand" to="/appointments/new">New appointment</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
