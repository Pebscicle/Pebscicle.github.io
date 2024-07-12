'use client';
 
import { useEffect, useState, useContext} from 'react';
import LanguageContext from '../components/LanguageContext';


import ProjectCard from './projectCard';

 
export default function ProjectsGrid() {

    const strings = useContext(LanguageContext);
    const currentLanguage = strings.currentLanguage;

    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            <ProjectCard 
            title={"atlaster.com"}
            description={strings.atlasterDescription}
            imgURL={"/AtlasterScreenshot.png"}
            link={`/atlaster?lang=${currentLanguage}`}
            hyperLink={'https://www.atlaster.com'}
            /> 
            <ProjectCard 
            title={"pickyourgc.com"}
            description={strings.pickyourgcDescription}
            imgURL={"/PickyourgcScreenshot.png"}
            link={`/pickyourgc?lang=${currentLanguage}`}
            hyperLink={'https://www.pickyourgc.com'}
            /> 
            <ProjectCard 
            title={strings.personalizedExplorationTrackingTitle}
            description={strings.personalizedExplorationTrackingDescription}
            imgURL={"/PersonalizedExplorationTrackingScreenshot.png"}
            link={`/explorationTracking?lang=${currentLanguage}`}
            hyperLink={'/explorationTracking'}
            /> 
        </div>
    );
}