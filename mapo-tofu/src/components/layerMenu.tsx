import { Checkbox, Slider } from "@mantine/core";

import classes from '../mapo-tofu.module.css';

export interface LayerMenuProps {
    title: string,
    layers: LayerItem[],
    handleSetState: (layerItems: LayerItem[]) => void;
    selectMultiple?: boolean,
    opacitySlider?: boolean,
}

export interface LayerItem {
    name: string,
    selected: boolean,
}

const LayerMenu = function (props: LayerMenuProps) {
    const { title, layers, selectMultiple, opacitySlider, handleSetState } = props;

    const handleLayerToggle = (layers: LayerItem[], name: string, selected: boolean) => {
        const _layerItems = layers.map(layer => {
          return (
            {
              ...layer,
              selected: name === layer.name ? selected : 
                          selectMultiple ? layer.selected : false 
            }
          )
        });

        handleSetState(_layerItems)
      }

    return (
        <div className={classes.layerMenu}>
            <h3>{title}</h3>
            {
                layers?.map(layer => {
                    return(
                        <div className={classes.layerMenuItem} key={layer.name}>
                            <span className={classes.layerMenuCheckbox}>
                                <Checkbox
                                    checked={layer.selected}
                                    label={layer.name}
                                    onChange={(e) => {
                                        handleLayerToggle(
                                            layers,
                                            layer.name,
                                            e.target.checked
                                        )
                                    }}
                                />    
                            </span>
                            
                            <span className={classes.layerMenuSlider}>
                                {
                                    opacitySlider &&
                                    <Slider 
                                        disabled={!layer.selected}
                                        defaultValue={100}
                                        marks={[
                                            { value: 25},
                                            { value: 50},
                                            { value: 75}
                                        ]}
                                    />
                                }
                            </span>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LayerMenu;