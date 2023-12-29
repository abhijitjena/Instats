import './likedPosts.css';
import './follow.css';

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

import UserSelectors from '../../redux/selectors/userSelector';

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
    <div
      id="download-follows"
      className="flex flex-col items-center justify-center w-[1080px] h-[120rem] pb-32 pt-60 px-16"
    >
      <div className="pattern-bg-cyan-100 pattern-size-6 pattern-cyan-200 pattern-zigzag-3d pattern-opacity-100 w-full h-[120rem] rounded-lg z-30 shadow-blue-600 shadow-[0_20px_0_0] relative">
        <div className="flex flex-col items-center justify-center relative bottom-14 right-6">
          <p className="text-4xl text-blue-900 font-vinasans align-middle bg-white w-96 rounded-full leading-[4.5rem] z-50 border-blue-500 border-[4px] shadow-yellow-400 shadow-[1rem_1rem_0_0]">
            {'Followers and Following'}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full px-20">
          <div className="flex flex-col w-[90%] h-[40rem] items-center justify-start mt-10">
            {followHistory.followerHistory['2023'] > 0 ? (
              <div className="flex flex-col w-full items-center justify-start">
                <p className="text-blue-400 text-9xl font-ultra">
                  {followHistory.followerHistory['2023']}
                </p>
                <p className="text-blue-900 text-3xl font-pikachu">
                  New followers in 2023
                </p>
              </div>
            ) : null}
            <div className="mt-5">
              <BarChart width={800} height={300} data={followerHistoryData}>
                <XAxis dataKey="name" stroke="#1e3a8a" />
                <YAxis stroke="#1e3a8a" />
                <Bar dataKey="followers" fill="#facc15" background={false}>
                  <LabelList dataKey="followers" fill="white" fontWeight="bold" />
                </Bar>
              </BarChart>
            </div>
          </div>
          <div className="flex flex-col w-[90%] h-[40rem] items-center justify-start mt-20">
            {followHistory.followingHistory['2023'] > 0 ? (
              <div className="flex flex-col w-full items-center justify-start">
                <p className="text-blue-400 text-9xl font-ultra">
                  {followHistory.followingHistory['2023']}
                </p>
                <p className="text-blue-900 text-3xl font-pikachu">
                  New people followed in 2023
                </p>
              </div>
            ) : null}
            <div className="mt-5">
              <BarChart width={800} height={300} data={followingHistoryData}>
                <XAxis dataKey="name" stroke="#1e3a8a" />
                <YAxis stroke="#1e3a8a" />
                <Bar dataKey="following" fill="#facc15" background={false}>
                  <LabelList dataKey="following" fill="white" fontWeight="bold" />
                </Bar>
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowersFollowing;
