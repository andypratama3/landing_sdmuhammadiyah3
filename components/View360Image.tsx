// components/PanoViewerComponent.tsx
"use client";

import { PanoViewer, PROJECTION_TYPE } from "@egjs/react-view360";
import React from "react";

const PanoViewerComponent: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  return (
    <div className="w-full h-[500px]">
      <PanoViewer
        tag="div"
        image={imageSrc}
        useZoom={true}
        // Use EQUIRECTANGULAR for standard single panoramic images
        projectionType={PROJECTION_TYPE.EQUIRECTANGULAR} 
        onViewChange={(e) => {
          // Optional: handle view change events
          console.log("View changed:", e.yaw, e.pitch);
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default PanoViewerComponent;
