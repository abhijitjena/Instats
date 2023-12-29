import '../screens/UserData.css';

import { ReactElement, useRef } from 'react';

import FolderUploader from '../components/UserOnboarding/FolderUploader';
import Hero from '../components/UserOnboarding/Hero';
import PreRequisites from '../components/UserOnboarding/PreRequisites';

const UserOnboarding = (): ReactElement => {
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const blurredAreaRef = useRef(null);

  const handleMouseMove = (e: any) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    if (blurredAreaRef.current) {
      (blurredAreaRef.current as any).style.left = `${mousePositionRef.current.x - 50}px`;
      (blurredAreaRef.current as any).style.top = `${mousePositionRef.current.y - 50}px`;
    }
  };

  return (
    <div
      className="w-full databg1 bg-slate-950 flex flex-col justify-start items-center"
      onMouseMove={handleMouseMove}
    >
      <div className="databg2 w-full h-full min-h-screen flex flex-col justify-start items-center">
        <Hero />
        <div className="mb-24 xl:mb-48" />
        <PreRequisites />
        {window.innerWidth > 1024 ? <FolderUploader /> : null}
      </div>
      <div ref={blurredAreaRef} className="blurred-area"></div>
    </div>
  );
};

export default UserOnboarding;
