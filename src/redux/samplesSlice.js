import { createSlice } from '@reduxjs/toolkit';

export const samplesSlice = createSlice({
   name: 'samples',
  initialState: [
    { id: 1, title: 'clap_1', link: require('../../assets/samples/clap_1.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 2, title: 'clap_2', link: require('../../assets/samples/clap_2.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 3, title: 'fx_1', link: require('../../assets/samples/fx_1.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 4, title: 'fx_2', link: require('../../assets/samples/fx_2.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 5, title: 'kick_2', link: require('../../assets/samples/kick_2.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 6, title: 'kick_1', link: require('../../assets/samples/kick_1.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 7, title: 'shaker_1', link: require('../../assets/samples/shaker_1.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 8, title: 'shaker_2', link: require('../../assets/samples/shaker_2.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 9, title: 'shaker_3', link: require('../../assets/samples/shaker_3.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 10, title: 'snare_1', link: require('../../assets/samples/snare_1.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 11, title: 'snare_2', link: require('../../assets/samples/snare_2.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 12, title: 'tom_1', link: require('../../assets/samples/tom_1.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 13, title: 'tom_2', link: require('../../assets/samples/tom_2.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 14, title: 'tom_3', link: require('../../assets/samples/tom_3.wav'), image: '../../assets/image-default.jpeg', type: 'default'},
    { id: 15, title: 'tom_4', link: require('../../assets/samples/tom_4.wav'), image: '../../assets/image-default.jpeg', type: 'default'}

],
reducers: {
  addSample: (state, action ) => {
     return [...state, {
         id: action.payload.id,
         title: action.payload.title,
         link: action.payload.link,
         image: action.payload.image
     }];
 },
removeSample: (state, action) => {
  return state.filter((el) => el.id != action.payload.id);
},
updateSample: (state, action) => {
  return state.map((ele) =>
    ele.id === action.payload.id ? action.payload : ele
  );
},
 logout: (payload) => {
  // From here we can take action only at this "counter" state
  // But, as we have taken care of this particular "logout" action
  // in rootReducer, we can use it to CLEAR the complete Redux Store's state
},
},
});


export const { 
  addSample, 
  removeSample,
  updateSample, 
  logout,
} = samplesSlice.actions;
export const SampleSelector = (state) => state.samples;

export default samplesSlice.reducer;
