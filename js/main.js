mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 4.5, // starting zoom
    center: [-100, 40] // starting center
    });

    map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

        // when loading a geojson, there are two steps
        // add a source of the data and then add the layer out of the source
        map.addSource('covidrates', {
            type: 'geojson',
            data: 'assets/us-covid-2020-rates.json'
        });
            
        map.addLayer({
            'id': 'covidrates-layer',
            'type': 'fill',
            'source': 'covidrates',
            'paint': {
                'fill-color': [
                    'step',
                    ['get', 'rates'],
                    '#FFEDA0',   // stop_output_0
                    20,          // stop_input_0
                    '#FED976',   // stop_output_1
                    40,          // stop_input_1
                    '#FEB24C',   // stop_output_2
                    60,          // stop_input_2
                    '#FD8D3C',   // stop_output_3
                    80,         // stop_input_3
                    '#FC4E2A',   // stop_output_4
                    100,         // stop_input_4
                    '#E31A1C',   // stop_output_5
                ],
                'fill-outline-color': '#BBBBBB',
                'fill-opacity': 0.7,
            }
        });
    
    
        // click on tree to view magnitude in a popup
        map.on('mousemove', ({point}) => {
            const state = map.queryRenderedFeatures(point, {
                layers: ['covidrates-layer']
            });
            document.getElementById('text-description').innerHTML = state.length ?
                `<t>The county of </t>${state[0].properties.county}<t> has a </t><strong><em>${state[0].properties.rates}</strong> rate of covid</em>` :
                `<p>Hover over a County!</p>`;
        });
    });
    
    
    // create legend for choropleth map
    const layers = [
        '0-19',
        '20-39',
        '40-59',
        '60-79',
        '80-100'
    ];
    const colors = [
        '#FFEDA070',
        '#FED97670',
        '#FEB24C70',
        '#FD8D3C70',
        '#FC4E2A70'
    ];
    const legend = document.getElementById('legend');
    legend.innerHTML = "<b>Covid-19 Rates</b>";
    
    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        const key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;
    
        const value = document.createElement('span');
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    });