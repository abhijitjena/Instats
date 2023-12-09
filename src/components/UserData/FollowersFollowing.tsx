import './likedPosts.css';
import './follow.css';

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

import UserSelectors from '../../redux/selectors/userSelector';
import followCat from '../../resources/cats/catFollow.gif';

const FollowersFollowing = (): ReactElement => {
  const followHistory = useSelector(UserSelectors.getFollowHistory);
  const followerHistoryData: { name: string; followers: number }[] = [];
  const followingHistoryData: { name: string; following: number }[] = [];

  Object.entries(followHistory.followerHistory).forEach(([year, count]) => {
    followerHistoryData.push({
      name: year,
      followers: count,
    });
  });

  Object.entries(followHistory.followingHistory).forEach(([year, count]) => {
    followingHistoryData.push({
      name: year,
      following: count,
    });
  });

  if (
    Object.keys(followHistory.followerHistory).length === 0 &&
    Object.keys(followHistory.followingHistory).length === 0
  )
    return <div></div>;

  return (
    <div className="flex flex-col items-center justify-center w-full h-[60rem] mt-20">
      <div className="pattern-bg-cyan-100 pattern-size-6 pattern-cyan-200 pattern-zigzag-3d pattern-opacity-100 w-full h-[120rem] rounded-lg z-30 shadow-blue-600 shadow-[0_20px_0_0] relative">
        <div className="flex flex-col items-center justify-center relative bottom-14 right-6">
          <p className="text-4xl text-blue-900 font-vinasans align-middle bg-white w-96 rounded-full leading-[4.5rem] z-50 border-blue-500 border-[4px] shadow-yellow-400 shadow-[1rem_1rem_0_0]">
            {'Followers and Following'}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between w-full px-20 h-[50rem]">
          <div className="flex flex-col w-[45%] h-[45rem] items-center justify-start mt-10">
            {followHistory.followerHistory['2023'] > 0 ? (
              <div className="flex flex-col w-full h-[20rem] items-center justify-start">
                <p className="text-blue-400 text-9xl font-ultra">
                  {followHistory.followerHistory['2023']}
                </p>
                <p className="text-blue-900 text-3xl font-pikachu">
                  New followers in 2023
                </p>
              </div>
            ) : null}
            <div className="mt-20">
              <BarChart width={450} height={300} data={followerHistoryData}>
                <XAxis dataKey="name" stroke="#1e3a8a" />
                <YAxis stroke="#1e3a8a" />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar
                  dataKey="followers"
                  fill="#facc15"
                  background={false}
                  activeBar={{ stroke: 'blue', strokeWidth: 2 }}
                />
              </BarChart>
            </div>
          </div>
          <div className="absolute followcat">
            <img src={followCat} width={180} height={180} alt="follow cat" />
          </div>
          <div className="flex flex-col w-[45%] h-[45rem] items-center justify-start mt-10">
            {followHistory.followingHistory['2023'] > 0 ? (
              <div className="flex flex-col w-full h-[20rem] items-center justify-start">
                <p className="text-blue-400 text-9xl font-ultra">
                  {followHistory.followingHistory['2023']}
                </p>
                <p className="text-blue-900 text-3xl font-pikachu">
                  New people followed in 2023
                </p>
              </div>
            ) : null}
            <div className="mt-20">
              <BarChart width={450} height={300} data={followingHistoryData}>
                <XAxis dataKey="name" stroke="#1e3a8a" />
                <YAxis stroke="#1e3a8a" />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar
                  dataKey="following"
                  fill="#facc15"
                  background={false}
                  activeBar={{ stroke: 'blue', strokeWidth: 2 }}
                />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowersFollowing;
