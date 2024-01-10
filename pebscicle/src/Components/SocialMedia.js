
import React from 'react';

import './SocialMedia.css';

//Import Images
import github from '../Resources/img/icons/socialMedia-github.gif';
import linkedin from '../Resources/img/icons/socialMedia-linkedin.png';
import email from '../Resources/img/icons/socialMedia-email.png';

function SocialMedia( {languageString} ) {

  

  return (
    <div className='social-medias'>
        <a href="https://github.com/Pebscicle" target="_blank"><img src={github}></img></a>
        <a href="https://www.linkedin.com/in/paul---davis/" target="_blank"><img src={linkedin}></img></a>
        <a href="mailto:paul.davis438@gmail.com"><img src={email}></img></a>
        <h2 style={{margin: "0px"}}>{languageString}</h2>
    </div>
  );
}

export default SocialMedia;