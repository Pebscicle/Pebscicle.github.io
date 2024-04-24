
import React, { useState } from 'react';

import '../Particles/Particle.css';


function Particle( {children} ) {

  //State Variables
  let showParticle = false;
  const [particle, setParticle] = useState(null);

  //Component Methods

  //Handle hover event
  const handleHover = (event) => {
    showParticle = true;
    console.log(showParticle);

    addParticle(event);
   
  };

  //Handle mouse leave event
  const handleMouseLeave = () => {
    showParticle = false;
    console.log(showParticle);

    removeParticles();
  };

  //Render content
  return (
    <div className="particle-container" onMouseOver={handleHover} onMouseLeave={handleMouseLeave}>
        {children}
        
    </div>
  );
}

function addParticle(event){
    let container = document.getElementsByClassName("particle-container")[0];

    let x = event.clientX;
    let y = event.clientY;

    // Create a new div element
    let particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.top = 0+"px";
    particle.style.left = 0+"px";

    container.appendChild(particle);
}

function removeParticles(){
    let container = document.getElementsByClassName("particle-container")[0];

    // Get all elements with the class name 'particle'
    let particles = container.getElementsByClassName('particle');

    // Remove each particle element
    while (particles.length > 0) {
        container.removeChild(particles[0]);
    }
}




export default Particle;