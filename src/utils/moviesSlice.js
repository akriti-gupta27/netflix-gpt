import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState : {
        nowPlayingMovies: null,
        popularMovies: null,
        trailerVideo: null
    },
    reducers: {
        addNowPlayingMovie : (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovie : (state, action) => {
            state.popularMovies = action.payload;
        },
        addTrailerVideo : (state,action) => {
            state.trailerVideo = action.payload;
        }
    }
});

export const {addNowPlayingMovie, addTrailerVideo, addPopularMovie} = moviesSlice.actions;

export default moviesSlice.reducer;