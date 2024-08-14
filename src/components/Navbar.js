'use client'

import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../actions/appActions';


import './Navbar.css';

import Link from 'next/link';
import './LanguageSelector'
import LanguageSelector from './LanguageSelector';


function Navbar( {languageString} ) {


  const dispatch = useDispatch();

  const language = useSelector((state) => state.app.language);

  const handleSwitchLanguage = (lang) => {
    //setLanguage(lang);
    // const handleModeChange = (event) => {
    dispatch(setLanguage(lang));
  };

  return (
    <nav className='navbar text-white'>
      <Link
        key={"home"}
        href={"/"}
        className=""
      >
        <span>Paul K. Davis</span>
      </Link>
        

        <LanguageSelector handleSwitchLanguage={(lang) => handleSwitchLanguage(lang)} languageString={language === 'EN' ? 'English Version' : 'Version Française'}></LanguageSelector>
    </nav>
  );
}


export default Navbar;

