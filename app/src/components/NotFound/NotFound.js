import React, { useState } from 'react';
import notFoundImage from '../../assets/images/not-found.png';
import styles from './NotFound.module.css';

export const NotFound = (props) => {
  const [hasError, setHasError] = useState(false);

  if(hasError){
    return (
      <div className={styles.container}>
        <div>
          <img src={notFoundImage} alt="404 not found" />
        </div>
        
        <div className={styles.column}>
          <h1>404: Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  try{
    return this.props.children;
  }
  catch (error) {
    setHasError(true);
    return null;
  }
}