
import React from 'react';

import './Navbar.css';

import '../Components/LanguageSelector'
import LanguageSelector from '../Components/LanguageSelector';


function Navbar(props) {
  return (
    <nav className='navbar'>
        <p>idk content</p>

        <LanguageSelector></LanguageSelector>
    </nav>
  );
}

export default Navbar;