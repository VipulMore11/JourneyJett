import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Place_card from '../components/Place_card'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1Ijoic29oYW0xMiIsImEiOiJjbG5mMThidXcwa2o4Mml0Y3IzMHh0ZzM1In0.NKrFUG12iisWBbf-TVp34g';

const Explore = () => {

    const [lineCoordinates, setlineCoordinates] = useState([])
    const [data, setData] = useState([])
    const [filter, setFilter] = useState([])
    const [check, setCheck] = useState(true)
    const [showfilter, setShowFilter] = useState(false)

    useEffect(() => {
        async function getdata() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/get_places/?filter=${filter}`);

                setData(response.data)
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getdata();
    }, [filter]);

    useEffect(() => {
        const coordinates = [];
        for (let i = 0; i < data.length; i++) {
            coordinates?.push(data[i].location);
        }
        setlineCoordinates(coordinates);
    }, [data]);
    // mapbox 
    useEffect(() => {
        const map = new mapboxgl.Map({
            style: 'mapbox://styles/mapbox/light-v11',
            center: [72.83627602340445, 18.959732630284932],
            zoom: 10.5,
            pitch: 45,
            bearing: -15.6,
            container: 'map',
            antialias: true
        });

        map.on('load', () => {
            map.addSource('lineSource', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: lineCoordinates
                    }
                }
            });

            // Add a layer to display the line
            // map.addLayer({
            //     id: 'lineLayer',
            //     type: 'line',
            //     source: 'lineSource',
            //     layout: {
            //         'line-join': 'round',
            //         'line-cap': 'round'
            //     },
            //     paint: {
            //         'line-color': '#888',
            //         'line-width': 4
            //     }
            // });
        
            if (lineCoordinates.length > 0) {
                lineCoordinates.forEach(coordinate => {
                    new mapboxgl.Marker({
                        draggable: false
                    })
                    .setLngLat({ lng: coordinate[0], lat: coordinate[1] })
                    .addTo(map);
                });
            }
        });
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [lineCoordinates]);

    // mapbox end 



    const filters = [
        { name: 'Trending' },
        { name: 'Adventure' },
        { name: 'Beach' },
        { name: 'Heritage' },
        { name: 'Pilgrimage' }
    ]

    const handleFilter = (value) => {
        setCheck(!check)
        check ? setFilter(value) : setFilter('')
    }

    const handleResfilter = (value) => {
        setCheck(!check)
        check ? setFilter(value) : setFilter('')

    }

    console.log(lineCoordinates)

    return (
        <div className=' h-auto w-100 mt-3 xl:mx-20 '>
            <div className='bg-gray-800 h-auto w-100 my-10'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <style>{`
        .mapBox {
          width: 80%; 
          height: 80vh; 
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
            <div className='md:hidden'>
                <div className='m-5 text-white border-2 rounded-full p-2 w-20 flex justify-center' onClick={() => { setShowFilter(!showfilter) }}>Filters</div>
                <div className={`h-auto mb-5 w-100 bg-white mx-5 p-5 rounded opacity-95 relative ${showfilter ? "block" : "hidden"}`} style={{ backgroundColor: '#101c34' }}>
                    {filters.map((d, i) => (
                        <div key={i} className='flex flex-row gap-4 items-center my-3'><input type="checkbox" id={d.name} className='size-4' /> <label htmlFor={d.name} className='lg:text-xl md:text-sm text-lg text-white' onClick={() => { handleFilter(d.name) }}>{d.name} Tours</label></div>
                    ))}
                </div>
            </div>
            <div className='grid grid-cols-8 gap-5 mx-4'>
                <div className='md:col-span-2 hidden md:block rounded-xl p-3 h-auto' style={{ backgroundColor: '#081b33' }}>
                    <h1 className='text-white font-bold mt-4 text-2xl'>Filter</h1>
                    <div className=' text-white rounded mt-4 xl:p-6 ' >
                        {filters.map((d, i) => (
                            <div key={i} className='flex flex-row gap-4 items-center my-3'><input type="checkbox" id={d.name} className='size-4' /> <label htmlFor={d.name} className='lg:text-xl md:text-sm' onClick={() => { handleFilter(d.name) }}>{d.name} Tours</label></div>
                        ))}
                    </div>
                </div>
                <div className='grid lg:grid-cols-3 grid-cols-2  gap-5 md:col-span-6 col-span-8 rounded-xl'>
                    {data.map((d) => (
                        <div key={d.name}><Place_card place={d.id} img={d.images[0]?.places_image} title={d.name} desc={d.info} city={d.city} state={d.state} /></div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Explore
