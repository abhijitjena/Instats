import './index.css';

import { ReactElement } from 'react';

import nyanCat from '../../resources/cats/nyanCat.gif';
import pikachu from '../../resources/cats/pikachu.gif';
import toast from '../../resources/cats/toast.gif';
import waffle from '../../resources/cats/waffle.gif';

const Hero = (): ReactElement => {
  return (
    <div className="hero-bg w-full h-[20rem] sm:h-[30rem] lg:h-[60rem] flex flex-col justify-center items-center">
      <div className="title-bg w-4/5 sm:w-3/5 xl:w-1/2 mb-14 h-32 sm:h-48 lg:h-96 relative flex items-center justify-center">
        <div className="w-9 h-9 sm:w-16 sm:h-16 lg:w-36 lg:h-36 rounded-[1.125rem] sm:rounded-[2rem] lg:rounded-[4.5rem] ttl-shp-1 absolute" />
        <h1 className="title-txt text-[9rem] lg:text-[18rem] font-cookie text-white text-center align-middle">
          Instats
        </h1>
        <div className="w-9 h-9 sm:w-16 sm:h-16 lg:w-36 lg:h-36 rounded-[1.125rem] sm:rounded-[2rem] lg:rounded-[4.5rem] ttl-shp-2 absolute" />
        <div className="w-9 h-9 sm:w-16 sm:h-16 lg:w-36 lg:h-36 rounded-[1.125rem] sm:rounded-[2rem] lg:rounded-[4.5rem] ttl-shp-3 absolute" />
        <div className="w-9 h-9 sm:w-16 sm:h-16 lg:w-36 lg:h-36 rounded-[1.125rem] sm:rounded-[2rem] lg:rounded-[4.5rem] ttl-shp-4 absolute" />
        <div className="w-9 h-9 sm:w-16 sm:h-16 lg:w-36 lg:h-36 rounded-[1.125rem] sm:rounded-[2rem] lg:rounded-[4.5rem] ttl-shp-5 absolute" />
      </div>
      <h1 className="w-3/5 font-martian opacity-95 xl:text-2xl text-lg text-center text-white z-20">
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
