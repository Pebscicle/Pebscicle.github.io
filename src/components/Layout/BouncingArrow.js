
import React from 'react';

import './BouncingArrow.css';

import arrowImage from '../../resources/img/icons/down-arrow.png';


function BouncingArrow( {handleArrowClick} ) {

  

  return(
    <div className='arrow-container' onClick={() => handleArrowClick()}>
        <img className="bouncing-arrow" src={arrowImage.src} alt="Down Arrow"></img>
    </div>
  );
}

export default BouncingArrow;