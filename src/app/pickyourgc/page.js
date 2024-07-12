'use client';

import { useEffect, useState, useContext } from 'react';

import enStrings from "../../resources/strings/en.json";
import frStrings from "../../resources/strings/fr.json";

import { useSearchParams } from 'next/navigation';

export default function PickYourGC() {

    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');

    const strings = lang === "en" ? enStrings : frStrings;

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