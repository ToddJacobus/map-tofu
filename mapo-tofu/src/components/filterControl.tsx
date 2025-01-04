
import { AngleSlider, Group, Slider, Stack } from '@mantine/core';
import classes from '../mapo-tofu.module.css';

interface FilterControlProps {
    
}

function FilterControl(props: FilterControlProps) {
    const {} = props;

    return (
        <Stack className={classes.filterControlContainer}>
            <Group>
                <AngleSlider 
                    size={120}
                    formatLabel={(value) => `${value}°`}
                    marks={[
                        { value: 0 },
                        { value: 45 },
                        { value: 90 },
                        { value: 135 },
                        { value: 180 },
                        { value: 225 },
                        { value: 270 },
                        { value: 315 },
                    ]}
                />
                <span>Slope Aspect</span> 
            </Group>
            <Group>
                <Slider 
                    className={classes.slopeAngleSlider}
                    defaultValue={45}
                    min={0}
                    max={90}
                    marks={[
                        {value: 15},
                        {value: 30},
                        {value: 45},
                        {value: 60},
                        {value: 75},
                    ]}
                />
                <span>Slope Angle</span>
            </Group>
        </Stack>
    )   
};

export default FilterControl;