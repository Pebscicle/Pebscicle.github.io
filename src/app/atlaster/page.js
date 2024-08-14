'use client';

import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import enStrings from "../../resources/strings/en.json";
import frStrings from "../../resources/strings/fr.json";

export default function Atlaster() {

    const language = useSelector((state) => state.app.language);

    const strings = language === "en" ? enStrings : frStrings;

    return (
        <main className="pt-24 page">
            <div className="page-margins">
                <h1 className='text-lg font-bold pb-8'>Atlaster</h1>

                <p>{strings.atlasterSummary}</p>

                <figure className='page-img-container'>
                    <img 
                    src='/AtlasterScreenshot.png'
                    className='page-img'
                    alt='Screenshot from Atlaster.com'
                    />
                    <figcaption>{strings.atlasterCaption}</figcaption>
                </figure>

            </div>
        </main>
    ); 
}