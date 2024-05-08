

import './ContentFlex.css';

import React from 'react';


function ContentFlex({children}) {
  return (
    <div className='content-flex-container'>
        {children}
    </div>
  );
}

export default ContentFlex;