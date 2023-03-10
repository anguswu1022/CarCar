import { NavLink, Link } from "react-router-dom";

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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inventory
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="inventory/manufacturers">
                    Manufacturers List
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="inventory/manufacturers/new"
                  >
                    Create a Manufacturer
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="inventory/models">
                    Vehicle Model List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="inventory/models/new">
                    New Vehicle Model
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="inventory/automobiles">
                    Automobile List
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="inventory/automobiles/new"
                  >
                    New Automobile
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sales
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="sales/new">
                    New Sale
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="sales">
                    Sales List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="sales/history">
                    Sales Person History
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Appointments
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="appointments">
                    Appointment List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="appointments/new">
                    New appointment
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="appointments/history">
                    Appointment History
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales_persons/new">
                New Sales Person
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers/new">
                New Customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technician">
                New technician
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
