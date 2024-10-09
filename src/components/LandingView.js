'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import VerticalSpacing from './Layout/VerticalSpacing';

export default function LandingView({ somethingElse }) {
    const [weatherHometown, setWeatherHometown] = useState(null);
    const [weatherNow, setWeatherNow] = useState(null);
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    // Fetch weather data
    const fetchWeather = async (cityNow, cityHome) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNow}&appid=${apiKey}`);
        const data = await response.json();
        setWeatherNow(data);

        const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityHome}&appid=${apiKey}`);
        const data2 = await response2.json();
        setWeatherHometown(data2);
    };

    useEffect(() => {
        fetchWeather('Paris', 'Chicago');
    }, []);

    useEffect(() => {
        if (weatherHometown) {
            console.log(weatherHometown);
            console.log(weatherNow)
        }
    }, [weatherHometown]);

    return (
        <header className="App-header header-background">
            <VerticalSpacing rows="5" />
            <p>Paul K. Davis</p>
            <HometownWidget 
                weather={weatherHometown}
                title="Where I'm from"
                town='Chicago, IL, USA'
                sideIsLeft={true}
            />
            <HometownWidget 
                weather={weatherNow}
                title="Where I am now"
                town='Paris, France'
                sideIsLeft={false}
            />
        </header>
    );
}


function HometownWidget({ weather, title, town, sideIsLeft }) {
    const Sky = {
        sunny: '#87CEEB',        // Light blue sky for sunny weather
        partlyCloudy: '#ADD8E6', // Slightly muted blue for partly cloudy
        cloudy: '#B0C4DE',       // Light gray-blue for cloudy weather
        foggy: '#D3D3D3',        // Light gray for fog
        rainy: '#778899',        // Slate gray for rainy weather
        thunderstorm: '#4F4F4F', // Dark gray for thunderstorm
        night: '#191970',        // Dark navy blue for night
        snowy: '#F0FFFF',        // Very light blue/white for snowy weather
    };

    const Sun = dynamic(() => import('./3D/Sun'), { ssr: false });
    const Clouds = dynamic(() => import('./3D/Clouds'), { ssr: false});
    const Rain = dynamic(() => import('./3D/Rain'), { ssr: false});
    const Thunderstorm = dynamic(() => import('./3D/Thunderstorm'), { ssr: false});
    const Snow = dynamic(() => import('./3D/Snow'), { ssr: false});
    

    const [skyColor, setSkyColor] = useState(Sky.sunny);

    useEffect(() => {
        if (weather?.weather[0]?.main) {
            switch (weather.weather[0].main) {
                case 'Clear':
                    setSkyColor(Sky.sunny);
                    break;
                case 'Rain':
                    setSkyColor(Sky.rainy);
                    break;
                case 'Mist':
                    setSkyColor(Sky.rainy);
                    break;
                case 'Clouds':
                    setSkyColor(Sky.cloudy);
                    break;
                case 'Thunderstorm':
                    setSkyColor(Sky.thunderstorm);
                    break;
                case 'Drizzle':
                    setSkyColor(Sky.rainy);
                    break;
                case 'Snow':
                    setSkyColor(Sky.snowy);
                    break;
                default:
                    setSkyColor(Sky.sunny);
                    break;
            }
        }
    }, [weather]);

    const renderWeather = () => {
        switch (weather?.weather[0].main) {
            case 'Clear':
                return <Sun />;
            case 'Rain':
                return <Rain />
            case 'Clouds':
                return <Clouds />
            case 'Mist':
                return <Rain />
            case 'Thunderstorm':
                return <Thunderstorm />
            case 'Drizzle':
                return <Rain />;
            case 'Snow':
                return <Snow />;
            default:
                return <Sun />;
        }
    };

    return (
        <div style={{
            position: 'absolute',
            borderRadius: sideIsLeft ? '0% 25% 0% 0%' : '25% 0% 0% 0%',
            backgroundColor: skyColor,
            background: `linear-gradient(to bottom right, ${skyColor}, #ffffff)`, // Adding gradient
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.5)', // Inner shadow for gloss effect
            borderTop: '1px solid rgba(255, 255, 255, 0.5)', // Top border for a subtle reflective line
            left: sideIsLeft ? 0 : 'auto',
            right: sideIsLeft ? 'auto' : 0,
            bottom: 0,
            maxHeight: '50vh',
            minHeight: 'auto',
            width: 'auto',
            padding: '12px 8px 0px 8px'
        }}>
            <h3>{title}</h3>
            <h5>{town}</h5>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ height: '100px', width: '100px' }}>
                    {renderWeather()}
                </div>
            </div>
        </div>
    );
}
