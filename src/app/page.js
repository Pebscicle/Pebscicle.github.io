'use client'

import Image from "next/image";
import Link from 'next/link';

import { useMediaQuery } from "@mui/material";

//Import Strings
import enStrings from "../resources/strings/en.json";
import frStrings from "../resources/strings/fr.json";
import LanguageContext from "../components/LanguageContext";
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

import { useEffect, useState, createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectsGrid from "../components/projectsGrid";
import LandingView from "../components/LandingView";

export default function Home() {

    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:768px)');
    const language = useSelector((state) => state.app.language);
    const [strings, setStrings] = useState(enStrings);

    const [opacity, setOpacity] = useState(0);

    const [showAlert, setShowAlert] = useState(false);

  //END: APP STATE VARIABLES

  //APP EVENTS:

  //Callback Methods
  /*const handleSwitchLanguage = (lang) => {
    let isEnglish = lang === "EN";
    console.log(isEnglish ? "Switched the language to English." : "La langue à été changé au Français.")

    setLanguage(isEnglish ? "en" : "fr");
    setShowAlert(true);
  }*/

  // Callback Methods
  /*const handleSwitchLanguage = (lang) => {
    let isEnglish = lang === "EN";
    console.log(isEnglish ? "Switched the language to English." : "La langue à été changé au Français.");

    dispatch({ type: 'SET_LANGUAGE', payload: isEnglish ? "en" : "fr" });
    setShowAlert(true);
  };*/

  const handleArrowClick = () => {
    console.log("Arrow clicked");
    document.getElementById('page-start').scrollIntoView();
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

  //Whenver language changes
  useEffect(() => {
    const theStrings = language === "EN" ? enStrings : frStrings;
    setStrings(theStrings);

  }, [language])

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
    <main>
      <LanguageContext.Provider value={strings}>

      <LandingView 
        
      />

      <BouncingArrow handleArrowClick={() => handleArrowClick()} ></BouncingArrow>
      
      <div className="bg-gray-100 sm:p-4 md:p-8 lg:p-12" id='page-start'>
          <ContentFlex>
            <article style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <div style={{maxWidth: isMobile ? '95vw' : '800px'}}>
                <h1 className='text-2xl pb-2 font-semibold flex justify-center'>{strings.aboutHeader}</h1>
                <div className='flex justify-center pt-8 pb-16'> <img src={'/pauldavis.png'} alt='Headshot of Paul Davis' height={100} width={100} className='rounded-full'/> </div>
                {strings.about.map((para, index) => (
                  <p key={index} className='glossy-container text-justify'>{para}</p>
                ))}
                <h6>{strings.contact}</h6>
                <SocialMedia lang={language}></SocialMedia>
              </div>
            </article>
          </ContentFlex>

          <VerticalSpacing rows="5"></VerticalSpacing>

          <div className="pt-8" id='projects'>

            <h3 className="pt-2 pb-8 text-xl font-bold">{strings.myProjects}</h3>

            <ProjectsGrid />

          </div>

          <VerticalSpacing rows="5"></VerticalSpacing>

      </div>

      {showAlert && <Alert severity="success" className="App-alert" onClose={() => setShowAlert(false)}>{strings.languageSwitchedAlert}</Alert>}
      </LanguageContext.Provider>
    </main>
  );
}
