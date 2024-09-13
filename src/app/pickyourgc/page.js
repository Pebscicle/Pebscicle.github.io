'use client';

import { useEffect, useState, useContext } from 'react';

import { useSelector } from 'react-redux';
import enStrings from "../../resources/strings/en.json";
import frStrings from "../../resources/strings/fr.json";

export default function PickYourGC() {


    const language = useSelector((state) => state.app.language);

    const strings = language === "EN" ? enStrings : frStrings;

    return (
        <main className="pt-24 page">
            <div className="page-margins">
                <h1 className='text-lg font-bold pb-8'>pickyourgc.com</h1>

                <p>{strings.pickyourgcSummary}</p>

                <figure className='page-img-container'>
                    <img 
                    src='/PickyourgcScreenshot.png'
                    className='page-img'
                    alt='Screenshot from pickyourgc.com'
                    />
                    <figcaption>{strings.pickyourgcCaption}</figcaption>
                </figure>

       

            </div>
        </main>
    ); 
}