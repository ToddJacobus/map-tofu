import { 
  AppShell,
  Burger,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css';
import classes from "./mapo-tofu.module.css";

import Map from 'react-map-gl/maplibre';

import LayerMenu, { LayerItem } from './components/layerMenu';
import React from 'react';
import Header from './components/header';
import { useDisclosure } from '@mantine/hooks';
import FilterControl from './components/filterControl';


const theme = createTheme({

})


function App() {
  const [opened, { toggle }] = useDisclosure();

  const [basemaps, setBasemaps] = React.useState<LayerItem[]>([
    {
      name: "Outdoors",
      selected: true,
    },
    {
      name: "Satelite",
      selected: false,
    }
  ]);

  const [rasterLayers, setRasterLayers] = React.useState<LayerItem[]>([
    {
      name: "Aspect Layer",
      selected: true,
    },
    {
      name: "Slope Angle",
      selected: false,
    }
  ]);

  const [featureLayers, setFeatureLayers] = React.useState<LayerItem[]>([
    {
      name: "Routes",
      selected: true,
    },
    {
      name: "Camp Sites",
      selected: true,
    }
  ]);


  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 60}}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened},
        }}
        className={classes.root}
      >
        <AppShell.Header className={classes.headerContainer}>
          <div className={classes.navToggle}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom='sm'
              size="sm"
            />  
          </div>
          
          <Header />
        </AppShell.Header>
        <AppShell.Navbar>
          <div className={classes.layerControls}>
            <h3>Filter Slope</h3>
            <FilterControl />
          </div>
          
          <div className={classes.catalog} >
            <LayerMenu 
              title="Feature Layers"
              layers={featureLayers}
              selectMultiple
              opacitySlider
              handleSetState={setFeatureLayers}
            />
            <LayerMenu 
              title="Raster Layers"
              layers={rasterLayers} 
              selectMultiple
              opacitySlider
              handleSetState={setRasterLayers}
            />
            <LayerMenu 
              title="Base Maps"
              layers={basemaps}
              handleSetState={setBasemaps}
            />
          </div>
            
        </AppShell.Navbar>
        <AppShell.Main>
          <div className={classes.main}>
            <Map
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
              initialViewState={{
                longitude: -121.74,
                latitude: 46.85,
                zoom: 11
              }}
              mapStyle="https://api.maptiler.com/maps/outdoor-v2/style.json?key=1fpqJCS5obaeWPdWYoZ6"
            />  
          </div>
          
        </AppShell.Main>
      </AppShell>

      
    </MantineProvider>
  )
}

export default App
