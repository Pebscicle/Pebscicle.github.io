//Import React
import React, { useEffect, useState } from 'react';

//Import Images
import smiley from './Resources/img/Smiley.jpeg'
//Import style sheets
import './App.css';
//Import components
  //Layout components
  import SubHeader from './Components/Layout/SubHeader';
  import ContentCard from './Components/Layout/ContentCard'
  import VerticalSpacing from './Components/Layout/VerticalSpacing';

function App() {
  const [opacity, setOpacity] = useState(0);

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
        <img src={smiley} className="App-logo" alt="logo" style={logoStyle} />
        <p>Paul K. Davis - Portfolio Website</p>
      </header>
      <div className='page-content' style={pageContentStyle}>

        <VerticalSpacing rows="5"></VerticalSpacing>

        <SubHeader textContent="Test">{"Paul K. Davis"}</SubHeader>
        <ContentCard></ContentCard>
      </div>
    </div>
  );




  
}

export default App;
