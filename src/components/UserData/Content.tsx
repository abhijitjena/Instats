import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import ContentSelectors from '../../redux/selectors/contentSelector';

const Content = (): ReactElement => {
  const contentHistory = useSelector(ContentSelectors.getContentData);
  const content23 = { posts: 0, reels: 0, stories: 0 };
  Object.keys(contentHistory['2023']).forEach((month) => {
    content23.posts += contentHistory['2023'][month].posts;
    content23.reels += contentHistory['2023'][month].reels;
    content23.stories += contentHistory['2023'][month].stories;
  });

  const postTrendYearWise: {
    name: string;
    Posts: number;
    Reels: number;
    Stories: number;
  }[] = [];

  Object.keys(contentHistory).forEach((year) => {
    const totalPosts = Object.keys(contentHistory[year]).reduce(
      (total, month) => (total += contentHistory[year][month].posts),
      0,
    );
    const totalReels = Object.keys(contentHistory[year]).reduce(
      (total, month) => (total += contentHistory[year][month].reels),
      0,
    );
    const totalStories = Object.keys(contentHistory[year]).reduce(
      (total, month) => (total += contentHistory[year][month].stories),
      0,
    );
    postTrendYearWise.push({
      name: year,
      Posts: totalPosts,
      Reels: totalReels,
      Stories: totalStories,
    });
  });

  return (
    <div className="flex flex-col items-center justify-center w-full my-80">
      <div className="bg-yellow-100 w-full h-[60rem] rounded-lg z-30 flex flex-col justify-start shadow-violet-700 shadow-[20px_20px_0_0]">
        <div className="flex flex-col items-start justify-center relative bottom-14 right-6">
          <p className="text-4xl vert text-slate-800 font-vinasans align-middle bg-white w-96 rounded-full leading-[4.5rem] z-50 border-amber-300 border-[4px] shadow-purple-800 shadow-[1rem_1rem_0_0]">
            {"Content you've made in 2023"}
          </p>
          {/* <div className="bg-purple-800 w-96 h-20 rounded-full relative bottom-[5.4rem] left-2 z-40" /> */}
        </div>
        <div className="flex flex-row items-center justify-around">
          <div className="flex flex-col items-center justify-center">
            <p className="text-orange-600 text-6xl font-pikachu">{content23.posts}</p>
            <p className="text-orange-900 text-lg font-poppins">Posts</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-orange-600 text-6xl font-pikachu">{content23.reels}</p>
            <p className="text-orange-900 text-lg font-poppins">Reels</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-orange-600 text-6xl font-pikachu">{content23.stories}</p>
            <p className="text-orange-900 text-lg font-poppins">Stories</p>
          </div>
        </div>
        <p className="text-3xl text-violet-700 mt-10 font-vinasans">Content trends</p>
        <div className="mt-10 mb-32 flex flex-col items-center justify-center">
          <ResponsiveContainer width="80%" height={300}>
            <AreaChart
              data={postTrendYearWise}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e38232" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#e38232" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7132a8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7132a8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" fontFamily="Poppins" />
              <YAxis fontFamily="Poppins" />
              <CartesianGrid strokeDasharray="3 3" fontFamily="Poppins" />
              <Tooltip contentStyle={{ fontFamily: 'Poppins' }} />
              <Area
                type="monotone"
                dataKey="Posts"
                stroke="#e38232"
                fillOpacity={1}
                fill="url(#colorPo)"
              />
              <Area
                type="monotone"
                dataKey="Reels"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorRe)"
              />
              <Area
                type="monotone"
                dataKey="Stories"
                stroke="#7132a8"
                fillOpacity={1}
                fill="url(#colorSt)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Content;
