import React from 'react';

const VideoPanel = () => {
  return (
    <div className="video-panel">
      <div className="video-container">
        <video
          className="video-element"
          controls
          autoPlay
          muted
          loop
        >
          <source src="/home/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
    
export default VideoPanel;
