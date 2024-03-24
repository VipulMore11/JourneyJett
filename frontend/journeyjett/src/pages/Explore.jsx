import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Place_card from '../components/Place_card';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLocation } from 'react-router-dom';
mapboxgl.accessToken = 'pk.eyJ1Ijoic29oYW0xMiIsImEiOiJjbG5mMThidXcwa2o4Mml0Y3IzMHh0ZzM1In0.NKrFUG12iisWBbf-TVp34g';

const Explore = () => {

    const location = useLocation()
    const [homefilter, setHomefilter] = useState('')

    useEffect(() => {
        if (location.state && location.state.v1) {
            setHomefilter(location.state.v1);
        }
    }, [location.state]);
    const [lineCoordinates, setlineCoordinates] = useState([]);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [check, setCheck] = useState(true);
    const [showfilter, setShowFilter] = useState(false);

    useEffect(() => {
        async function getdata() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/get_destinations/?state=${homefilter}`);
                setData(response.data);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata();
    }, [homefilter])

    useEffect(() => {
        async function getdata() {
            try {
                {
                    const response = await axios.get(`http://127.0.0.1:8000/get_places/?filter=${filter}`);
                    setData(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata();
    }, [filter]);

    useEffect(() => {
        const coordinates = data.map(place => place.location);
        setlineCoordinates(coordinates);
    }, [data]);

    useEffect(() => {
        const map = new mapboxgl.Map({
            style: 'mapbox://styles/mapbox/light-v11',
            center: [79.09, 21.15],
            zoom: 2.5,
            pitch: 0,
            bearing: 0,
            container: 'map',
            antialias: true
        });
    
        map.on('load', () => {
            if (lineCoordinates.length > 0) {
                lineCoordinates.forEach(coordinate => {
                    new mapboxgl.Marker({
                        draggable: false
                    })
                        .setLngLat({ lng: coordinate[1], lat: coordinate[0] })
                        .addTo(map);
                });
            }
        });
    
        map.on('click', 'places', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;
    
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });
    
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'places', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
        });
    
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [lineCoordinates]);    

    const filters = [
        { name: 'Trending' },
        { name: 'Adventure' },
        { name: 'Beach' },
        { name: 'Heritage' },
        { name: 'Pilgrimage' }
    ];

    const handleFilter = (value) => {
        setCheck(!check);
        setFilter(prevFilter => {
            if (prevFilter.includes(value)) {
                return prevFilter.filter(item => item !== value);
            } else {
                return [...prevFilter, value];
            }
        });
    };  
    return (
        <div className='h-auto w-100 mt-3 xl:mx-20'>
            <div className='md:hidden'>
                <div className='m-5 text-white border-2 rounded-full p-2 w-20 flex justify-center' onClick={() => { setShowFilter(!showfilter) }}>Filters</div>
                <div className={`h-auto mb-5 w-100 bg-white mx-5 p-5 rounded opacity-95 relative ${showfilter ? "block" : "hidden"}`} style={{ backgroundColor: '#101c34' }}>
                    {filters.map((d, i) => (
                        <div key={i} className='flex flex-row gap-4 items-center my-3'>
                            <input type="checkbox" id={d.name} className='size-4' checked={filter.includes(d.name)} onChange={() => { handleFilter(d.name) }} />
                            <label htmlFor={d.name} className='text-lg text-white'>{d.name} Tours</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className='grid grid-cols-8 gap-5 mx-4'>
                <div className='md:col-span-2 hidden md:block rounded-xl p-3 h-auto' style={{ backgroundColor: '#081b33' }}>
                    <h1 className='text-white font-bold mt-4 text-2xl'>Filter</h1>
                    <div className='text-white rounded mt-4 xl:p-6'>
                        {filters.map((d, i) => (
                            <div key={i} className='flex flex-row gap-4 items-center my-3'>
                                <input type="checkbox" id={d.name} className='size-4' checked={filter.includes(d.name)} onChange={() => { handleFilter(d.name) }} />
                                <label htmlFor={d.name} className='lg:text-xl md:text-sm'>{d.name} Tours</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:col-span-6 col-span-8'>
                    <div className='bg-gray-800 h-auto w-100 mb-10'>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <style>{`
        .mapBox {
          width: 100%; 
          height: 50vh; 
          margin: 1rem; 
          border-radius: 1rem;
        }

        @media (max-width: 768px) {
          .mapBox {
            width: 90%;
            height: 30vh;
            border-radius: 1rem;
          }
        }
      `}</style>
                            <div id='map' className='mapBox' />
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-3 grid-cols-2 gap-5 rounded-xl'>
                        {data.map((d) => (
                            <div key={d.name}>
                                <Place_card coordinates={d.location} place={d.id} height={"xl:h-60 h-36 sm:h-52 md:h-48 lg:h-42"} img={d.images?.[0]?.places_image} title={d.name} desc={d.info} city={d.city} state={d.state} />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;