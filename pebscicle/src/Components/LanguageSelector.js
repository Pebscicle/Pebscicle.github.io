
import React, { useState } from 'react';

import './LanguageSelector.css';

//Images
import English from '../Resources/img/icons/flag-usa.svg';
import French from '../Resources/img/icons/flag-france.svg';

//const languageOptions = ["English", "French"];

function LanguageSelector( {handleSwitchLanguage, languageString} ) {

  //State Variables
  const [showLanguages, setShowLanguages] = useState(false);

  //Component Methods
  const toggleLanguageOptions = () => {
    setShowLanguages(!showLanguages);
  }

  //Render content
  return (
    <div className="language-selector">
        <button className="dropdown-button" onClick={toggleLanguageOptions}>{languageString}</button>
        {showLanguages && 
          <div className="language-dropdown">
            <img src={English} className="language-option" alt="English" 
            onClick={() => handleSwitchLanguage("EN")}/>

            <img src={French} className="language-option" alt="French" 
            onClick={() => handleSwitchLanguage("FR")}/>
          </div>}
    </div>
  );
}




export default LanguageSelector;