import { AppShell, Burger, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css';

import Map from 'react-map-gl/maplibre';

import { useDisclosure } from '@mantine/hooks';

function App() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <MantineProvider>
      <AppShell
        header={{ height: 60}}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened},
        }}
        padding='md'
      >
        <AppShell.Header>
          <Burger
            opened={opened}
            onClick={toggle}
            // hiddenFrom='sm'
            size='sm'
          />
        </AppShell.Header>
        <AppShell.Navbar>Navbar</AppShell.Navbar>
        <AppShell.Main>
          <Map
            initialViewState={{
              longitude: -121.06,
              latitude: 47.32,
              zoom: 6
            }}
            style={{width: 400, height: 400}}
            mapStyle="https://api.maptiler.com/maps/outdoor-v2/style.json?key=1fpqJCS5obaeWPdWYoZ6"
          />
        </AppShell.Main>
      </AppShell>

      
    </MantineProvider>
  )
}

export default App
