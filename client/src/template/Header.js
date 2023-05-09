import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { useHistory } from "react-router-dom";
function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const history = useHistory();
  let nameUser = localStorage.getItem("name");
  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }
  const [connected, setConnected] = useState(true);
  function logout() {
    localStorage.clear();
    setConnected(false);
    history.push("/");
  }

  function isUserLoggedIn() {
    let nameUser = localStorage.getItem("name");
    console.log(!(nameUser === null));
    return !(nameUser === null);
  }

  const renderAuthButton = () => {
    if (nameUser) {
      return (
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="userDropdown"
        >
          <li>
            <Link className="dropdown-item" onClick={logout}>
              Logout
            </Link>
          </li>
          <li>
            <a
              to="/profil"
              className="dropdown-item"
              href="http://localhost:3000/#/Profil"
            >
              Profil
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="userDropdown"
        >
          <li>
            <Link to="/signin" className="dropdown-item">
              Login
            </Link>
          </li>

          <li>
            <Link to="/signup" className="dropdown-item">
              Sign Up
            </Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <DirectionsCarFilledIcon />
            <span className="ms-2 h5">RENT-CAR</span>
          </Link>
          <div
            className={
              "navbar-collapse offcanvas-collapse " +
              (openedDrawer ? "open" : "")
            }
          >
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link" replace>
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AddProduct" className="nav-link" replace>
                  Add Car
                </Link>
              </li>
              <li className="nav-item">
                <div className="input-group">
                  {/* <input
                    className="form-control"
                    type="text"
                    placeholder="Search products..."
                    aria-label="search input"
                  /> */}
                  {/* <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button> */}
                </div>
              </li>
            </ul>

            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </a>

                {renderAuthButton()}
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <button
              className="navbar-toggler p-0 border-0 ms-3"
              type="button"
              onClick={toggleDrawer}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
