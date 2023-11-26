import './likedPosts.css';
import './chats.css';

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RadialBar, RadialBarChart, Tooltip } from 'recharts';

import ContentSelectors from '../../redux/selectors/contentSelector';
import { ReactComponent as Glitter } from '../../resources/glitter.svg';

const Chats = (): ReactElement => {
  const likedPosts = useSelector(ContentSelectors.getLikedPostsByCreator);
  const likeHistoryData: { name: string; likes: number; fill: string }[] = [];
  const colorOptions = [
    '#ba9feb',
    '#8c69c9',
    '#622ac7',
    '#3f0b9c',
    '#341966',
    '#180a30',
    '#2a0c38',
  ];
  Object.entries(likedPosts.yearData).forEach(([year, likes], index) => {
    likeHistoryData.push({
      name: year,
      likes,
      fill: colorOptions[index],
    });
  });

  let tooltip: any;

  return (
    <div className="flex flex-col items-center justify-center w-full h-[90rem]">
      <div className="flex flex-col items-start justify-center mb-16">
        <Glitter />
        <p className="text-4xl font-extrabold italic font-pikachu align-middle text-white z-20">
          {'YOUR INSTAGRAM BESTIES'}
        </p>
        <p className="gr-bestie text-4xl font-extrabold italic text-white font-pikachu align-middle relative left-1 bottom-[4.7rem] z-10">
          {'YOUR INSTAGRAM BESTIES'}
        </p>
      </div>
      <div className="bg-yellow-100 w-full h-[82rem] rounded-lg z-30 shadow-violet-700 shadow-[20px_20px_0_0]">
        <div className="flex flex-row items-center justify-around">
          <div className="flex flex-col items-center justify-center">
            <p className="text-orange-600 text-6xl font-pikachu">
              {likedPosts.yearData['2023']}
            </p>
            <p className="text-orange-900 text-lg font-poppins">Posts liked in 2023</p>
          </div>
          <div className="h-[2px] w-[35%] bg-orange-600" />
          <div className="flex flex-col items-center justify-center">
            <RadialBarChart
              width={400}
              height={400}
              innerRadius="10%"
              outerRadius="100%"
              data={likeHistoryData}
              startAngle={180}
              endAngle={0}
              cx={'50%'}
              cy={'70%'}
              barGap={20}
              barSize={25}
            >
              <RadialBar
                label={{
                  position: 'insideStart',
                  fill: '#fff',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins',
                  fontSize: 15,
                  // content: (props) => {
                  //   console.log('label props', props)
                  //   // Customize the label content here
                  //   const { value } = props;
                  //   const cs = props.viewBox as PolarViewBox;
                  //   return <text x={cs.cx || 0} y={cs.cy || 0}>{`${value}`}</text>;
                  // },
                }}
                background={{ fill: '#f0c38b' }}
                dataKey="likes"
                name="year"
                onMouseOver={() => (tooltip = 'likes')}
              />
              <Tooltip
                contentStyle={{ fontFamily: 'Poppins' }}
                content={({ active, payload }) => {
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
        <p className="text-2xl text-violet-700 mt-10 font-vinasans">
          Creators you liked this year
        </p>
        <div className="flex flex-row items-center justify-between w-full mt-10 pr-28 pl-10">
          <div>
            <div className="w-80 h-24 rounded-xl p-8 relative left-2 top-[5.5rem] flex flex-row items-center justify-between pattern-wavy pattern-yellow-100 pattern-opacity-100 pattern-bg-yellow-400 pattern-size-8">
              <p className="font-vinasans text-white text-[1.75rem] drop-shadow-[0_2px_2px_rgba(207,163,24,1)]">
                {likedPosts.topCreators[0][0]}
              </p>
              <div className="starburst bg-gradient-to-r from-indigo-600 to-indigo-950 flex flex-col items-center justify-center relative left-20">
                <p className="text-white font-pikachu font-bold text-[2.25rem] leading-[2.25rem] m-0">{`${likedPosts.topCreators[0][1]}`}</p>
                <p className="text-slate-300 font-poppins text-lg m-0">Likes</p>
              </div>
            </div>
            <div className="bg-yellow-500 w-80 h-24 rounded-xl" />
          </div>
          <div>
            <div className="w-80 h-24 rounded-xl p-8 relative left-2 top-[5.5rem] flex flex-row items-center justify-between pattern-wavy pattern-slate-100 pattern-opacity-100 pattern-bg-slate-300 pattern-size-8">
              <p className="font-vinasans text-white text-[1.75rem] drop-shadow-[0_2px_2px_rgba(122,135,150,1)]">
                {likedPosts.topCreators[1][0]}
              </p>
              <div className="starburst bg-gradient-to-r from-indigo-600 to-indigo-950 flex flex-col items-center justify-center relative left-3">
                <p className="text-white font-pikachu font-bold text-[2.25rem] leading-[2.25rem] m-0">{`${likedPosts.topCreators[1][1]}`}</p>
                <p className="text-slate-300 font-poppins text-lg m-0">Likes</p>
              </div>
            </div>
            <div className="bg-slate-400 w-80 h-24 rounded-xl" />
          </div>
          <div>
            <div className="w-80 h-24 rounded-xl p-8 relative left-2 top-[5.5rem] flex flex-row items-center justify-between pattern-wavy pattern-amber-500 pattern-opacity-100 pattern-bg-amber-800 pattern-size-8">
              <p className="font-vinasans text-white text-[1.75rem] drop-shadow-[0_2px_2px_rgba(237,190,38,1)]">
                {likedPosts.topCreators[2][0]}
              </p>
              <div className="starburst bg-gradient-to-r from-indigo-600 to-indigo-950 flex flex-col items-center justify-center relative left-20">
                <p className="text-white font-pikachu font-bold text-[2.25rem] leading-[2.25rem] m-0">{`${likedPosts.topCreators[2][1]}`}</p>
                <p className="text-slate-300 font-poppins text-lg m-0">Likes</p>
              </div>
            </div>
            <div className="bg-amber-800 w-80 h-24 rounded-xl" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full mb-6 pr-36 pl-12">
          {[3, 4, 5].map((value) => {
            return (
              <div
                key={value}
                className="w-72 h-20 rounded-xl p-8 relative left-2 top-[5.5rem] flex flex-row items-center justify-between pattern-wavy pattern-indigo-500 pattern-opacity-100 pattern-bg-indigo-800 pattern-size-8"
              >
                <p className="font-vinasans text-white text-[1.75rem] drop-shadow-[0_2px_2px_rgba(118,133,156,1)]">
                  {likedPosts.topCreators[value][0]}
                </p>
                <div className="bg-gradient-to-br from-slate-100 to-slate-500 flex flex-col items-center justify-center relative left-20 px-5 py-5 rounded-lg">
                  <p className="text-blue-800 font-pikachu font-bold text-[2.25rem] leading-[2.25rem] m-0">{`${likedPosts.topCreators[value][1]}`}</p>
                  <p className="text-white font-poppins text-lg m-0">Likes</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row items-center justify-between w-full my-20 pr-36 pl-12">
          {[6, 7, 8, 9].map((value) => {
            return (
              <div
                key={value}
                className="w-48 h-16 rounded-xl p-8 relative left-2 top-[5.5rem] flex flex-row items-center justify-between pattern-wavy pattern-indigo-500 pattern-opacity-100 pattern-bg-indigo-800 pattern-size-8"
              >
                <p className="font-vinasans text-white text-[1.25rem] drop-shadow-[0_2px_2px_rgba(118,133,156,1)]">
                  {likedPosts.topCreators[value][0]}
                </p>
                <div className="bg-gradient-to-br from-slate-100 to-slate-500 flex flex-col items-center justify-center relative left-10 px-5 py-5 rounded-lg">
                  <p className="text-blue-800 font-pikachu font-bold text-[2.25rem] leading-[2.25rem] m-0">{`${likedPosts.topCreators[value][1]}`}</p>
                  <p className="text-white font-poppins text-lg m-0">Likes</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chats;
