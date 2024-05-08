
import React from 'react';

import './SocialMedia.css';

//Import Images
import github from '../Resources/img/icons/socialMedia-github.png';
import linkedin from '../Resources/img/icons/socialMedia-linkedin.png';
import email from '../Resources/img/icons/socialMedia-email.png';
import resume from '../Resources/img/icons/socialMedia-resume.png';


//<a href="https://www.flaticon.com/free-icons/github" title="github icons">Github icons created by riajulislam - Flaticon</a>

function SocialMedia( ) {

  return (
    <div className='social-medias'>
        <a href="https://github.com/Pebscicle" target="_blank"><img src={github} alt="Github" height="48" width="48"></img></a>
        <a href="https://www.linkedin.com/in/paul---davis/" target="_blank"><img src={linkedin} alt="LinkedIn" height="48" width="48"></img></a>
        <a href="mailto:paul.davis438@gmail.com"><img src={email} alt="Email" height="48" width="48"></img></a>
        <a href="https://www.google.com"><img src={resume} alt="Resume" height="48" width="48"></img></a>
    </div>
  );
}

export default SocialMedia;