'use client';

import { useEffect, useState, useContext } from 'react';

import enStrings from "../../resources/strings/en.json";
import frStrings from "../../resources/strings/fr.json";

import { useSearchParams } from 'next/navigation';

export default function Atlaster() {

    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');

    const strings = lang === "en" ? enStrings : frStrings;

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