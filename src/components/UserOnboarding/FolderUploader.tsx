import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IChatDateMap, ISingleChat } from '../../redux/interfaces/chatInterface';
import {
  ILikedCreators,
  ILikedPostStats,
  IPostDateMap,
} from '../../redux/interfaces/contentInterface';
import ChatSelectors from '../../redux/selectors/chatSelector';
import ContentSelectors from '../../redux/selectors/contentSelector';
import UserSelectors from '../../redux/selectors/userSelector';
import { chatActions, resetChatSlice } from '../../redux/slices/chatSlice';
import { contentActions, resetContentSlice } from '../../redux/slices/contentSlice';
import { resetUserSlice, userActions } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/store';
import jumpCat from '../../resources/cats/jump.gif';
import playCat from '../../resources/cats/play.gif';
import { FileUtils } from '../../utils/FileUtils';
import SectionTitle from '../SectionTitle';
import UploadButton from '../UploadButton';

const FolderUploader = (): React.ReactElement => {
  const [contentUploading, setContentUploading] = useState(false);
  const [contentUploaded, setContentUploaded] = useState(false);

  const [followerUploading, setFollowerUploading] = useState(false);
  const [followerUploaded, setFollowerUploaded] = useState(false);

  const [followingUploading, setFollowingUploading] = useState(false);
  const [followingUploaded, setFollowingUploaded] = useState(false);

  const [likesUploading, setLikesUploading] = useState(false);
  const [likesUploaded, setLikesUploaded] = useState(false);

  const [inboxUploading, setInboxUploading] = useState(false);
  const [inboxUploaded, setInboxUploaded] = useState(false);

  const [savesUploading, setSavesUploading] = useState(false);
  const [savesUploaded, setSavesUploaded] = useState(false);

  const dispatch = useAppDispatch();

  const isPostDataUploaded = useSelector(ContentSelectors.getPostDataUploaded);
  const isLikedPostDataUploaded = useSelector(ContentSelectors.getLikedPostDataUploaded);
  const isSavedPostDataUploaded = useSelector(ContentSelectors.getSavedPostDataUploaded);
  const isChatDataUploaded = useSelector(ChatSelectors.getChatDataUploaded);
  const isFollowDataUploaded = useSelector(UserSelectors.getFollowDataUploaded);

  useEffect(() => {
    if (isPostDataUploaded) setContentUploaded(true);
    if (isLikedPostDataUploaded) setLikesUploaded(true);
    if (isSavedPostDataUploaded) setSavesUploaded(true);
    if (isChatDataUploaded) setInboxUploaded(true);
    if (isFollowDataUploaded) {
      setFollowerUploaded(true);
      setFollowingUploaded(true);
    }
  }, []);

  const retrieveContentFiles = (files: FileList | null) => {
    setContentUploading(true);
    const contentMap: IPostDateMap = {};
    console.time('content upload');
    if (files) {
      const jsonFiles = [...files].filter((item) => item.type === 'application/json');
      const promise = new Promise((resolve) => {
        jsonFiles.forEach((file) => {
          if (
            file.webkitRelativePath
              .substring(
                file.webkitRelativePath.indexOf('/') + 1,
                file.webkitRelativePath.length,
              )
              .startsWith('posts')
          ) {
            FileUtils.fileToDataUri(file).then((dataUri: any) => {
              if (dataUri) {
                fetch(dataUri.toString())
                  .then((response) => response.json())
                  .then((data) => {
                    data.forEach((media: any) => {
                      const isSingleMedia = media.media.length === 1;
                      const postMonth = isSingleMedia
                        ? new Date(media.media[0].creation_timestamp * 1000).getMonth()
                        : new Date(media.creation_timestamp * 1000).getMonth();
                      const postYear = isSingleMedia
                        ? new Date(media.media[0].creation_timestamp * 1000).getFullYear()
                        : new Date(media.creation_timestamp * 1000).getFullYear();
                      if (!contentMap[postYear]) contentMap[postYear] = {};
                      if (!contentMap[postYear][postMonth])
                        contentMap[postYear][postMonth] = {
                          posts: 0,
                          reels: 0,
                          stories: 0,
                        };
                      const prevPostCount = contentMap[postYear][postMonth].posts;
                      contentMap[postYear][postMonth].posts = prevPostCount + 1;
                    });
                  });
              }
            });
          }

          if (file.webkitRelativePath.includes('stories')) {
            FileUtils.fileToDataUri(file).then((dataUri: any) => {
              if (dataUri) {
                fetch(dataUri.toString())
                  .then((response) => response.json())
                  .then((data) => {
                    data.ig_stories.forEach((story: any) => {
                      const storyMonth = new Date(
                        story.creation_timestamp * 1000,
                      ).getMonth();
                      const storyYear = new Date(
                        story.creation_timestamp * 1000,
                      ).getFullYear();
                      if (!contentMap[storyYear]) contentMap[storyYear] = {};
                      if (!contentMap[storyYear][storyMonth])
                        contentMap[storyYear][storyMonth] = {
                          posts: 0,
                          reels: 0,
                          stories: 0,
                        };
                      const prevStoryCount = contentMap[storyYear][storyMonth].stories;
                      contentMap[storyYear][storyMonth].stories = prevStoryCount + 1;
                    });
                  });
              }
            });
          }

          if (file.webkitRelativePath.includes('reels')) {
            FileUtils.fileToDataUri(file).then((dataUri: any) => {
              if (dataUri) {
                fetch(dataUri.toString())
                  .then((response) => response.json())
                  .then((data) => {
                    data.ig_reels_media.forEach((reel: any) => {
                      const reelMonth = new Date(
                        reel.media[0].creation_timestamp * 1000,
                      ).getMonth();
                      const reelYear = new Date(
                        reel.media[0].creation_timestamp * 1000,
                      ).getFullYear();
                      if (!contentMap[reelYear]) contentMap[reelYear] = {};
                      if (!contentMap[reelYear][reelMonth])
                        contentMap[reelYear][reelMonth] = {
                          posts: 0,
                          reels: 0,
                          stories: 0,
                        };
                      const prevReelCount = contentMap[reelYear][reelMonth].reels;
                      contentMap[reelYear][reelMonth].reels = prevReelCount + 1;
                    });
                  });
              }
            });
          }
        });

        setTimeout(() => {
          resolve(1);
        }, 4000);
      });

      promise.then(() => {
        setContentUploading(false);
        setContentUploaded(true);
        dispatch(contentActions.setContentInfo(contentMap));
        dispatch(contentActions.setPostDataUploaded(true));
        console.timeEnd('content upload');
      });
    }
  };

  const retrieveFollowFiles = (files: FileList | null) => {
    setFollowerUploading(true);
    setFollowingUploading(true);
    const followerHistory: { [year: string]: number } = {};
    const followingHistory: { [year: string]: number } = {};
    if (files) {
      const jsonFiles = [...files].filter((item) => item.type === 'application/json');
      jsonFiles.forEach((file, index) => {
        if (
          file.webkitRelativePath
            .substring(
              file.webkitRelativePath.indexOf('/') + 1,
              file.webkitRelativePath.length,
            )
            .startsWith('following') &&
          !file.webkitRelativePath
            .substring(
              file.webkitRelativePath.indexOf('/') + 1,
              file.webkitRelativePath.length,
            )
            .includes('hashtag')
        ) {
          console.time(`following upload ${index}`);
          FileUtils.fileToDataUri(file).then((dataUri: any) => {
            if (dataUri) {
              fetch(dataUri.toString())
                .then((response) => response.json())
                .then((data) => {
                  for (let i = 2018; i <= new Date().getFullYear(); i++) {
                    const followingForYear = data.relationships_following.filter(
                      (media: any) =>
                        media.string_list_data[0].timestamp * 1000 >=
                          new Date(i, 0, 1, 0, 0, 0).getTime() &&
                        media.string_list_data[0].timestamp * 1000 <=
                          new Date(i, 11, 31, 23, 59, 59).getTime(),
                    );
                    followingHistory[i] = followingForYear.length;
                  }
                })
                .then(() => {
                  setFollowingUploading(false);
                  setFollowingUploaded(true);
                  dispatch(userActions.setFollowingHistory(followingHistory));
                  console.timeEnd(`following upload ${index}`);
                });
            }
          });
        }
        if (
          file.webkitRelativePath
            .substring(
              file.webkitRelativePath.indexOf('/') + 1,
              file.webkitRelativePath.length,
            )
            .includes('followers')
        ) {
          console.time(`follower upload ${index}`);
          FileUtils.fileToDataUri(file).then((dataUri: any) => {
            if (dataUri) {
              fetch(dataUri.toString())
                .then((response) => response.json())
                .then((data) => {
                  for (let i = 2018; i <= new Date().getFullYear(); i++) {
                    const followersForYear = data.filter(
                      (media: any) =>
                        media.string_list_data[0].timestamp * 1000 >=
                          new Date(i, 0, 1, 0, 0, 0).getTime() &&
                        media.string_list_data[0].timestamp * 1000 <=
                          new Date(i, 11, 31, 23, 59, 59).getTime(),
                    );
                    followerHistory[i] = followersForYear.length;
                  }
                })
                .then(() => {
                  setFollowerUploading(false);
                  setFollowerUploaded(true);
                  dispatch(userActions.setFollowDataUploaded(true));
                  dispatch(userActions.setFollowerHistory(followerHistory));
                  console.timeEnd(`follower upload ${index}`);
                });
            }
          });
        }
      });
    }
  };

  const retrieveLikesFiles = (files: FileList | null) => {
    setLikesUploading(true);
    let creatorLikeMap: ILikedCreators = {};
    const likedPostStats: ILikedPostStats = {
      yearData: {},
      topCreators: [],
    };
    if (files) {
      const jsonFiles = [...files].filter((item) => item.type === 'application/json');
      jsonFiles.forEach((file, index) => {
        if (file.webkitRelativePath.includes('liked_posts')) {
          console.time(`like upload ${index}`);
          FileUtils.fileToDataUri(file).then((dataUri: any) => {
            if (dataUri) {
              fetch(dataUri.toString())
                .then((response) => response.json())
                .then((data) => {
                  for (let i = 2018; i <= new Date().getFullYear(); i++) {
                    const likesForYear = data.likes_media_likes.filter(
                      (media: any) =>
                        media.string_list_data[0].timestamp * 1000 >=
                          new Date(i, 0, 1, 0, 0, 0).getTime() &&
                        media.string_list_data[0].timestamp * 1000 <=
                          new Date(i, 11, 31, 23, 59, 59).getTime(),
                    );
                    likedPostStats.yearData[i] = likesForYear.length;
                  }
                  const likes2023 = data.likes_media_likes.filter(
                    (media: any) =>
                      media.string_list_data[0].timestamp * 1000 >=
                        new Date(2023, 0, 1, 0, 0, 0).getTime() &&
                      media.string_list_data[0].timestamp * 1000 <=
                        new Date(2023, 11, 31, 23, 59, 59).getTime(),
                  );
                  likes2023.forEach((media: any, index: number) => {
                    const creator = media.title as string;
                    if (!creatorLikeMap[creator])
                      creatorLikeMap = { ...creatorLikeMap, [creator]: 0 };

                    const prevLikes = creatorLikeMap[creator];
                    creatorLikeMap[creator] = prevLikes + 1;
                  });
                })
                .then(() => {
                  setLikesUploading(false);
                  setLikesUploaded(true);
                  const topCreators = Object.entries(creatorLikeMap)
                    .sort((a, b) => (a[1] < b[1] ? 1 : -1))
                    .slice(0, 10);
                  likedPostStats.topCreators = topCreators;
                  dispatch(contentActions.setLikedPostDataUploaded(true));
                  dispatch(contentActions.setCreatorLikesInfo(likedPostStats));
                  console.timeEnd(`like upload ${index}`);
                });
            }
          });
        }
      });
    }
  };

  const retrieveInboxFiles = (files: FileList | null) => {
    setInboxUploading(true);

    if (files) {
      const jsonFiles = [...files].filter((item) => item.type === 'application/json');
      console.time('upload start2');
      // chats file map
      const chatFileMap = new Map<string, number>();
      jsonFiles.forEach((file) => {
        const filePath = file.webkitRelativePath.substring(
          0,
          file.webkitRelativePath.lastIndexOf('/'),
        );
        if (!chatFileMap.has(filePath)) chatFileMap.set(filePath, file.size);
        else {
          const prevSize = chatFileMap.get(filePath) || 0;
          chatFileMap.set(filePath, prevSize + file.size);
        }
      });
      const topChatArray = [...chatFileMap.entries()]
        .sort((a, b) => (a[1] < b[1] ? 1 : -1))
        .slice(0, 30);
      const topChatNames = topChatArray.map((value) => value[0]);

      const nameDecode = (input: string): string => {
        const utf8 = new Uint8Array(
          Array.prototype.map.call(input, (c) => c.charCodeAt(0)) as any,
        );
        return new TextDecoder('utf8').decode(utf8);
      };

      jsonFiles.forEach((file, index) => {
        let fileData: ISingleChat = {
          dateMap: {},
          threadName: '',
          title: '',
          totalReels: 0,
          totalTexts: 0,
        };
        FileUtils.fileToDataUri(file).then((dataUri: any) => {
          if (dataUri) {
            fetch(dataUri.toString())
              .then((response) => response.json())
              .then((data) => {
                if (topChatNames.includes(data.thread_path)) {
                  const chatId = data.thread_path;
                  const title = nameDecode(data.title);
                  const chatStore: IChatDateMap = {};
                  let totalReels = 0;
                  let totalTexts = 0;

                  data.messages.forEach((message: any) => {
                    const messageDate = new Date(message.timestamp_ms).getDate();
                    const messageMonth = new Date(message.timestamp_ms).getMonth();
                    const messageYear = new Date(message.timestamp_ms).getFullYear();
                    if (!chatStore[messageYear]) chatStore[messageYear] = {};
                    if (!chatStore[messageYear][messageMonth])
                      chatStore[messageYear][messageMonth] = {};
                    if (!chatStore[messageYear][messageMonth][messageDate])
                      chatStore[messageYear][messageMonth][messageDate] = {
                        numOfReels: 0,
                        numOfTexts: 0,
                      };

                    let prevReelValue =
                      chatStore[messageYear]?.[messageMonth]?.[messageDate]?.numOfReels ||
                      0;

                    let prevTextValue =
                      chatStore[messageYear]?.[messageMonth]?.[messageDate]?.numOfTexts ||
                      0;

                    totalTexts += 1;

                    if (chatStore[messageYear][messageMonth][messageDate].numOfTexts)
                      chatStore[messageYear][messageMonth][messageDate].numOfTexts =
                        prevTextValue += 1;
                    else
                      chatStore[messageYear][messageMonth][messageDate] = {
                        ...chatStore[messageYear][messageMonth][messageDate],
                        numOfTexts: (prevTextValue += 1),
                      };

                    if (
                      message.share &&
                      message.share.link &&
                      message.share.link.includes('/reel/')
                    ) {
                      totalReels += 1;
                      if (chatStore[messageYear][messageMonth][messageDate].numOfReels)
                        chatStore[messageYear][messageMonth][messageDate].numOfReels =
                          prevReelValue += 1;
                      else
                        chatStore[messageYear][messageMonth][messageDate] = {
                          ...chatStore[messageYear][messageMonth][messageDate],
                          numOfReels: (prevReelValue += 1),
                        };
                    }
                  });

                  fileData = {
                    threadName: chatId,
                    title: title,
                    dateMap: chatStore,
                    totalReels,
                    totalTexts,
                  };
                  dispatch(chatActions.setChatInfo(fileData));
                }
                if (index === jsonFiles.length - 1) {
                  setInboxUploading(false);
                  setInboxUploaded(true);
                  dispatch(chatActions.setChatUploaded(true));
                  console.timeEnd('upload start2');
                }
              });
          }
        });
      });
    }
  };

  const retrieveSavedFiles = (files: FileList | null) => {
    setSavesUploading(true);
    let creatorSavedMap: ILikedCreators = {};
    const savedPostStats: ILikedPostStats = {
      yearData: {},
      topCreators: [],
    };
    if (files) {
      const jsonFiles = [...files].filter((item) => item.type === 'application/json');
      jsonFiles.forEach((file) => {
        if (file.webkitRelativePath.includes('saved_posts')) {
          FileUtils.fileToDataUri(file).then((dataUri: any) => {
            if (dataUri) {
              fetch(dataUri.toString())
                .then((response) => response.json())
                .then((data) => {
                  for (let i = 2018; i <= new Date().getFullYear(); i++) {
                    const savesForYear = data.saved_saved_media.filter(
                      (media: any) =>
                        media.string_map_data['Saved on'].timestamp * 1000 >=
                          new Date(i, 0, 1, 0, 0, 0).getTime() &&
                        media.string_map_data['Saved on'].timestamp * 1000 <=
                          new Date(i, 11, 31, 23, 59, 59).getTime(),
                    );
                    savedPostStats.yearData[i] = savesForYear.length;
                  }
                  const saved2023 = data.saved_saved_media.filter(
                    (media: any) =>
                      media.string_map_data['Saved on'].timestamp * 1000 >=
                        new Date(2023, 0, 1, 0, 0, 0).getTime() &&
                      media.string_map_data['Saved on'].timestamp * 1000 <=
                        new Date(2023, 11, 31, 23, 59, 59).getTime(),
                  );
                  saved2023.forEach((media: any, index: number) => {
                    const creator = media.title as string;
                    if (!creatorSavedMap[creator])
                      creatorSavedMap = { ...creatorSavedMap, [creator]: 0 };
                    const prevLikes = creatorSavedMap[creator];
                    creatorSavedMap[creator] = prevLikes + 1;
                  });
                })
                .then(() => {
                  setSavesUploading(false);
                  setSavesUploaded(true);
                  const topCreators = Object.entries(creatorSavedMap)
                    .sort((a, b) => (a[1] < b[1] ? 1 : -1))
                    .slice(0, 10);
                  savedPostStats.topCreators = topCreators;
                  dispatch(contentActions.setSavedPostDataUploaded(true));
                  dispatch(contentActions.setSavedPostsInfo(savedPostStats));
                });
            }
          });
        }
      });
      if (
        jsonFiles.filter((file) => file.webkitRelativePath.includes('saved_posts'))
          .length === 0
      ) {
        setSavesUploading(false);
        setSavesUploaded(true);
      }
    }
  };

  const isContinueDisabled =
    (!isChatDataUploaded &&
      !isFollowDataUploaded &&
      !isLikedPostDataUploaded &&
      !isPostDataUploaded &&
      !isSavedPostDataUploaded) ||
    inboxUploading ||
    likesUploading ||
    savesUploading ||
    contentUploading ||
    followerUploading;

  return (
    <div className="w-full flex flex-col justify-center items-center pb-80">
      <SectionTitle title="Upload your folders" />
      <div className="py-8 px-14 my-10 w-2/3 bg-gradient-to-br from-red-400 to-red-600 h-44">
        <div className="flex w-full flex-row justify-between items-center">
          <div className="flex w-4/5 flex-col justify-start items-start">
            <h3 className="xl:text-5xl text-4xl text-red-900 font-vinasans">
              Upload content info folder
            </h3>
            <p className="text-base text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > content folder`}</p>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveContentFiles(files)}
            hasUploaded={contentUploaded}
            isUploading={contentUploading}
          />
        </div>
      </div>
      <div className="py-8 px-14 my-10 w-2/3 bg-gradient-to-br from-cyan-400 to-cyan-600 h-44">
        <div className="flex w-full flex-row justify-between items-center">
          <div className="flex w-4/5 flex-col justify-start items-start">
            <h3 className="xl:text-5xl text-4xl text-cyan-900 font-vinasans">
              Upload follow activity folder
            </h3>
            <p className="text-base text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > followers_and_following folder`}</p>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveFollowFiles(files)}
            hasUploaded={followerUploaded && followingUploaded}
            isUploading={followerUploading || followingUploading}
          />
        </div>
        <img
          src={playCat}
          width={320}
          height={320}
          alt="scratch cat"
          className="relative -top-[4.3rem] left-[60%]"
        />
      </div>
      <div className="py-8 px-14 my-10 w-2/3 bg-gradient-to-br from-yellow-400 to-yellow-600 h-44">
        <div className="flex w-full flex-row justify-between items-center">
          <div className="flex w-4/5 flex-col justify-start items-start">
            <h3 className="xl:text-5xl text-4xl text-yellow-900 font-vinasans">
              Upload inbox folder
            </h3>
            <p className="text-base text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > messages > inbox folder`}</p>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveInboxFiles(files)}
            hasUploaded={inboxUploaded}
            isUploading={inboxUploading}
          />
        </div>
      </div>
      <div className="py-8 px-14 my-10 w-2/3 bg-gradient-to-br from-green-400 to-green-600 h-44">
        <div className="flex w-full flex-row justify-between items-center">
          <div className="flex w-4/5 flex-col justify-start items-start">
            <h3 className="xl:text-5xl text-4xl text-green-900 font-vinasans">
              Upload likes folder
            </h3>
            <p className="text-base text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > likes folder`}</p>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveLikesFiles(files)}
            hasUploaded={likesUploaded}
            isUploading={likesUploading}
          />
        </div>
        <img
          src={jumpCat}
          width={240}
          height={240}
          alt="scratch cat"
          className="relative -top-[3.3rem] left-[65%]"
        />
      </div>
      <div className="py-8 px-14 my-10 w-2/3 bg-gradient-to-br from-violet-400 to-violet-600 h-44">
        <div className="flex w-full flex-row justify-between items-center">
          <div className="flex w-2/3 flex-col justify-start items-start">
            <h3 className="xl:text-5xl text-4xl text-purple-900 font-vinasans">
              Upload saved folder
            </h3>
            <p className="text-base text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > saved folder`}</p>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveSavedFiles(files)}
            hasUploaded={savesUploaded}
            isUploading={savesUploading}
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button
          className={`relative w-54 h-16 mt-16 rounded-sm flex flex-col items-center justify-center ${
            isContinueDisabled
              ? 'pattern-green-100 pattern-bg-green-200'
              : 'pattern-green-400 pattern-bg-green-500'
          } pattern-wavy pattern-size-4 pattern-opacity-100 shadow-white shadow-[5px_5px_0_0]`}
          onClick={() => {
            window.scrollTo({ top: 0 });
            dispatch(userActions.setIsNewUser(false));
          }}
          disabled={isContinueDisabled}
        >
          <p className="text-2xl font-poppins leading-none font-bold">Continue</p>
        </button>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="relative w-36 h-10 mt-16 flex flex-col items-center justify-center bg-red-400 rounded-none shadow-white shadow-[5px_5px_0_0]"
          onClick={() => {
            // window.scrollTo({ top: 0 });
            dispatch(resetUserSlice());
            dispatch(resetChatSlice());
            dispatch(resetContentSlice());
            setContentUploaded(false);
            setContentUploading(false);
            setFollowerUploaded(false);
            setFollowerUploading(false);
            setFollowingUploaded(false);
            setInboxUploaded(false);
            setInboxUploading(false);
            setLikesUploaded(false);
            setLikesUploading(false);
            setSavesUploaded(false);
            setSavesUploading(false);
          }}
        >
          <p className="text-lg leading-none font-medium font-poppins">Reset</p>
        </button>
      </div>
    </div>
  );
};

export default FolderUploader;
