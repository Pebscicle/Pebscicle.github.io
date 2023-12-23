

import './ContentGrid.css';

import React from 'react';


function ContentGrid(props) {
  return (
    <div className='content-grid'>
        <div className='content-card-content'>
            <p>My name is Paul</p>
        </div>
        <div className='content-card-content'>
            <p>Hello</p>
        </div>
    </div>
  );
}

export default ContentGrid;