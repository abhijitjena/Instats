import '../screens/UserData.css';

import React, { ReactElement, useRef } from 'react';

import FolderUploader from '../components/UserOnboarding/FolderUploader';
import Hero from '../components/UserOnboarding/Hero';
import PreRequisites from '../components/UserOnboarding/PreRequisites';

const UserOnboarding = (): ReactElement => {
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const blurredAreaRef = useRef(null);

  const handleMouseMove = (e) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    blurredAreaRef.current.style.left = `${mousePositionRef.current.x - 50}px`;
    blurredAreaRef.current.style.top = `${mousePositionRef.current.y - 50}px`;
  };

  return (
    <div
      className="w-full databg1 bg-slate-950 flex flex-col justify-start items-center"
      onMouseMove={handleMouseMove}
    >
      <div className="databg2 w-full h-full min-h-screen flex flex-col justify-start items-center">
        <Hero />
        <PreRequisites />
        <FolderUploader />
      </div>
      <div ref={blurredAreaRef} className="blurred-area"></div>
    </div>
  );
};

export default UserOnboarding;
