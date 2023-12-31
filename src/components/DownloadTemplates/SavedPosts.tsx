import './likedPosts.css';
import './savedposts.css';

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import ContentSelectors from '../../redux/selectors/contentSelector';
import saveCat from '../../resources/cats/save.gif';
import sittingCat from '../../resources/cats/sit.gif';

const SavedPosts = (): ReactElement => {
  const savedPosts = useSelector(ContentSelectors.getSavedPostStats);
  const saveHistoryData: { name: string; saves: number; fill: string }[] = [];
  const colorOptions = ['#CC99C9', '#9EC1CF', '#9EE09E', '#FDFD97', '#FEB144', '#FF6663'];
  Object.entries(savedPosts.yearData).forEach(([year, saves], index) => {
    saveHistoryData.push({
      name: year,
      saves,
      fill: colorOptions[index],
    });
  });

  if (saveHistoryData.length === 0) return <div></div>;

  return (
    <div
      id="download-saves"
      className="flex flex-col items-center justify-center w-[1080px] h-[120rem] pb-32 pt-60 px-16 relative"
    >
      <div className="absolute top-32 left-[56%] z-50">
        <img src={saveCat} width={140} height={140} alt="save cat" />
      </div>
      <div className="pattern-bg-green-400 pattern-size-4 pattern-green-200 pattern-dots pattern-opacity-100 w-full h-[110rem] rounded-lg z-30 shadow-green-600 shadow-[0_20px_0_0]">
        <div className="flex flex-col items-center justify-center relative bottom-14 right-6">
          <p className="text-4xl text-purple-800 font-vinasans align-middle bg-white w-96 rounded-full leading-[4.5rem] z-50 border-amber-300 border-[4px] shadow-green-800 shadow-[1rem_1rem_0_0]">
            {'Posts you saved'}
          </p>
        </div>
        <div className="flex flex-col items-center justify-between w-full px-20">
          {savedPosts.yearData['2023'] > 0 ? (
            <div className="flex flex-col w-[36%] items-center justify-center mb-10">
              <p className="text-purple-700 text-9xl font-ultra">
                {savedPosts.yearData['2023']}
              </p>
              <p className="text-yellow-400 bg-white text-3xl font-pikachu">
                Posts saved in 2023
              </p>
            </div>
          ) : null}
        </div>
        <p className="text-5xl text-purple-700 mt-10 font-vinasans">
          Creator posts you saved this year
        </p>
        <div className="flex flex-row items-center justify-between w-full my-12 px-16 flex-wrap relative">
          <div className="absolute -top-20 z-50">
            <img src={sittingCat} width={140} height={140} alt="save cat" />
          </div>
          {savedPosts.topCreators.map((value) => {
            if (value[1] > 0)
              return (
                <div
                  key={value[0]}
                  className="w-[47%] mb-14 flex flex-col items-center justify-center"
                >
                  <div className="h-36 w-full rounded-xl p-4 relative flex flex-row items-center justify-between pattern-zigzag pattern-size-4 pattern-yellow-200 pattern-opacity-100 pattern-bg-yellow-300">
                    <p className="font-vinasans text-white text-[1.75rem] leading-[1.75rem] drop-shadow-[0_2px_2px_rgba(148,66,14,1)]">
                      {value[0]}
                    </p>
                    <div className="w-1/4">
                      <div className="bg-gradient-to-br from-purple-600 to-purple-900 flex flex-col items-center justify-center relative px-5 py-5 rounded-lg h-18 w-full">
                        <p className="text-green-300 font-pikachu font-bold text-[2.25rem] leading-[2.25rem] m-0">{`${value[1]}`}</p>
                        <p className="text-white font-poppins text-lg font-bold m-0">
                          saves
                        </p>
                      </div>
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

export default SavedPosts;
