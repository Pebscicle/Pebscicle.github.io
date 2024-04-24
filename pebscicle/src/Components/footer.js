'use client';
 
import { useEffect, useState } from 'react';
import Link from 'next/link';
 
export default function Footer( {} ) {

    return(
        <div className='bg-slate-900'>
            <div className='text-sm px-16 py-8'>
                <div className='py-8 flex justify-between'>
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
                <p>Placeholder (Disclaimer). NTD (Kevin) Need to add a disclaimer (As Is, Where Is acceptance of any reports, etc. This is educational only. User is responsible for engaging competent professional to provide any advice customized for business.</p>
            </div>
        </div>
    );
  
}