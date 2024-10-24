'use client';

import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import enStrings from "../../resources/strings/en.json";
import frStrings from "../../resources/strings/fr.json";

export default function Weatherster() {

    const language = useSelector((state) => state.app.language);

    const strings = language === "EN" ? enStrings : frStrings;

    return (
        <main className="pt-24 page">
            <div className="page-margins">
                <Link href='https://weatherster.vercel.app' target='_blank' style={{color: 'royalblue', textDecoration: 'underline', cursor: 'pointer'}}><h1 className='text-lg font-bold pb-8'>Weatherster</h1></Link>

                <p>{strings.weathersterSummary}</p>

                <figure className='page-img-container'>
                    <img 
                    src='/WeathersterScreenshot.png'
                    className='page-img'
                    alt='Screenshot from weatherster.vercel.app'
                    />
                    <figcaption>{strings.weathersterCaption}</figcaption>
                </figure>

            </div>
        </main>
    ); 
}