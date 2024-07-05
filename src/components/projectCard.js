'use client';
 
import { useEffect, useState } from 'react';
import Link from 'next/link';
 
export default function ProjectCard( {title, description, imgURL, link} ) {
    return (
        <div className='bg-gray-50 pb-4 rounded shadow-md flex justify-around flex-col'>
            <div>
                <div className='flex flex-col items-center bg-gray-500'>
                    <img 
                    src={imgURL}
                    style={{maxWidth: '100%', maxHeight: '250px', objectFit: 'contain'}}
                    alt={`Screenshot from ${imgURL}`}
                    />
                </div>
                <div className=''>
                    <h3 className='px-4 font-semibold text-lg py-2'>{title}</h3>
                    <p className='px-4 pb-4'>{description}</p>
                </div>
            </div>
            <div className='px-4'><Link
                key={`${link}`}
                href={`${link}`}
                className=""
            >
                <button className='float-right bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded'>Learn More</button>
            </Link></div>
        </div>
    );
}