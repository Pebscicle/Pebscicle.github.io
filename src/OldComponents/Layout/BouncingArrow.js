
import React from 'react';

import '../Layout/BouncingArrow.css';

import arrowImage from '../../Resources/img/icons/down-arrow.png';


function BouncingArrow( {handleArrowClick} ) {

  

  return(
    <div className='arrow-container' onClick={() => handleArrowClick()}>
        <img className="bouncing-arrow" src={arrowImage} alt="Down Arrow"></img>
    </div>
  );
}

export default BouncingArrow;