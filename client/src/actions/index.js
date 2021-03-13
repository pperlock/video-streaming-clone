export const UPDATE_MAIN = 'UPDATE_MAIN';
export const SET_VIDEOS = 'SET_VIDEOS';

export const updateMain = (videoId) => ({
    type:UPDATE_MAIN,
    payload:videoId
});

export const setVideos = (videos) => ({
    type:SET_VIDEOS,
    payload:videos
});