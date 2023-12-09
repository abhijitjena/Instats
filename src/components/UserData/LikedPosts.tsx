import './likedPosts.css';

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RadialBar, RadialBarChart, Tooltip } from 'recharts';

import ContentSelectors from '../../redux/selectors/contentSelector';
import catSkates from '../../resources/cats/catSkates.gif';
import catLike from '../../resources/cats/like.gif';
import catLikes from '../../resources/cats/likes.gif';

const LikedPosts = (): ReactElement => {
  const likedPosts = useSelector(ContentSelectors.getLikedPostsByCreator);
  const likeHistoryData: { name: string; likes: number; fill: string }[] = [];
  const colorOptions = ['#CC99C9', '#9EC1CF', '#9EE09E', '#FDFD97', '#FEB144', '#FF6663'];
  Object.entries(likedPosts.yearData).forEach(([year, likes], index) => {
    likeHistoryData.push({
      name: year,
      likes,
      fill: colorOptions[index],
    });
  });

  let tooltip: any;

  if (likeHistoryData.length === 0) return <div></div>;

  return (
    <div className="flex flex-col items-center justify-center w-full h-[120rem] mt-20">
      <div className="pattern-bg-yellow-100 pattern-size-4 pattern-yellow-200 pattern-diagonal-lines pattern-opacity-100 w-full h-[120rem] rounded-lg z-30 shadow-orange-600 shadow-[0_20px_0_0]">
        <div className="flex flex-col items-center justify-center relative bottom-14 right-6">
          <p className="text-4xl text-slate-800 font-vinasans align-middle bg-white w-96 rounded-full leading-[4.5rem] z-50 border-amber-300 border-[4px] shadow-purple-800 shadow-[1rem_1rem_0_0]">
            {'Posts you liked'}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between w-full px-20 h-[30rem]">
          {likedPosts.yearData['2023'] > 0 ? (
            <div className="flex flex-col w-[36%] h-16 items-center justify-center">
              <div className="flex flex-row items-center justify-center relative">
                <p className="text-purple-800 text-9xl font-ultra">
                  {likedPosts.yearData['2023']}
                </p>
                <div className="absolute z-50 -right-24">
                  <img src={catLike} width={140} height={140} alt="likes cat" />
                </div>
              </div>
              <p className="text-rose-400 text-3xl font-pikachu">Posts liked in 2023</p>
            </div>
          ) : null}
          {/* <div className="h-[2px] w-[20%] bg-orange-200" /> */}
          <div className="flex w-[54%] flex-col items-center justify-center bg-yellow-100 rounded-lg h-96">
            <RadialBarChart
              width={600}
              height={600}
              innerRadius="10%"
              outerRadius="100%"
              data={likeHistoryData}
              startAngle={180}
              endAngle={0}
              cx={'50%'}
              cy={'70%'}
              barGap={20}
              barSize={35}
            >
              <RadialBar
                label={{
                  position: 'insideStart',
                  fill: '#661040',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins',
                  fontSize: 15,
                }}
                background={{ fill: '#f7df7e', opacity: 0.3 }}
                dataKey="likes"
                name="year"
                onMouseOver={() => (tooltip = 'likes')}
              />
              <Tooltip
                contentStyle={{ fontFamily: 'Poppins' }}
                content={({ payload }) => {
                  // if (!active || !tooltip) return null;
                  if (payload) {
                    for (const bar of payload)
                      if (bar.dataKey === tooltip)
                        return (
                          <div
                            style={{
                              backgroundColor: 'white',
                              borderRadius: 4,
                            }}
                          >
                            <p
                              style={{
                                fontFamily: 'Poppins',
                                color: '#ea580c',
                                fontWeight: 'normal',
                                lineHeight: 3,
                                margin: 10,
                              }}
                            >{`${bar.payload.name}: ${bar.payload.likes} likes`}</p>
                          </div>
                        );
                  }
                  return null;
                }}
              />
            </RadialBarChart>
          </div>
        </div>
        <p className="text-5xl text-rose-700 mt-10 font-vinasans">
          Creators you liked this year
        </p>
        <div className="flex flex-col items-center justify-between w-full mt-10 px-20">
          {likedPosts.topCreators[0] &&
          likedPosts.topCreators[0].length > 0 &&
          likedPosts.topCreators[0][1] > 0 ? (
            <div className="w-3/5 mx-[20%] items-center justify-center flex">
              <div className="relative -top-36 left-[78%] z-50">
                <img src={catLikes} width={140} height={140} alt="likes cat" />
              </div>
              <div className="w-full h-40 shadow-yellow-500 shadow-[0_10px_0_0] rounded-xl p-8 relative flex flex-row items-center justify-between pattern-wavy pattern-yellow-100 pattern-opacity-100 pattern-bg-yellow-400 pattern-size-8">
                <p className="font-vinasans text-white text-[4rem] drop-shadow-[0_2px_2px_rgba(207,163,24,1)]">
                  {likedPosts.topCreators[0][0]}
                </p>
              </div>
              <div className="w-0">
                <div className="starburst stb-large bg-gradient-to-r from-red-500 to-yellow-300 flex flex-col items-center justify-center relative left-[-8rem]">
                  <p className="text-white font-pikachu font-bold text-[3rem] leading-[3rem] m-0">{`${likedPosts.topCreators[0][1]}`}</p>
                  <p className="text-yellow-200 font-poppins text-2xl m-0">Likes</p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="w-full flex flex-row items-center justify-between my-12">
            {likedPosts.topCreators[1] &&
            likedPosts.topCreators[1].length > 0 &&
            likedPosts.topCreators[1][1] > 0 ? (
              <div className="w-[45%] items-center justify-center flex flex-row">
                <div className="w-full h-24 rounded-xl p-8 relative flex flex-row items-center justify-between pattern-wavy pattern-slate-100 pattern-opacity-100 pattern-bg-slate-300 pattern-size-8 shadow-slate-400 shadow-[0_10px_0_0]">
                  <p className="font-vinasans text-white text-[1.75rem] drop-shadow-[0_2px_2px_rgba(122,135,150,1)]">
                    {likedPosts.topCreators[1][0]}
                  </p>
                </div>
                <div className="w-0">
                  <div className="starburst bg-gradient-to-r from-red-500 to-blue-600 flex flex-col items-center justify-center relative left-[-8rem]">
                    <p className="text-white font-pikachu font-bold text-[2.25rem] leading-[2.25rem] m-0">{`${likedPosts.topCreators[1][1]}`}</p>
                    <p className="text-pink-300 font-poppins text-lg m-0">Likes</p>
                  </div>
                </div>
              </div>
            ) : null}
            {likedPosts.topCreators[2] &&
            likedPosts.topCreators[2].length > 0 &&
            likedPosts.topCreators[2][1] > 0 ? (
              <div className="w-[45%] items-center justify-center flex flex-row">
                <div className="w-full h-24 rounded-xl p-8 relative flex flex-row items-center justify-between pattern-wavy pattern-amber-500 pattern-opacity-100 pattern-bg-amber-800 pattern-size-8 shadow-amber-800 shadow-[0_10px_0_0]">
                  <p className="font-vinasans text-white text-[1.75rem] drop-shadow-[0_2px_2px_rgba(237,190,38,1)]">
                    {likedPosts.topCreators[2][0]}
                  </p>
                </div>
                <div className="w-0">
                  <div className="starburst bg-gradient-to-r from-slate-50 to-slate-400 flex flex-col items-center justify-center relative left-[-8rem]">
                    <p className="text-white font-pikachu font-bold text-[2.25rem] leading-[2.25rem] m-0">{`${likedPosts.topCreators[2][1]}`}</p>
                    <p className="text-blue-700 font-poppins text-lg m-0">Likes</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full my-12 px-20 flex-wrap relative">
          <div className="skateCat absolute top-10 z-50">
            <img src={catSkates} width={220} height={220} alt="skates cat" />
          </div>
          {likedPosts.topCreators.slice(3, likedPosts.topCreators.length).map((value) => {
            if (value[1] > 0)
              return (
                <div
                  key={value[0]}
                  className="w-[45%] mb-14 mx-6 flex flex-row items-center justify-center"
                >
                  <div className="h-20 w-full rounded-xl p-8 relative flex flex-row items-center justify-between pattern-zigzag pattern-size-4 pattern-purple-500 pattern-opacity-100 pattern-bg-purple-700">
                    <p className="font-vinasans text-white text-[1.5rem] drop-shadow-[0_2px_2px_rgba(148,66,14,1)]">
                      {value[0]}
                    </p>
                  </div>
                  <div className="w-0">
                    <div className="bg-gradient-to-br from-red-100 to-red-200 flex flex-col items-center justify-center relative left-[-6rem] px-5 py-5 rounded-lg h-24 w-24">
                      <p className="text-rose-600 font-pikachu font-bold text-[2.25rem] leading-[2.25rem] m-0">{`${value[1]}`}</p>
                      <p className="text-purple-700 font-poppins text-lg font-bold m-0">
                        Likes
                      </p>
                    </div>
                  </div>
                </div>
              );
            return <></>;
          })}
        </div>
      </div>
    </div>
  );
};

export default LikedPosts;
