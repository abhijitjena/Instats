import './content.css';

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import ContentSelectors from '../../redux/selectors/contentSelector';
import rollingCat from '../../resources/cats/rollingcat.gif';
import sleepyCat from '../../resources/cats/sleepy2.gif';

const Content = (): ReactElement => {
  const contentHistory = useSelector(ContentSelectors.getContentData);
  const content23 = { posts: 0, reels: 0, stories: 0 };
  if (Object.hasOwn(contentHistory, '2023'))
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

  const is2023contentEmpty =
    content23.posts === 0 && content23.reels === 0 && content23.stories === 0;

  if (is2023contentEmpty && postTrendYearWise.length === 0) return <div />;

  return (
    <div className="flex flex-col items-center justify-center w-full my-80">
      <div className="pattern-moon pattern-bg-rose-400 pattern-rose-300 pattern-opacity-100 pattern-size-4 w-full h-[60rem] rounded-lg z-30 flex flex-col justify-start shadow-purple-700 shadow-[0_20px_0_0] relative">
        {!is2023contentEmpty ? (
          <div className="flex flex-col items-center justify-center relative bottom-14 right-6 z-50">
            <p className="text-4xl vert text-rose-800 font-vinasans align-middle bg-white w-96 rounded-full leading-[4.5rem] z-50 border-purple-700 border-[4px] shadow-amber-400 shadow-[1rem_1rem_0_0]">
              {"Content you've made in 2023"}
            </p>
            {/* <div className="bg-purple-800 w-96 h-20 rounded-full relative bottom-[5.4rem] left-2 z-40" /> */}
          </div>
        ) : null}
        {!is2023contentEmpty ? (
          <div className="rollingcat absolute -top-[6rem] z-40">
            <img src={rollingCat} width={120} height={120} alt="rolling cat" />
          </div>
        ) : null}
        {!is2023contentEmpty ? (
          <div className="flex flex-row items-center justify-around">
            {content23.posts > 0 ? (
              <div className="flex flex-col items-center justify-center">
                <p className="text-amber-200 text-7xl font-pikachu">{content23.posts}</p>
                <p className="text-white text-2xl font-bold font-poppins bg-purple-800 px-3 rounded-lg">
                  Posts
                </p>
              </div>
            ) : null}
            {content23.reels > 0 ? (
              <div className="flex flex-col items-center justify-center">
                <p className="text-amber-200 text-7xl font-pikachu">{content23.reels}</p>
                <p className="text-white text-2xl font-bold font-poppins bg-purple-800 px-3 rounded-lg">
                  Reels
                </p>
              </div>
            ) : null}
            {content23.stories > 0 ? (
              <div className="flex flex-col items-center justify-center">
                <p className="text-amber-200 text-7xl font-pikachu">
                  {content23.stories}
                </p>
                <p className="text-white text-2xl font-bold font-poppins bg-purple-800 px-3 rounded-lg">
                  Stories
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
        {postTrendYearWise.length > 0 ? (
          <>
            <div className="mt-10 mb-32 flex flex-col items-center justify-center bg-rose-100 mx-24 py-10 rounded-md relative">
              <div className="absolute left-[45%] -top-[7rem]">
                <img src={sleepyCat} width={180} height={180} alt="sleepy cat" />
              </div>
              <p className="text-6xl text-rose-600 my-5 font-vinasans">Content trends</p>
              <ResponsiveContainer width="80%" height={300}>
                <AreaChart
                  data={postTrendYearWise}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb7185" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRe" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ebd065" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ebd065" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7132a8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7132a8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" fontFamily="Poppins" stroke="#fb7185" />
                  <YAxis fontFamily="Poppins" stroke="#fb7185" />
                  {/* <CartesianGrid strokeDasharray="3 3" fontFamily="Poppins" /> */}
                  <Tooltip contentStyle={{ fontFamily: 'Poppins' }} />
                  <Area
                    type="monotone"
                    dataKey="Posts"
                    stroke="#fb7185"
                    fillOpacity={1}
                    fill="url(#colorPo)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Reels"
                    stroke="#ebd065"
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
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Content;
