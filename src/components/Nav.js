import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            Jobs Page
          </Link>
        </li>
        <li>
          <Link to="/new-project">
            New Project
          </Link>
        </li>
        <li>
          <Link to="/p2p">
            p2p test
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
