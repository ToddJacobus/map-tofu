import { useControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

interface DrawControlProps {
    position: string,
}

export function DrawControl(props: DrawControlProps) {
    const { position } = props;

    useControl(() => new MapboxDraw(props), {
        position: position
    })
}