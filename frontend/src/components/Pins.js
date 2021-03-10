import * as React from "react";
import { Marker } from "react-map-gl";
import startIcon from "../images/Start-logo.svg";
import destinationIcon from "../images/Destination-logo.svg";

const SIZE = 50;

function Pins({ isStart, lat, long }) {
  return (
    <Marker key={`marker-${lat}-${long}`} longitude={long} latitude={lat}>
      <img
        width={SIZE}
        height={SIZE}
        src={isStart === true ? startIcon : destinationIcon}
        style={{
          transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
        }}
        alt={"location pin"}
      />
    </Marker>
  );
}

export default Pins;
