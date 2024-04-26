'use client';

import { useEffect, useState } from 'react';
import VerticalSpacing from '../../components/Layout/VerticalSpacing';


export default function ExplorationTracking() {

    return (
        <main className="pt-24 page">
            <div className="page-margins">
                <h1 className='text-lg font-bold pb-8'>Personalized Exploration Tracking</h1>

                <p>
                    Personalized Exploration Tracking is a cross-platform React Native application I developed during
                     my senior year studying Computer Science at the University of Stirling. It was conceived
                     from start to finish following the software development cycle, from gathering the requirements,
                     the design, the implementation, and final testing.
                </p>

                <figure className='page-img-container'>
                    <img 
                    src='/PersonalizedExplorationTrackingScreenshot.png'
                    className='page-img'
                    alt='Screenshot from PersonalizedExplorationTrackingScreenshot.png'
                    />
                    <figcaption>Screenshot of the app's main page UI.</figcaption>
                </figure>

                <p className='pb-8'>
                    The purpose of the application is to enable a wider array of users to benefit from enhanced
                    means of visualizing and understanding one's exploration of the world.
                </p>

                <p className='pb-8'>
                    By allowing users to input custom origins and destinations, they are capable of generating a
                    "cumulative viewshed" between A and B, which simulates the visualizable areas along the given
                    generated route.
                </p>

            </div>
        </main>
    ); 
}