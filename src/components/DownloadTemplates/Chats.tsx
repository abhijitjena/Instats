import './likedPosts.css';
import './chats.css';

import { ReactElement, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import { ISingleChat } from '../../redux/interfaces/chatInterface';
import ChatSelectors from '../../redux/selectors/chatSelector';
import cheers from '../../resources/cats/cheers.gif';
import Glitter from '../../resources/glitter.svg?react';

interface IChatContainer {
  title: string;
  topIndex: number;
  textCount: number;
  reelCount: number;
  bgColor1: string;
  bgColor2: string;
  bgColor3: string;
  indexColor: string;
  titleColor1: string;
  titleColor2: string;
  titleColor3: string;
  infoColor1: string;
  infoColor2: string;
  titleRef: React.MutableRefObject<any>;
}

interface IMonthlyStats {
  chatIndex: number;
  axisColor: string;
  areaColor1: string;
  areaColor2: string;
}

const Chats = (): ReactElement => {
  const chatData = useSelector(ChatSelectors.getChatsData);

  const [topChats, setTopChats] = useState<ISingleChat[]>([]);

  const [isHovered, setIsHovered] = useState<{ [key: string]: boolean }>({
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  });

  const top2ContainerRef = useRef(null);
  const top3ContainerRef = useRef(null);
  const top4ContainerRef = useRef(null);
  const top5ContainerRef = useRef(null);

  useEffect(() => {
    calculateScreenData();
  }, []);

  const calculateScreenData = (timeline = 2023): void => {
    const chatsForSelectedTimeline: ISingleChat[] = [];
    Object.keys(chatData).forEach((chatA) => {
      let reelsForDuration = 0;
      let textsForDuration = 0;

      if (chatData[chatA].dateMap[timeline]) {
        Object.keys(chatData[chatA].dateMap[timeline]).forEach((month) => {
          let reelsForMonth = 0;
          let textsForMonth = 0;
          Object.keys(chatData[chatA].dateMap[timeline][month]).forEach((date) => {
            textsForMonth += chatData[chatA].dateMap[timeline][month][date].numOfTexts;
            reelsForMonth += chatData[chatA].dateMap[timeline][month][date].numOfReels;
          });
          textsForDuration += textsForMonth;
          reelsForDuration += reelsForMonth;
        });
        chatsForSelectedTimeline.push({
          threadName: chatData[chatA].threadName,
          title: chatData[chatA].title,
          dateMap: { [timeline]: chatData[chatA].dateMap[timeline] },
          totalReels: reelsForDuration,
          totalTexts: textsForDuration,
        });
      }
    });
    const topChatsForTimeline = chatsForSelectedTimeline
      .sort((chatA, chatB) => (chatA.totalTexts < chatB.totalTexts ? 1 : -1))
      .slice(0, 10);
    setTopChats(topChatsForTimeline);
  };

  const chatContainerMini = (chatContainerProps: IChatContainer): ReactElement => {
    const {
      bgColor1,
      bgColor2,
      bgColor3,
      indexColor,
      infoColor1,
      infoColor2,
      reelCount,
      textCount,
      title,
      titleColor1,
      titleColor2,
      titleColor3,
      topIndex,
    } = chatContainerProps;
    let monthlyStatsPayload: IMonthlyStats = {
      areaColor1: '',
      areaColor2: '',
      axisColor: '',
      chatIndex: 0,
    };
    switch (topIndex) {
      case 1:
        monthlyStatsPayload = {
          chatIndex: 1,
          areaColor1: '#fde047',
          areaColor2: 'white',
          axisColor: '#1e3a8a',
        };
        break;
      case 2:
        monthlyStatsPayload = {
          chatIndex: 2,
          areaColor1: '#922fd6',
          areaColor2: '#26daed',
          axisColor: '#16a34a',
        };
        break;
      case 3:
        monthlyStatsPayload = {
          chatIndex: 3,
          areaColor1: '#ed5e26',
          areaColor2: '#fcd34d',
          axisColor: 'white',
        };
        break;
      case 4:
        monthlyStatsPayload = {
          chatIndex: 4,
          areaColor1: '#60a5fa',
          areaColor2: '#fbbf24',
          axisColor: 'white',
        };
        break;
      case 5:
        monthlyStatsPayload = {
          chatIndex: 5,
          areaColor1: '#ec4899',
          areaColor2: '#9333ea',
          axisColor: 'white',
        };
        break;
    }

    return (
      <div className="w-[45%] h-[21rem] p-2 rounded-lg z-30 mb-16">
        <div className={`${bgColor1} w-full h-72 rounded-lg relative`} />
        <div className={`${bgColor2} w-full h-72 rounded-lg relative top-[-19.5rem]`} />
        <div className={`${bgColor3} w-full h-72 rounded-lg relative top-[-39rem]`}>
          <div className="w-full relative top-[-1rem] flex flex-row items-start justify-start p-15">
            <div className="flex flex-col items-center justify-center">
              <p
                className={`font-ultra ${indexColor} text-6xl relative bottom-[2.5rem] ml-5 z-30`}
              >
                {topIndex}
              </p>
            </div>
            <div className="flex flex-col h-24 items-start justify-start relative pl-1 mt-12 pr-8 w-full overflow-hidden scroll-container">
              <p className={`font-vinasans text-6xl whitespace-nowrap ${titleColor1}`}>
                {title}
              </p>
              <p
                className={`font-vinasans text-6xl whitespace-nowrap ${titleColor2} relative top-[-6.5rem]`}
              >
                {title}
              </p>
              <p
                className={`font-vinasans text-6xl whitespace-nowrap ${titleColor3} relative top-[-13rem]`}
              >
                {title}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-between self-center px-[10%] z-10 relative">
            <div className="w-2/5 relative flex flex-col items-center justify-center px-15 my-10">
              <p className={`font-pikachu text-4xl font-extrabold ${infoColor1} m-0`}>
                {textCount}
              </p>
              <p className={`font-poppins ${infoColor2} text-2xl font-semibold m-1`}>
                Texts
              </p>
            </div>
            {reelCount > 0 ? (
              <div className="w-2/5 relative flex flex-col items-center justify-center px-15 my-10">
                <p className={`font-pikachu text-4xl font-extrabold ${infoColor1} m-0`}>
                  {reelCount}
                </p>
                <p className={`font-poppins ${infoColor2} text-2xl font-semibold m-1`}>
                  Reels
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const getMonthName = (monthNumber: number): string => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', { month: 'short' });
  };

  if (topChats.length > 0)
    return (
      <div
        id="download-chats"
        className="flex flex-col items-center justify-center w-[1080px] h-[120rem] pb-32 pt-60 px-16"
      >
        <div className="flex flex-row items-start justify-center mb-32">
          <Glitter
            width={50}
            height={50}
            style={{ position: 'relative', right: '1vw', bottom: '3vh', fill: '#ffd701' }}
          />
          <div className="flex flex-col items-start justify-center h-32">
            <p className="text-4xl font-extrabold italic font-pikachu align-middle text-white z-20">
              {"YOUR INSTAGRAM BESTIES '23"}
            </p>
            <p className="gr-bestie text-4xl font-extrabold italic text-white font-pikachu align-middle relative left-1 bottom-[4.75rem] z-10">
              {"YOUR INSTAGRAM BESTIES '23"}
            </p>
          </div>
          <Glitter
            width={50}
            height={50}
            style={{ position: 'relative', left: '1vw', top: '6vh', fill: '#ffd701' }}
          />
        </div>
        {Object.keys(topChats[0]).length > 0 &&
        Object.prototype.hasOwnProperty.call(topChats[0], 'totalTexts') &&
        topChats[0].totalTexts > 0 ? (
          <div className="w-4/5 h-[25rem] p-2 rounded-lg z-30">
            <div className="bg-blue-900 w-full h-[20rem] rounded-lg relative" />
            <div className="bg-white w-full h-[20rem] rounded-lg relative top-[-22rem]" />
            <div className="bg-cyan-300 w-full h-[20rem] rounded-lg relative top-[-44rem]">
              <div className="w-full relative top-[-1rem] flex flex-row items-start justify-start p-15">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-ultra text-blue-900 text-9xl relative bottom-12 ml-11 z-30">
                    1
                  </p>
                </div>
                <div className="flex flex-col items-start justify-center relative pl-6 mt-12 overflow-hidden">
                  <div className="font-vinasans text-7xl text-yellow-300">
                    {topChats[0].title}
                  </div>
                  <div className="font-vinasans h-0 text-7xl text-blue-900 relative top-[-5rem]">
                    {topChats[0].title}
                  </div>
                  <div className="font-vinasans h-0 text-7xl text-white relative top-[-5.5rem]">
                    {topChats[0].title}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between self-center px-[10%] relative">
                <div className="w-2/5 relative flex flex-col items-center justify-center p-15">
                  <p className="font-pikachu text-5xl font-extrabold text-blue-900 m-0">
                    {topChats[0].totalTexts}
                  </p>
                  <p className="font-poppins text-yellow-400 text-3xl font-semibold m-1">
                    Texts
                  </p>
                </div>
                <div className="absolute cheercat">
                  <img src={cheers} className="cheer-cat-img" alt="cheers cat" />
                </div>
                {topChats[0].totalReels ? (
                  <div className="w-2/5 relative flex flex-col items-center justify-center p-15">
                    <p className="font-pikachu text-5xl font-extrabold text-blue-900 m-0">
                      {topChats[0].totalReels}
                    </p>
                    <p className="font-poppins text-yellow-400 text-3xl font-semibold m-1">
                      Reels
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex w-full flex-row flex-wrap items-center justify-between my-20">
          {Object.keys(topChats[1]).length > 0 &&
          Object.prototype.hasOwnProperty.call(topChats[1], 'totalTexts') &&
          topChats[1].totalTexts > 0
            ? chatContainerMini({
                bgColor1: 'bg-green-600',
                bgColor2: 'bg-white',
                bgColor3: 'bg-lime-300',
                indexColor: 'text-green-600',
                infoColor1: 'text-green-600',
                infoColor2: 'text-white',
                reelCount: topChats[1].totalReels,
                textCount: topChats[1].totalTexts,
                topIndex: 2,
                title: topChats[1].title,
                titleColor1: 'text-amber-300',
                titleColor2: 'text-green-600',
                titleColor3: 'text-white',
                titleRef: top2ContainerRef,
              })
            : null}
          {Object.keys(topChats[2]).length > 0 &&
          Object.prototype.hasOwnProperty.call(topChats[2], 'totalTexts') &&
          topChats[2].totalTexts > 0
            ? chatContainerMini({
                bgColor1: 'bg-yellow-300',
                bgColor2: 'bg-white',
                bgColor3: 'bg-purple-500',
                indexColor: 'text-yellow-300',
                infoColor1: 'text-yellow-300',
                infoColor2: 'text-white',
                reelCount: topChats[2].totalReels,
                textCount: topChats[2].totalTexts,
                topIndex: 3,
                title: topChats[2].title,
                titleColor1: 'text-purple-200',
                titleColor2: 'text-yellow-300',
                titleColor3: 'text-white',
                titleRef: top3ContainerRef,
              })
            : null}
          {Object.keys(topChats[3]).length > 0 &&
          Object.prototype.hasOwnProperty.call(topChats[3], 'totalTexts') &&
          topChats[3].totalTexts > 0
            ? chatContainerMini({
                bgColor1: 'bg-blue-400',
                bgColor2: 'bg-white',
                bgColor3: 'bg-orange-500',
                indexColor: 'text-blue-400',
                infoColor1: 'text-blue-400',
                infoColor2: 'text-white',
                reelCount: topChats[3].totalReels,
                textCount: topChats[3].totalTexts,
                topIndex: 4,
                title: topChats[3].title,
                titleColor1: 'text-amber-400',
                titleColor2: 'text-blue-400',
                titleColor3: 'text-white',
                titleRef: top4ContainerRef,
              })
            : null}
          {Object.keys(topChats[4]).length > 0 &&
          Object.prototype.hasOwnProperty.call(topChats[4], 'totalTexts') &&
          topChats[4].totalTexts > 0
            ? chatContainerMini({
                bgColor1: 'bg-pink-500',
                bgColor2: 'bg-white',
                bgColor3: 'bg-yellow-300',
                indexColor: 'text-pink-500',
                infoColor1: 'text-purple-600',
                infoColor2: 'text-pink-500',
                reelCount: topChats[4].totalReels,
                textCount: topChats[4].totalTexts,
                topIndex: 5,
                title: topChats[4].title,
                titleColor1: 'text-purple-600',
                titleColor2: 'text-pink-500',
                titleColor3: 'text-white',
                titleRef: top5ContainerRef,
              })
            : null}
        </div>
      </div>
    );
  return <></>;
};

export default Chats;
