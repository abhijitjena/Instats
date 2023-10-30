import React, { ReactElement } from 'react';

import FolderUploader from '../components/UserOnboarding/FolderUploader';
import Hero from '../components/UserOnboarding/Hero';
import PreRequisites from '../components/UserOnboarding/PreRequisites';

const UserOnboarding = (): ReactElement => {
  return (
    <div className="w-full bg-slate-950 flex flex-col justify-start items-center">
      <Hero />
      <PreRequisites />
      <FolderUploader />
    </div>
  );
};

export default UserOnboarding;
