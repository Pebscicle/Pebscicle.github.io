'use client'

import React from 'react';

import './Navbar.css';

import Link from 'next/link';
import '../Components/LanguageSelector'
import LanguageSelector from '../Components/LanguageSelector';


function Navbar( {handleSwitchLanguage, languageString} ) {

  return (
    <nav className='navbar text-white'>
      <Link
        key={"home"}
        href={"/"}
        className=""
      >
        <span>Paul K. Davis</span>
      </Link>
        

        <LanguageSelector handleSwitchLanguage={(lang) => handleSwitchLanguage(lang)} languageString={languageString}></LanguageSelector>
    </nav>
  );
}

export default Navbar;