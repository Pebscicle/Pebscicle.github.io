'use client';
 
import { useEffect, useState } from 'react';
import ProjectCard from './projectCard';
 
export default function ProjectsGrid() {
    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            <ProjectCard 
            title={"Personalized Exploration Tracking App"}
            description={"A React Native application created in my final year for enhancing personalization when it comes to exploration."}
            imgURL={"/PersonalizedExplorationTrackingScreenshot.png"}
            link={'/explorationTracking'}
            /> 
            <ProjectCard 
            title={"pickyourgc.com"}
            description={"A Next.js website tailored for the needs of[x]"}
            imgURL={"/PickyourgcScreenshot.png"}
            link={'/pickyourgc'}
            /> 
            <div className='bg-gray-200 p-4'>Element 2</div>
            <div className='bg-gray-200 p-4'>Element 3</div>
        </div>
    );
}