import './index.css';

import React, { ReactElement } from 'react';

import nyanCat from '../../resources/cats/nyanCat.gif';
import pikachu from '../../resources/cats/pikachu.gif';
import toast from '../../resources/cats/toast.gif';
import waffle from '../../resources/cats/waffle.gif';

const Hero = (): ReactElement => {
  return (
    <div className="hero-bg w-full h-[60rem] flex flex-col justify-center items-center">
      <div className="title-bg w-1/2 mb-14 h-96">
        <div className="w-36 h-36 ttl-shp-1 rounded-[4.5rem] absolute" />
        <h1 className="title-txt text-[18rem] leading-[14rem] w-[40rem] h-[12rem] inline-block font-cookie text-white text-center align-middle absolute">
          Instats
        </h1>
        <div className="w-36 h-36 ttl-shp-2 rounded-[4.5rem] absolute" />
        <div className="w-36 h-36 ttl-shp-3 rounded-[4.5rem] absolute" />
        <div className="w-36 h-36 ttl-shp-4 rounded-[4.5rem] absolute" />
        <div className="w-36 h-36 ttl-shp-5 rounded-[4.5rem] absolute" />
        <div className="w-36 h-36 ttl-shp-6 rounded-[4.5rem] absolute" />
        <div className="w-36 h-36 ttl-shp-7 rounded-[4.5rem] absolute" />
      </div>
      <h1 className="w-3/5 font-martian opacity-95 text-2xl text-center text-white z-20">
        Fun stats for your Instagram data
      </h1>
      <img
        src={nyanCat}
        width={80}
        height={80}
        alt="nyan cat"
        className="nyanCat absolute"
      />
      <img
        src={pikachu}
        width={80}
        height={80}
        alt="pikachu cat"
        className="pikachu absolute"
      />
      <img
        src={waffle}
        width={80}
        height={80}
        alt="waffle cat"
        className="waffle absolute"
      />
      <img
        src={toast}
        width={80}
        height={80}
        alt="toast cat"
        className="toast absolute"
      />
    </div>
  );
};

export default Hero;
