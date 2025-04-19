import React from "react";
import { Link } from "react-router-dom";
import ApiService from "../service/ApiService";

const logout = () => {
  ApiService.logout();
};

const Sidebar = () => {
  const isAuth = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();

  return (
    <div className="sidebar">
      <h1 className="ims">IMS</h1>
      <ul className="nav-links">
        {isAdmin && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}

        {isAuth && (
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/category">Category</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/product">Product</Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link to="/supplier">Supplier</Link>
          </li>
        )}

        {isAdmin && (
          <li>
            <Link to="/client">Client</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/create_order">Generate Order</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}

        {isAuth && (
          <li>
            <Link onClick={logout} to="/login">
              Logout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;