import React from "react";
import './Video.css'
import PlayVideo from "../../Component/PlayVideo/PlayVideo";
import Recommended from "../../Component/Recommended/Recommended";

const Video = () => {
    return (
        <div className="play-container">
            <PlayVideo />
            <Recommended />
        </div>
    )
}

export default Video