//Import React
import React, { useEffect, useState } from 'react';

//Import Strings
import enStrings from "./Resources/strings/en.json";
import frStrings from "./Resources/strings/fr.json";
//Import Images
import smiley from './Resources/img/Smiley.jpeg'
//Import style sheets
import './App.css';
//Import components
import SocialMedia from './Components/SocialMedia'
import EarthMap from './Components/EarthMap';
  //Layout components
  import Navbar from './Components/Navbar'
  import SubHeader from './Components/Layout/SubHeader';
  import ContentCard from './Components/Layout/ContentCard';
  import ContentFlex from './Components/Layout/ContentFlex';
  import VerticalSpacing from './Components/Layout/VerticalSpacing';
  //MUI Components
  import Alert from '@mui/material/Alert';

function App() {

  //START: APP STATE VARIABLES

  const [language, setLanguage] = useState("en");
  const strings = language === "en" ? enStrings : frStrings;

  const [opacity, setOpacity] = useState(0);

  const [showAlert, setShowAlert] = useState(false);

  //END: APP STATE VARIABLES

  //APP EVENTS:

  //Callback Methods
  const handleSwitchLanguage = (lang) => {
    let isEnglish = lang === "EN";
    console.log(isEnglish ? "Switched the language to English." : "La langue à été changé au Français.")

    setLanguage(isEnglish ? "en" : "fr");
    setShowAlert(true);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Calculate the scroll percentage
      const scrollPercentage = (scrollPosition / (viewportHeight / 4)) * 100;

      // Limit the opacity to a range between 0 and 100
      const newOpacity = Math.min(100, Math.max(0, scrollPercentage));

      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the logo size based on opacity
  const logoSize = 200 - opacity*2; // You can adjust this formula to control the scaling effect.


  const pageContentStyle = {
    opacity: opacity / 100, // Convert to a value between 0 and 1
  };

  // Apply the logo size style dynamically
  const logoStyle = {
    width: logoSize + 'px',
    height: logoSize + 'px',
  };


  return(    
    <div className="App">
      <header className="App-header header-background">
        <Navbar handleSwitchLanguage={(lang) => handleSwitchLanguage(lang)} languageString={strings.languages}></Navbar>
        <VerticalSpacing rows="5"></VerticalSpacing>

        <img src={smiley} className="App-logo" alt="logo" style={logoStyle} />
        <p>{strings.header}</p>
      </header>
      
      <div className='page-content' style={pageContentStyle}>
        
        <ContentFlex>
          <div className="App-text-content">
            <h2>{strings.aboutHeader}</h2>
            <p>{strings.about}</p>
            <SocialMedia languageString={strings.resume}></SocialMedia>
          </div>
          <ContentCard isImage={true}>
            <img src="https://www.treehugger.com/thmb/iayN8kOoAdb190hXrlG9KdZEb8Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2015__09__river-otters-lead-photo-86eef01e35714da9a6dd974f321e3504.jpg" width="65%" height="auto"></img>
          </ContentCard>
        </ContentFlex>
        
        <div className="App-text-content">
          <h2>{strings.whereFrom}</h2>
        </div>
        <ContentFlex>
          <EarthMap></EarthMap>
        </ContentFlex>
        
      </div>
      
      {showAlert && <Alert severity="success" className="App-alert" onClose={() => setShowAlert(false)}>{strings.languageSwitchedAlert}</Alert>}
    </div>
  );




  
}

export default App;
