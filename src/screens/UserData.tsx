import './UserData.css';

import { ReactElement } from 'react';

import Chats from '../components/UserData/Chats';
import Content from '../components/UserData/Content';
import LikedPosts from '../components/UserData/LikedPosts';

const UserData = (): ReactElement => {
  return (
    <div className="databg1">
      <div className="databg2 w-full h-full min-h-screen flex flex-col justify-start items-center px-56 py-36">
        <Chats />
        <LikedPosts />
        <Content />
      </div>
    </div>
  );
};

export default UserData;
