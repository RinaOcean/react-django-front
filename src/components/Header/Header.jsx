import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../contex/AuthContex';

import styles from './header.module.css'

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
      <nav className={styles.container}>
          <div className={styles.titleWrapper}>
              <h1 className={styles.title}>UCI</h1>
              <p className={styles.desc}>medical affiliates</p>
          </div>

          {/* <p className="description"> File download</p> */}
          {user ? (
              <button onClick={logoutUser}>Logout</button>
          ) : (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
          )}
      </nav>
  );
};

export default Header;
