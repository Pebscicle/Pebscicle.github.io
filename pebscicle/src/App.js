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
  //Layout components
  import Navbar from './Components/Navbar'
  import SubHeader from './Components/Layout/SubHeader';
  import ContentCard from './Components/Layout/ContentCard'
  import VerticalSpacing from './Components/Layout/VerticalSpacing';

function App() {

  //START: APP STATE VARIABLES

  const [language, setLanguage] = useState("en");
  const strings = language === "en" ? enStrings : frStrings;

  const [opacity, setOpacity] = useState(0);

  //END: APP STATE VARIABLES

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
        <Navbar></Navbar>

        <VerticalSpacing rows="5"></VerticalSpacing>

        <img src={smiley} className="App-logo" alt="logo" style={logoStyle} />
        <p>{strings.header}</p>
      </header>
      <div className='page-content' style={pageContentStyle}>

        <VerticalSpacing rows="5"></VerticalSpacing>

        <SubHeader>{strings.header}</SubHeader>
        <ContentCard></ContentCard>
      </div>
    </div>
  );




  
}

export default App;
