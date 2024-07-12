'use client';
 
import { useEffect, useState } from 'react';
import Link from 'next/link';

import "../app/App.css"
 
export default function Footer( {} ) {

    return(
        <div className='bg-slate-900 mt-8'>
            <div className='text-sm px-16 py-8 text-white'>
                <div className='py-8 flex justify-between '>
                    <h2>
                        Legal
                    </h2>
                    <h2>
                    <Link
                        key={"privacy-policy"}
                        href={"/privacypolicy"}
                        className=""
                    >
                        <p>Privacy Policy</p>
                    </Link>
                        
                    </h2>
                </div>
                <p>Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. Placeholder Text. </p>
            </div>
        </div>
    );
  
}