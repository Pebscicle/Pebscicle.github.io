
import React from 'react';

import './Navbar.css';

import '../Components/LanguageSelector'
import LanguageSelector from '../Components/LanguageSelector';


function Navbar( {handleSwitchLanguage, languageString} ) {

  

  return (
    <nav className='navbar'>
        <p>Paul K. Davis</p>

        <LanguageSelector handleSwitchLanguage={(lang) => handleSwitchLanguage(lang)} languageString={languageString}></LanguageSelector>
    </nav>
  );
}

export default Navbar;