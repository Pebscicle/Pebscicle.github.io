'use client';

import { useEffect, useState, useContext } from 'react';
import VerticalSpacing from '../../components/Layout/VerticalSpacing';

import enStrings from "../../resources/strings/en.json";
import frStrings from "../../resources/strings/fr.json";

import { useSearchParams } from 'next/navigation';

export default function ExplorationTracking( {language} ) {

    

    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');

    const strings = lang === "en" ? enStrings : frStrings;

    return (
        <main className="pt-24 page">
            <div className="page-margins">
                <h1 className='text-lg font-bold pb-8'>{strings.personalizedExplorationTrackingTitle}</h1>

                <p>{strings.personalizedExplorationTrackingSummary}</p>

                <figure className='page-img-container'>
                    <img 
                    src='/PersonalizedExplorationTrackingScreenshot.png'
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