import { createSlice } from '@reduxjs/toolkit';

const samplesSlice = createSlice({
  name: 'samples',
  initialState: [
    { id: 1, titre: 'clap_1.wav', lien: require('../../assets/samples/clap_1.wav')},
    { id: 2, titre: 'clap_2.wav', lien: require('../../assets/samples/clap_2.wav')},
    { id: 3, titre: 'fx_1.wav', lien: require('../../assets/samples/fx_1.wav')},
    { id: 4, titre: 'fx_2.wav', lien: require('../../assets/samples/fx_2.wav')},
    { id: 5, titre: 'kick_2.wav', lien: require('../../assets/samples/kick_2.wav')},
    { id: 6, titre: 'kick_1.wav', lien: require('../../assets/samples/kick_1.wav')},
    { id: 7, titre: 'shaker_1.wav', lien: require('../../assets/samples/shaker_1.wav')},
    { id: 8, titre: 'shaker_2.wav', lien: require('../../assets/samples/shaker_2.wav')},
    { id: 9, titre: 'shaker_3.wav', lien: require('../../assets/samples/shaker_3.wav')},
    { id: 10, titre: 'snare_1.wav', lien: require('../../assets/samples/snare_1.wav')},
    { id: 11, titre: 'snare_2.wav', lien: require('../../assets/samples/snare_2.wav')},
    { id: 12, titre: 'tom_1.wav', lien: require('../../assets/samples/tom_1.wav')},
    { id: 13, titre: 'tom_2.wav', lien: require('../../assets/samples/tom_2.wav')},
    { id: 14, titre: 'tom_3.wav', lien: require('../../assets/samples/tom_3.wav')},
    { id: 15, titre: 'tom_4.wav', lien: require('../../assets/samples/tom_4.wav')}

],
  reducers: {
    addSample: (state, action) => {
      return [...state, { ...action.payload.samples }];
    },
    removeSample: (state, action) => {
      return state.filter((el) => el.id != action.payload.id);
    },
    updateSample: (state, action) => {
      return state.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
  },
});

export const {
  addSample,
  removeSample,
  updateSample,
} = samplesSlice.actions;
export const SampleSelector = (state) => state;

export default samplesSlice.reducer;
