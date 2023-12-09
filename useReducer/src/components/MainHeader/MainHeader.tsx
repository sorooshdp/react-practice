import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader : React.FC<any>  = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation  onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;