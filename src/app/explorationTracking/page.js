'use client';

import { useEffect, useState, useContext } from 'react';
import VerticalSpacing from '../../components/Layout/VerticalSpacing';

import { useSelector } from 'react-redux';
import enStrings from "../../resources/strings/en.json";
import frStrings from "../../resources/strings/fr.json";

export default function ExplorationTracking( {} ) {

  
const language = useSelector((state) => state.app.language);

const strings = language === "EN" ? enStrings : frStrings;

    return (
        <main className="pt-24 page">
            <div className="page-margins">
                <h1 className='text-lg font-bold pb-8'>{strings.personalizedExplorationTrackingTitle}</h1>

                <p>{strings.personalizedExplorationTrackingSummary}</p>

                <figure className='page-img-container'>
                    <img 
                    src='/PersonalizedExplorationTrackingScreenshot.PNG'
                    className='page-img'
                    alt='Screenshot from PersonalizedExplorationTrackingScreenshot.png'
                    />
                    <figcaption>{strings.personalizedExplorationTrackingCaption}</figcaption>
                </figure>

                <p className='pb-8'>{strings.personalizedExplorationTrackingParagraph1}</p>

                <p className='pb-8'>{strings.personalizedExplorationTrackingParagraph2}</p>

            </div>
        </main>
    ); 
}