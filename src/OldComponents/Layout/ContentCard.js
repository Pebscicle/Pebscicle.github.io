

import './ContentCard.css';

import React from 'react';

const backgroundColor = "#93a7b4";

function ContentCard({children, isImage}) {
  return (
    <div className='content-card' style={{ backgroundColor: isImage ? "rgba(255, 255, 255, 0)" : backgroundColor }}>
        <div className='content-card-content'>
            {children}
        </div>
    </div>
  );
}

export default ContentCard;