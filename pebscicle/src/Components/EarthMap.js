import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import './EarthMap.css';

const Chicago = [-87.63616498377397, 41.878721696699486];
const Michigan = [-83.211111, 42.546667];
const Maryland = [-77.25299394375655, 38.99869904107169];
const France = [2.294556733062433, 48.858475686373694];
const Scotland = [-3.920489922682685, 56.144627032100395]

function EarthMap( {} ) {

    useEffect(() => {

        //mapboxgl.accessToken = 'pk.eyJ1IjoicGVic2NpY2xlIiwiYSI6ImNsY2VxeTYwOTAxbDkzdnBrdnhqMWcyZnoifQ.i2QhIgkAlYKEV_ygXU62YA';
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

        const map = new mapboxgl.Map({
          container: 'map', // Replace with the actual DOM ID
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-41.589791333673912, 46.387075894178718],
          zoom: 2.6
        });

        // Add map markers, layers, etc. here

        // Add the marker after the map has loaded
        map.on('load', () => {
                
            map.addSource('places', {
                // This GeoJSON contains features that include an "icon"
                // property. The value of the "icon" property corresponds
                // to an image in the Mapbox Streets style's sprite.
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                            '<strong>Chicago, IL</strong><p>I was born in Chicago, IL and moved when I was two years old.</p>',
                            'icon': 'hospital'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': Chicago
                        }
                    },
                    {
                    'type': 'Feature',
                    'properties': {
                        'description':
                        '<strong>Birmingham, MI</strong><p>I now live in the state of Michigan.</p>',
                        'icon': 'castle'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': Michigan
                    }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                            '<strong>Montgomery County, MD</strong><p>I grew up in Maryland and moved to France at the age of 10.</p>',
                            'icon': 'castle'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': Maryland
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                            '<strong>Stirling, Scotland</strong><p>From 2020-2024, I spent my time studying Computer Science at the <a href="https://www.stir.ac.uk/" target="_blank">University of Stirling</a>.</p>',
                            'icon': 'castle'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': Scotland
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                            '<strong>Paris, France</strong><p>At the age of 10, I moved to France. I had to adapt to a new culture, improve my French, and make new friends in a new area. This forced me to become a more flexible and adapatable person.</p>',
                            'icon': 'castle'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': France
                        }
                    }
                    ]
                }
            });

            map.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': ['get', 'icon'],
                    'icon-size': 1.5,
                    'icon-allow-overlap': true
                }
            });

            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on('click', 'places', (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;
                
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            });

        });

        //Add map styling:
        const customStyle = {
            '.mapbox-layer-label': {
              fill: 'rgba(0, 0, 0, 0.75)',
              stroke: '#fff',
              strokeLinejoin: 'round',
              strokeLinecap: 'round',
              fontSize: 12,
            },
          };
          
        //map.setStyle(customStyle);
    
        // Clean up the map instance when the component unmounts
        return () => {
          map.remove();
        };
    }, []); // Empty dependency array ensures the effect runs once after the initial render
    
    //style={{ width: '1000px', height: '500px' }}

    return (
        <div id="map" className='earth-map'></div>
    );
}

export default EarthMap;