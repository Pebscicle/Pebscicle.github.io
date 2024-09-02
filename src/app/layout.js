'use client';

import { Inter } from "next/font/google";
import "./App.css";

import {useState} from 'react';
import { Provider } from 'react-redux';
import store from '../store/index';

//Import Strings
import enStrings from "../resources/strings/en.json";
import frStrings from "../resources/strings/fr.json";
import LanguageContext from "../components/LanguageContext";

import Footer from '../components/footer'
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  
  const [language, setLanguage] = useState("en");
  const strings = language === "en" ? enStrings : frStrings;

  return (
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta
            name="description"
            content="2024 Computer Science Graduate at the University of Stirling, Paul K. Davis' Personal Portfolio Website."
            />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          
            <title>Paul K. Davis - Portfolio</title>
        </head>
      <body className={inter.className}>
        <Provider store={store}>
        <div id='root'>
          <Navbar handleSwitchLanguage={(lang) => setLanguage(lang)} languageString={strings.languages} />
            
          {children}
            
          {/*<Footer></Footer>*/}
        </div>
        </Provider>
        </body>
    </html>
  );
}
