import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";
const NavBar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Github Repositories
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Link className="nav-link" to="/repositories">
                Repositories
              </Link>
              {!isAuthenticated ? (
                <Link className="nav-link" to="/auth">
                  {"Auth"}
                </Link>
              ) : (
                <Link
                  className="nav-link"
                  role="button"
                  to="/"
                  onClick={handleLogout}
                >
                  {"Logout"}
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
