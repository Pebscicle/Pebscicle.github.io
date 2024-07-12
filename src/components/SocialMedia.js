
import React from 'react';

import './SocialMedia.css';

//Import Images
import github from '../resources/img/icons/socialMedia-github.png';
import linkedin from '../resources/img/icons/socialMedia-linkedin.png';
import email from '../resources/img/icons/socialMedia-email.png';
import resume from '../resources/img/icons/socialMedia-resume.png';


//<a href="https://www.flaticon.com/free-icons/github" title="github icons">Github icons created by riajulislam - Flaticon</a>

function SocialMedia( {lang} ) {

  const resumeLink = lang === 'en' ? "/Paul K. Davis Resume 2024.pdf" : "/cvPaulDavis.pdf";

  return (
    <div className='social-medias'>
        <a href="https://github.com/Pebscicle" target="_blank" title='Github'><img src={github.src} alt="Github" height="48" width="48"></img></a>
        <a href="https://www.linkedin.com/in/paul---davis/" target="_blank" title='LinkedIn'><img src={linkedin.src} alt="LinkedIn" height="48" width="48"></img></a>
        <a href="mailto:paul.davis438@gmail.com" title='Email'><img src={email.src} alt="Email" height="48" width="48"></img></a>
        {/*IMPLEMENT CONDITIONAL DOWNLOADING BASED ON THE SELECTED LANGUAGE*/}
        <a href={resumeLink} target="_blank" title='Resume/CV'><img src={resume.src} alt="Resume" height="48" width="48"></img></a>
    </div>
  );
}

export default SocialMedia;