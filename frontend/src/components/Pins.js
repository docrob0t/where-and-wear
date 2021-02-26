import * as React from "react";
import { Marker } from "react-map-gl";
import locationIcon from "../images/whereandwear-logo.svg";

const SIZE = 50;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins({ lat, long }) {
  return (
    <Marker key={`marker-${lat}-${long}`} longitude={long} latitude={lat}>
      <img
        width={SIZE}
        height={SIZE}
        src={locationIcon}
        style={{
          transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
        }}
      />
    </Marker>
  );
}

export default Pins;
