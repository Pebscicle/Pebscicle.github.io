'use client'

import Image from "next/image";
import Link from 'next/link';

//Import Strings
import enStrings from "../resources/strings/en.json";
import frStrings from "../resources/strings/fr.json";
//Import Images
import smiley from '../resources/img/Smiley.jpeg'

//Import components
import SocialMedia from '../components/SocialMedia'
import EarthMap from '../components/EarthMap';
import MapGrid from '../components/MapGrid';

import Particle from '../components/Particles/Particle';
  //Layout components
  import Navbar from '../components/Navbar'
  import SubHeader from '../components/Layout/SubHeader';
  import BouncingArrow from '../components/Layout/BouncingArrow';
  import ContentCard from '../components/Layout/ContentCard';
  import ContentFlex from '../components/Layout/ContentFlex';
  import VerticalSpacing from '../components/Layout/VerticalSpacing';
  //MUI Components
  import Alert from '@mui/material/Alert';

import { useEffect, useState } from 'react';
import ProjectsGrid from "../components/projectsGrid";

export default function Home() {

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

  const handleArrowClick = () => {
    console.log("Arrow clicked");
    document.getElementById('page-content').scrollIntoView();
    window.scrollBy(0, -60);
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

  return (
    <main className="">
      <header className="App-header header-background">
        <Navbar handleSwitchLanguage={(lang) => handleSwitchLanguage(lang)} languageString={strings.languages}></Navbar>
        <VerticalSpacing rows="5"></VerticalSpacing>

        <img src={smiley.src} className="App-logo" alt="logo" style={logoStyle} />
        <p>{strings.header}</p>

      </header>
      <BouncingArrow handleArrowClick={() => handleArrowClick()} ></BouncingArrow>
      
      <div className='page'>
        <div id="page-content" className='page-content' style={pageContentStyle}>
          
          <ContentFlex>
            <div className="">
              <h1 className='text-2xl pb-2'>{strings.aboutHeader}</h1>
              <p>{strings.about}</p>
              <SocialMedia></SocialMedia>
            </div>
            <ContentCard isImage={true}>
              <img src="https://www.treehugger.com/thmb/iayN8kOoAdb190hXrlG9KdZEb8Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2015__09__river-otters-lead-photo-86eef01e35714da9a6dd974f321e3504.jpg" width="65%" height="auto"></img>
            </ContentCard>
          </ContentFlex>

          <VerticalSpacing rows="5"></VerticalSpacing>

          <ContentFlex>
            <div className="App-text-content">
              <h2>{strings.whereFrom}</h2>
            </div>
            {true ? <></> : <EarthMap></EarthMap>}
            <div style={{marginLeft:"10px"}}>
              <h3>Notable Places</h3>
              <ul>
                <li>Chicago</li>
                <li>Maryland</li>
                <li>Michigan</li>
                <li>France</li>
                <li>Scotland</li>
              </ul>
            </div>
          </ContentFlex>


          <div className="pt-8">
            <h2>{strings.whatDo}</h2>

            <h3 className="pt-24 pb-8">{strings.myProjects}</h3>

            <ProjectsGrid />

            <h3 className="pt-24">{strings.myInterests}</h3>

            <MapGrid />
          </div>
          



        </div>
      </div>
      
      {showAlert && <Alert severity="success" className="App-alert" onClose={() => setShowAlert(false)}>{strings.languageSwitchedAlert}</Alert>}

    </main>
  );
}
