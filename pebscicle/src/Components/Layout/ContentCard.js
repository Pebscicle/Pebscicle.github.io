

import './ContentCard.css';

import React from 'react';


function ContentCard(props) {
  return (
    <div className='content-card'>
        <div className='content-card-content'>
            <p>My name is Paul</p>
        </div>
        <div className='content-card-content'>
            <p>Hello</p>
        </div>
    </div>
  );
}

export default ContentCard;