import React, { useEffect } from "react";
import { useState } from "react";
import Countdown from "./Countdown";
import quotes from "../quotes";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCES,
  //...other fetch options
});

let getRandomPhoto = () => {
  return unsplash.photos.getRandom({
    featured: true,
    query: "landscape nature",
    orientation: "landscape",
    count: 1,
  });
};

function CountdownWrapper({ minutes, seconds, counterStatus, qIndex }) {
  const [photo, setPhoto] = useState(null);
  const [style, setStyle] = useState({});

  /* Fetch random photo */
  useEffect(() => {
    getRandomPhoto().then((result) => {
      if (result.errors) {
        // handle error here
        console.log("error occurred: ", result.errors[0]);
      } else {
        // handle success here
        const photoSrc = result.response;
        setPhoto(photoSrc);
        console.log(photoSrc);
        setStyle({ backgroundImage: `url(${photoSrc[0].urls.regular})` });
      }
    });
  }, []);

  let classes = "bg-black bg-opacity-50";
  let message = <h4 className="text-center pt-14 pb-10 text-opacity-70  text-neutral-content">Press START to start your session</h4>;
  let quote = null;
  if (counterStatus === "PAUSED") {
    message = <h4 className="text-center pt-14 pb-10 text-opacity-70  text-neutral-content">Your session is paused. Press RESUME to keep going.</h4>;
  } else if (counterStatus === "RESTING") {
    message = <h4 className="text-center pt-14 pb-10">It's time to get some rest...</h4>;
    classes = "bg-black bg-opacity-20";
    quote = null;
  } else if (counterStatus === "WORKING") {
    message = <h4 className="text-center h5 pt-6">Time to do some work!</h4>;
    classes = "bg-black bg-opacity-80";
    quote = (
      <div className="py-4 px-6 text-center">
        <h5 className="text-gray-300 mb-3 text-base italic">{quotes[qIndex].message}</h5>
        <small className="text-opacity-80 text-gray-300  text-xs">- {quotes[qIndex].author}</small>
      </div>
    );
  }

  let credits = null;
  if (photo) {
    credits = <div className="unsplash-credits">{"Photo created by:" + photo[0].user.name + " from unsplash.com"}</div>;
  }

  return (
    <div style={style} className=" my-6 rounded-lg bgimage-centered">
      <div className={classes + " " + "h-full pt-8 pb-4 rounded-lg md:pt-12 md:pb-6 shadow-custom transition ease-in-out duration-2000 "} id="timer-label">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center ">
          <Countdown type="minutes" value={minutes}></Countdown>
          <Countdown type="seconds" value={seconds}></Countdown>
          <div id="time-left" className="text-opacity-0 text-black absolute" value={minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")}>
            {/* set opacity to 100 before build */}
            {minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")}
          </div>
        </div>
        {message}
        {quote && quote}
        {credits}
      </div>
    </div>
  );
}

export default CountdownWrapper;
