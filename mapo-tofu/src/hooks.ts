import { useControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import type { MapRef, ControlPosition } from "react-map-gl";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
    position?: ControlPosition;

    onCreate?: (evt: {features: object[]}) => void;
    onUpdate?: (evt: {features: object[]; action: string}) => void;
    onDelete?: (evt: {features: object[]}) => void;
};

export function DrawControl(props: DrawControlProps) {
    const { position, onCreate, onUpdate, onDelete } = props;

    useControl<MapboxDraw>(
        () => new MapboxDraw(props),
        ({map}: {map: MapRef}) => {
            map.on('draw.create', onCreate);
            map.on('draw.update', onUpdate);
            map.on('draw.delete', onDelete);
        },
        ({map}: {map: MapRef}) => {
            map.off('draw.create', onCreate);
            map.off('draw.update', onUpdate);
            map.off('draw.delete', onDelete);
        },
        {
            position: position,
        }
    )
        
    return null;

}

DrawControl.defaultProps = {
    onCreate: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  };