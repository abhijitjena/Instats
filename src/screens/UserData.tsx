import './UserData.css';

import download from 'downloadjs';
import { toPng } from 'html-to-image';
import { ReactElement, useRef } from 'react';
import { useDispatch } from 'react-redux';

import DChats from '../components/DownloadTemplates/Chats';
import DContent from '../components/DownloadTemplates/Content';
import DFollowersFollowing from '../components/DownloadTemplates/FollowersFollowing';
import DLikedPosts from '../components/DownloadTemplates/LikedPosts';
import DSavedPosts from '../components/DownloadTemplates/SavedPosts';
import Chats from '../components/UserData/Chats';
import Content from '../components/UserData/Content';
import FollowersFollowing from '../components/UserData/FollowersFollowing';
import LikedPosts from '../components/UserData/LikedPosts';
import SavedPosts from '../components/UserData/SavedPosts';
import { resetChatSlice } from '../redux/slices/chatSlice';
import { resetContentSlice } from '../redux/slices/contentSlice';
import { resetUserSlice } from '../redux/slices/userSlice';

const UserData = (): ReactElement => {
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const blurredAreaRef = useRef(null);
  const dispatch = useDispatch();

  const handleMouseMove = (e: any) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    if (blurredAreaRef.current) {
      (blurredAreaRef.current as any).style.left = `${mousePositionRef.current.x - 50}px`;
      (blurredAreaRef.current as any).style.top = `${mousePositionRef.current.y - 50}px`;
    }
  };

  return (
    <div className="databg1" onMouseMove={handleMouseMove}>
      <div className="databg2 w-full h-full min-h-screen flex flex-col justify-start items-center px-24 py-20">
        <Chats />
        <LikedPosts />
        <Content />
        <FollowersFollowing />
        <SavedPosts />
        <div className="flex flex-col items-center">
          <button
            className="relative w-72 h-20 mt-16 flex flex-col items-center justify-center bg-blue-400 rounded-none shadow-white shadow-[5px_5px_0_0]"
            onClick={() => {
              const chats = document.getElementById('download-chats');
              const content = document.getElementById('download-content');
              const follows = document.getElementById('download-follows');
              const likes = document.getElementById('download-likes');
              const saves = document.getElementById('download-saves');
              if (chats)
                toPng(chats).then(function (dataUrl) {
                  download(dataUrl, 'chats.png');
                });
              if (content)
                toPng(content).then(function (dataUrl) {
                  download(dataUrl, 'content.png');
                });
              if (follows)
                toPng(follows).then(function (dataUrl) {
                  download(dataUrl, 'follows.png');
                });
              if (likes)
                toPng(likes).then(function (dataUrl) {
                  download(dataUrl, 'likedPosts.png');
                });
              if (saves)
                toPng(saves).then(function (dataUrl) {
                  download(dataUrl, 'savedPosts.png');
                });
            }}
          >
            <p className="text-lg leading-none font-medium font-poppins">
              Save as images
            </p>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="relative w-36 h-10 mt-16 flex flex-col items-center justify-center bg-red-400 rounded-none shadow-white shadow-[5px_5px_0_0]"
            onClick={() => {
              window.scrollTo({ top: 0 });
              dispatch(resetUserSlice());
              dispatch(resetChatSlice());
              dispatch(resetContentSlice());
            }}
          >
            <p className="text-lg leading-none font-medium font-poppins">Reset</p>
          </button>
        </div>
      </div>
      <div className="" style={{ height: 0, width: 0, overflow: 'hidden' }}>
        <DChats />
        <DLikedPosts />
        <DContent />
        <DFollowersFollowing />
        <DSavedPosts />
      </div>
      <div ref={blurredAreaRef} className="blurred-area"></div>
    </div>
  );
};

export default UserData;
