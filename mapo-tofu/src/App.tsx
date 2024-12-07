
import './App.css';
import Map from 'react-map-gl/maplibre';

function App() {

  return (
    <>
      <Map
        initialViewState={{
          longitude: -121.06,
          latitude: 47.32,
          zoom: 6
        }}
        style={{width: 1200, height: 800}}
        mapStyle="https://api.maptiler.com/maps/topo-v2/style.json?key=1fpqJCS5obaeWPdWYoZ6"
      />
    </>
  )
}

export default App
