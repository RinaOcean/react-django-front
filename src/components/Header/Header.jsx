import React from 'react'

import styles from './header.module.css'

const Header = (props) => {
  return (
    <div className={styles.container}>
      <h1 className="title">UCI</h1>
      <p className="description"> File download</p>
      {!props.isAuthenticated ?
         <button className={styles.btn} onClick={()=>props.login()}>Login</button>
      :  <button className={styles.btn} onClick={()=>props.logout()}>Logout</button>
      
    }
    </div>
  );
};

export default Header;
