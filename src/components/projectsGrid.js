'use client';

import { useContext } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import LanguageContext from '../components/LanguageContext';
import ProjectCard from './projectCard';

export default function ProjectsGrid() {
    const strings = useContext(LanguageContext);
    const currentLanguage = strings.currentLanguage;

    const projects = [
        {
            title: "atlaster.com",
            description: strings.atlasterDescription,
            imgURL: "/AtlasterScreenshot.png",
            link: `/atlaster?lang=${currentLanguage}`,
            hyperLink: 'https://www.atlaster.com',
            skills: ['HTML', 'CSS', 'tailwind', 'MUI', 'JavaScript', 'React.js', 'Next.js', 'Redux', 'Node', 'git', 'npm', 'PostgreSQL', 'SQL', 'Vercel', 'agile']
        },
        {
            title: "pickyourgc.com",
            description: strings.pickyourgcDescription,
            imgURL: "/PickyourgcScreenshot.png",
            link: `/pickyourgc?lang=${currentLanguage}`,
            hyperLink: 'https://www.pickyourgc.com',
            skills: ['HTML', 'CSS', 'tailwind', 'MUI', 'JavaScript', 'React.js', 'Next.js', 'git', 'npm', 'Vercel', 'Responsive']
        },
        {
            title: strings.personalizedExplorationTrackingTitle,
            description: strings.personalizedExplorationTrackingDescription,
            imgURL: "/PersonalizedExplorationTrackingScreenshot.PNG",
            link: `/explorationTracking?lang=${currentLanguage}`,
            hyperLink: '/explorationTracking',
            skills: ['Mobile Development', 'JavaScript', 'Java', 'Requirements Gathering', 'User Testing', 'OOP', 'APIs', 'Web Services', 'React Native', 'Google APIs', 'git', 'npm', 'Responsive', 'Cross-platform']
        }
    ];

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCardWithAnimation key={index} {...project} />
          ))}
        </div>
    );
}

function ProjectCardWithAnimation(props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            <ProjectCard {...props} />
        </motion.div>
    );
}