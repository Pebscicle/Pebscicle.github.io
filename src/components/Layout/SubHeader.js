// Header.js

import React from 'react';

import './SubHeader.css'

function SubHeader({children}) {
  return (
      <h1 className='sub-header'>
        {children}
      </h1>
  );
}

export default SubHeader;