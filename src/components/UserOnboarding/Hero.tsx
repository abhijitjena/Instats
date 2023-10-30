import './index.css';

import React, { ReactElement } from 'react';

const Hero = (): ReactElement => {
  return (
    <div className="w-full bg-slate-950 h-[40rem] flex flex-col justify-start items-start">
      <div className="hero-bg w-full h-[30rem] flex flex-col justify-center items-start pl-20 pb-20">
        {/* <h1 className="w-64 inline-block text-red-600">Welcome to Instats</h1> */}
        <h1 className="w-3/5 font-poppins text-6xl font-extrabold text-white text-left z-20 mt-20">
          Get interesting stats for your Instagram data
        </h1>
        <pre className="w-3/5 font-martian text-3xl pt-6 font-medium text-indigo-950 text-left z-20">
          {'Browser based.\nCompletely offline.'}
        </pre>
        <h3 className="w-3/5 font-poppins text-xs font-thin pt-3 text-white text-left z-20">
          {"(I literally don't have a server)"}
        </h3>
      </div>
      <div className="w-full absolute top-[20rem] h-0 border-b-[10em] border-b-slate-950 border-l-transparent border-l-[100vw]" />
      <button className="ml-20 bottom-10 relative rounded-full">
        <p className="text-base leading-none my-3">{"Let's Get Started"}</p>
      </button>
    </div>
  );
};

export default Hero;
