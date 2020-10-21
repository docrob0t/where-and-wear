import React from 'react';
import './App.css';

function App() {
  return (
    <body>
    <div className="map-container">
        <p>
        <iframe class ="map-iframe"
        src="https://embed.windy.com/embed2.html?lat=52.896&lon=-2.241&detailLat=51.914&detailLon=-1.346&width=1600&height=900&zoom=7&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
        frameborder="0"></iframe>

        </p><div class="divider"></div> 
    </div>
    </body>
  );
}

export default App;
