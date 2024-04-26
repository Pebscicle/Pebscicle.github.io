'use client';

import { useEffect, useState } from 'react';

export default function PickYourGC() {

    return (
        <main className="pt-24 page">
            <div className="page-margins">
                <h1 className='text-lg font-bold pb-8'>pickyourgc.com</h1>

                <p>
                    DESCRIPTION
                </p>

                <figure className='page-img-container'>
                    <img 
                    src='/PickyourgcScreenshot.png'
                    className='page-img'
                    alt='Screenshot from pickyourgc.com'
                    />
                    <figcaption>Screenshot from pickyourgc.com .</figcaption>
                </figure>

       

            </div>
        </main>
    ); 
}