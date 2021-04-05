import React from "react";

const LaunchItem = ({
  obj: { mission, vehicle, location, status, countdown, launchTime },
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between'}}>
      <div style={{display:"flex", justifyContent: 'start'}}><p>{mission}</p></div>
      <div><p>{vehicle}</p></div>
      <div><p>{location}</p></div>
      <div><p>{status}</p></div>
      <div><p>{launchTime}</p></div>
      <div><p>{countdown}</p></div>
    </div>
  );
};

export default LaunchItem;
