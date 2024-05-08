'use client'

import React, { useState } from 'react';

import './LanguageSelector.css';

//Images
import English from '../resources/img/icons/flag-usa.svg';
import French from '../resources/img/icons/flag-france.svg';

//const languageOptions = ["English", "French"];

function LanguageSelector( {handleSwitchLanguage, languageString} ) {

  //State Variables
  const [showLanguages, setShowLanguages] = useState(false);

  //Component Methods
  const toggleLanguageOptions = () => {
    setShowLanguages(!showLanguages);
  }

  const prehandleSwitchLanguage = (lang) => {
    toggleLanguageOptions();
    handleSwitchLanguage(lang);
  }

  //Render content
  return (
    <div className="language-selector">
        <button className="dropdown-button" onClick={toggleLanguageOptions}>{languageString}</button>
        {showLanguages && 
          <div className="language-dropdown">
            <img src={English.src} className="language-option" alt="English" 
            onClick={() => prehandleSwitchLanguage("EN")}/>

            <img src={French.src} className="language-option" alt="French" 
            onClick={() => prehandleSwitchLanguage("FR")}/>
          </div>}
    </div>
  );
}




export default LanguageSelector;