import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { IChatDateMap, IChatsData } from '../../redux/interfaces/chatInterface';
import {
  ILikedCreators,
  ILikedPostStats,
  IPostDateMap,
} from '../../redux/interfaces/contentInterface';
import { IFollowersFollowing } from '../../redux/interfaces/userInterface';
import ChatSelectors from '../../redux/selectors/chatSelector';
import { chatActions } from '../../redux/slices/chatSlice';
import { contentActions } from '../../redux/slices/contentSlice';
import { userActions } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FileUtils } from '../../utils/FileUtils';
import SectionTitle from '../SectionTitle';
import UploadButton from '../UploadButton';

const FolderUploader = (): React.ReactElement => {
  const [contentUploading, setContentUploading] = useState(false);
  const [contentUploaded, setContentUploaded] = useState(false);

  const [followUploading, setFollowUploading] = useState(false);
  const [followUploaded, setFollowUploaded] = useState(false);

  const [likesUploading, setLikesUploading] = useState(false);
  const [likesUploaded, setLikesUploaded] = useState(false);

  const [inboxUploading, setInboxUploading] = useState(false);
  const [inboxUploaded, setInboxUploaded] = useState(false);

  const [savesUploading, setSavesUploading] = useState(false);
  const [savesUploaded, setSavesUploaded] = useState(false);

  const [threadsUploading, setThreadsUploading] = useState(false);
  const [threadsUploaded, setThreadsUploaded] = useState(false);

  const dispatch = useAppDispatch();
  let previousChatData: IChatsData = {};

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
        console.timeEnd('content upload');
      });
    }
  };

  const retrieveFollowFiles = (files: FileList | null) => {
    setFollowUploading(true);
    const followStats: IFollowersFollowing = {
      followerHistory: {},
      followingHistory: {},
    };
    console.time('follow upload');
    if (files) {
      const jsonFiles = [...files].filter((item) => item.type === 'application/json');
      const promise = new Promise((resolve) => {
        jsonFiles.forEach((file, index) => {
          if (file.webkitRelativePath.includes('following.json')) {
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
                      followStats.followingHistory[i] = followingForYear.length;
                    }
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
                      followStats.followerHistory[i] = followersForYear.length;
                    }
                  });
              }
            });
          }

          if (index === jsonFiles.length - 1) {
            setTimeout(() => {
              resolve(1);
            }, 2000);
          }
        });
      });

      promise.then(() => {
        setFollowUploading(false);
        setFollowUploaded(true);
        dispatch(userActions.setFollowHistory(followStats));
        console.timeEnd('follow upload');
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
    console.time('like upload');
    if (files) {
      const jsonFiles = [...files].filter((item) => item.type === 'application/json');
      const promise = new Promise((resolve) => {
        jsonFiles.forEach((file) => {
          if (file.webkitRelativePath.includes('liked_posts')) {
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
                      if (index === jsonFiles.length - 1)
                        setTimeout(() => {
                          resolve(1);
                        }, 2000);
                    });
                  });
              }
            });
          }
        });
      });

      promise.then(() => {
        setLikesUploading(false);
        setLikesUploaded(true);
        const topCreators = Object.entries(creatorLikeMap)
          .sort((a, b) => (a[1] < b[1] ? 1 : -1))
          .slice(0, 10);
        likedPostStats.topCreators = topCreators;
        dispatch(contentActions.setCreatorLikesInfo(likedPostStats));
        console.timeEnd('like upload');
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
      const promise = new Promise((resolve) => {
        jsonFiles.forEach((file, index) => {
          FileUtils.fileToDataUri(file).then((dataUri: any) => {
            if (dataUri) {
              fetch(dataUri.toString())
                .then((response) => response.json())
                .then((data) => {
                  if (topChatNames.includes(data.thread_path)) {
                    const chatId = data.thread_path;
                    const title = data.title;
                    const chatStore: IChatDateMap =
                      previousChatData?.[chatId]?.dateMap || {};
                    let totalReels = previousChatData?.[chatId]?.totalReels || 0;
                    let totalTexts = previousChatData?.[chatId]?.totalTexts || 0;

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
                        chatStore[messageYear]?.[messageMonth]?.[messageDate]
                          ?.numOfReels || 0;

                      let prevTextValue =
                        chatStore[messageYear]?.[messageMonth]?.[messageDate]
                          ?.numOfTexts || 0;

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

                    const previousChatInstance = previousChatData[chatId];
                    if (previousChatInstance) {
                      const prevReels = previousChatInstance.totalReels;
                      const prevTexts = previousChatInstance.totalTexts;
                      const previousDateMap = previousChatInstance.dateMap;

                      previousChatData = {
                        ...previousChatData,
                        [chatId]: {
                          threadName: chatId,
                          title,
                          dateMap: { ...chatStore },
                          totalReels: prevReels + totalReels,
                          totalTexts: prevTexts + totalTexts,
                        },
                      };
                    } else {
                      previousChatData = {
                        ...previousChatData,
                        [chatId]: {
                          threadName: chatId,
                          title,
                          dateMap: chatStore,
                          totalReels,
                          totalTexts,
                        },
                      };
                    }
                  }
                  if (index === jsonFiles.length - 1)
                    setTimeout(() => {
                      resolve(1);
                    }, 4000);
                });
            }
          });
        });
      });
      promise.then(() => {
        setInboxUploading(false);
        setInboxUploaded(true);
        dispatch(chatActions.setChatInfo(previousChatData));
        console.timeEnd('upload start2');
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
    console.time('save upload');
    if (files) {
      const jsonFiles = [...files].filter((item) => item.type === 'application/json');
      const promise = new Promise((resolve) => {
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
                      if (index === jsonFiles.length - 1)
                        setTimeout(() => {
                          resolve(1);
                        }, 2000);
                    });
                  });
              }
            });
          }
        });
      });

      promise.then(() => {
        setSavesUploading(false);
        setSavesUploaded(true);
        const topCreators = Object.entries(creatorSavedMap)
          .sort((a, b) => (a[1] < b[1] ? 1 : -1))
          .slice(0, 10);
        savedPostStats.topCreators = topCreators;
        dispatch(contentActions.setSavedPostsInfo(savedPostStats));
        console.timeEnd('save upload');
      });
    }
  };

  const retrieveThreadFiles = (files: FileList | null) => {
    setThreadsUploading(true);
    let threadCount = 0;
    if (files) {
      const jsonFiles = [...files].filter((item) => item.type === 'application/json');
      const promise = new Promise((resolve) => {
        jsonFiles.forEach((file) => {
          if (file.webkitRelativePath.includes('threads_and_replies')) {
            FileUtils.fileToDataUri(file).then((dataUri: any) => {
              if (dataUri) {
                fetch(dataUri.toString())
                  .then((response) => response.json())
                  .then((data) => {
                    threadCount = data.text_post_app_text_posts.length;
                    resolve(1);
                  });
              }
            });
          }
        });
      });

      promise.then(() => {
        setThreadsUploading(false);
        setThreadsUploaded(true);
        dispatch(contentActions.setThreadsInfo(threadCount));
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <SectionTitle title="Upload your folders" />
      <div className="py-16 w-2/3">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-base text-orange-500 font-martian">
              Upload content info folder
            </h3>
            <pre className="text-sm text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > content folder`}</pre>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveContentFiles(files)}
            hasUploaded={contentUploaded}
            isUploading={contentUploading}
          />
        </div>
      </div>
      <div className="py-16 w-2/3">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-base text-orange-500 font-martian">
              Upload followers/following folder
            </h3>
            <pre className="text-sm text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > followers_and_following folder`}</pre>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveFollowFiles(files)}
            hasUploaded={followUploaded}
            isUploading={followUploading}
          />
        </div>
      </div>
      <div className="py-16 w-2/3">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-base text-orange-500 font-martian">
              Upload inbox folder
            </h3>
            <pre className="text-sm text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > messages > inbox folder`}</pre>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveInboxFiles(files)}
            hasUploaded={inboxUploaded}
            isUploading={inboxUploading}
          />
        </div>
      </div>
      <div className="py-16 w-2/3">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-base text-orange-500 font-martian">
              Upload likes folder
            </h3>
            <pre className="text-sm text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > likes folder`}</pre>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveLikesFiles(files)}
            hasUploaded={likesUploaded}
            isUploading={likesUploading}
          />
        </div>
      </div>
      <div className="py-16 w-2/3">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-base text-orange-500 font-martian">
              Upload saved folder
            </h3>
            <pre className="text-sm text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > saved folder`}</pre>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveSavedFiles(files)}
            hasUploaded={savesUploaded}
            isUploading={savesUploading}
          />
        </div>
      </div>
      <div className="py-16 w-2/3">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-base text-orange-500 font-martian">
              Upload threads folder
            </h3>
            <pre className="text-sm text-white font-poppins text-left mt-5">{`Click on the Upload button and then select Parent folder > threads folder`}</pre>
          </div>
          <UploadButton
            retrieveFiles={(files: FileList | null) => retrieveThreadFiles(files)}
            hasUploaded={threadsUploaded}
            isUploading={threadsUploading}
          />
        </div>
      </div>
    </div>
  );
};

export default FolderUploader;
